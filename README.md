# Bernozzi Wedding

Wedding website for a happy couple getting married in 2027. It is a single-page public site with an RSVP form, plus a login-protected admin view where the couple can review responses, see aggregated numbers and export a PDF guest list. All visitor-facing copy is in Swedish.

## Tech stack

| Area        | Choice                                                                  |
| ----------- | ----------------------------------------------------------------------- |
| Framework   | Next.js 16 (App Router), React 19                                       |
| Language    | TypeScript                                                              |
| Styling     | Tailwind CSS 4 (`@tailwindcss/postcss`), design tokens in `app/styles/` |
| Database    | MongoDB via Mongoose 9                                                  |
| Email       | Nodemailer (Gmail SMTP), HTML rendered with `react-email`               |
| PDF         | `pdfkit`, generated server-side                                         |
| UI feedback | `sonner` toasts                                                         |

## Architecture overview

The app uses Server Components by default. Client components (`"use client"`) are only used where state or browser APIs are needed (the RSVP form, countdown, modals, buttons). Mutations are done with **Server Actions** instead of a separate REST API; the only route handlers are for email and PDF generation.

```
app/
├── page.tsx              Public single page, composed of section components
├── layout.tsx            Root layout: Header + Toaster
├── osa/                  RSVP form (client) + formComponents/
├── helgen/ boende/ toast/ gifts/   Static content sections of the home page
├── guests/page.tsx       Admin guest list (server component, auth-gated)
├── login/ signup/        Auth forms
├── actions/
│   ├── GuestActions.ts   saveGuestRsvp, deleteGuest
│   └── UserActions.ts    createUser, loginUser, checkAuth
├── api/
│   ├── email/route.ts    POST: sends a message from the "toast" contact form
│   └── pdf/route.ts      POST: renders the guest list as a PDF
├── components/           Header, GuestCard, PDFButton, EmailModal, CountdownClock, ...
├── models/               Mongoose schemas + TypeScript types/DTOs
├── lib/                  db connection, mail transport, stats helpers
└── styles/               CSS variables and Tailwind theme tokens
planning/                 Feature plans (e.g. duplicate-RSVP prevention)
skills/                   Project-specific agent skills
react-email-starter/      Sandbox for developing the email template
```

### Rendering and navigation

`app/page.tsx` renders the whole public site as one page; each section (`WeekendPage`, `OSAPage`, `LivingAndTransportPage`, `ToastPage`, `GiftsPage`) has an anchor id used by `HeaderNav`. The countdown (`lib/counter.ts`) targets `2027-09-11T14:00:00`.

## Data model

### `Guest` (`models/Guest.ts`)

One document per submitted RSVP, which can cover two people.

```ts
Guest {
  primaryGuest: PersonInfo       // required
  plusOne?: PersonInfo
  numberOfGuests: number         // count of people with attending === true
  submissionToken?: string       // idempotency key, unique sparse index
  rsvpSubmittedAt?: Date
  createdAt / updatedAt          // Mongoose timestamps
}

PersonInfo {
  name, attending, allergies, mealChoice, mealChoiceFriday, notes, transport
  daysAttending: ("friday" | "saturday" | "sunday")[]
  daysOvernighting: ("friday" | "saturday")[]
}
```

`PersonInfo` is an embedded sub-schema (`_id: false`). Day arrays are validated with Mongoose `enum`s and are also filtered against an allow-list when parsing the form.

`GuestDTO` / `convertGuestToDTO` strip the document down to a plain, serializable object before it is passed to client components or the PDF route (Mongoose documents and `ObjectId`s cannot cross the server/client boundary).

### `User` (`models/User.ts`)

`{ username (unique), password (bcrypt hash) }`, exposed to the UI only as `UserDTO` (username).

### Other types

- `AttendingStats`: shape of the aggregate numbers shown in the admin view and printed in the PDF.
- `Toasts.ts`: `SubmissionStatus` union and the Swedish message for each status.

## Key flows

### RSVP submission

1. `OSAPage` (client) generates `crypto.randomUUID()` in a mount-only effect and stores it as a hidden `submissionToken` field. The submit button stays disabled until the token exists and while `useFormStatus().pending` is true.
2. The form posts `FormData` straight to the `saveGuestRsvp` server action.
3. The action trims strings, parses checkbox groups with `FormData.getAll`, validates the token against a UUID regex and requires a name for the primary guest (and the plus-one if enabled). `numberOfGuests` is computed from the `attending` flags.
4. `GuestModel.create(...)` inserts the document.
5. The action redirects to `/?submitted=<status>`. `OSAPage` reads that query param, shows a toast and then clears the param with `history.replaceState`.

**Idempotency:** the unique sparse index on `submissionToken` is the real guarantee against duplicates (double clicks, retries, concurrent invocations). On a Mongo duplicate-key error (`code 11000`) the action looks up the existing document and redirects to the same success/declined status without inserting again. The index is _sparse_ so legacy documents without a token remain valid. Validation failures happen before the insert, so they do not consume the token. See `planning/features.md` for the full plan.

### Admin guest list (`/guests`)

A server component that queries Mongo directly. URL search params drive the state:

- `?attending=attending|not-attending` filters on `primaryGuest.attending`.
- `?openAll=false` collapses all `GuestCard`s.

Totals are always computed from the _unfiltered_ collection, using `lib/weddingDaysAttendees.ts` (attendees per day) and `lib/overnightStays.ts` (overnights per night); both count primary guest and plus-one separately. Deleting a guest calls the `deleteGuest` server action, which then runs `revalidatePath("/guests")`.

### PDF export

`PDFButton` posts the filtered `GuestDTO[]`, the active filters and `AttendingStats` to `POST /api/pdf`. The route (Node runtime) builds an A4 document with `pdfkit`, buffers the stream into a `Buffer` and returns it for download. Dates are formatted for `Europe/Stockholm`.

### Contact email

`EmailModal` posts `{ name, email, message }` to `POST /api/email`. The route verifies the Nodemailer transport, renders `components/EmailTemplate.tsx` to HTML with `react-email`'s `render` and sends it through Gmail SMTP.

### Database connection

`lib/db.ts` caches the Mongoose connection (and the pending connect promise) on `global._mongooseCache`. This avoids opening a new connection on every hot reload in dev and on every invocation in serverless environments.

## Configuration

Environment variables (read from `.env.local`):

| Variable              | Used for                                                             |
| --------------------- | -------------------------------------------------------------------- |
| `MONGODB_URI`         | MongoDB connection string (app throws on startup if missing)         |
| `JWT_SECRET`          | Signing and verifying auth tokens                                    |
| `GOOGLE_APP_PASSWORD` | Gmail SMTP app password for Nodemailer                               |
| `RESEND_API_KEY`      | Present, and `resend` is a dependency, but no code currently uses it |

## Known limitations

- `deleteGuest` and `createUser` server actions do not check authentication themselves. Only the `/guests` page rendering is gated, and Server Actions are publicly callable endpoints. Auth checks should be added inside the actions (and `/signup` should be restricted or removed once the admin user exists).
- `/api/pdf` is not authenticated and trusts the guest data sent in the request body.
- The sender address in `lib/EmailTransporter.ts` is hard-coded rather than read from the environment.
- Schema changes are not migrated. Documents created before a model change (for example without `daysAttending` or `submissionToken`) may be missing fields, so code must tolerate `undefined` for those.
