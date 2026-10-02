# Plans for features to be implemented

## Prevent Duplicate RSVP Submissions

Add an idempotency token to each RSVP form so repeated requests for the same submission cannot create multiple guest documents. The existing pending-state button will continue to prevent ordinary double-clicks, while the database constraint protects against retries, timeouts, and concurrent server-action invocations.

### Acceptance criteria

- Each mounted RSVP form receives one cryptographically random submission token.
- The token remains unchanged when the same form submission is retried.
- Every new RSVP document stores the token.
- MongoDB enforces uniqueness for tokens.
- A repeated request with an already-used token does not create another document and redirects as a successful submission.
- Existing guest documents without tokens remain readable and do not prevent the index from being created.
- Missing or invalid tokens are rejected before writing a new RSVP.

### Files to change

- `app/osa/osaPage.tsx`: generate a client-side token after mount, include it as a hidden field, and keep the submit button disabled until the token is ready.
- `app/actions/GuestActions.ts`: read and validate `submissionToken`, save it with the RSVP, and handle duplicate-key errors as an already-completed submission.
- `app/models/Guest.ts`: add the token field and a unique sparse index so legacy documents without tokens remain valid.
- `planning/features.md`: retain this implementation plan and record any migration decisions.

### Existing server-action contract

The form continues to use `action={saveGuestRsvp}` and submits `FormData`. Add this required field:

```text
submissionToken: string
```

On a first request, the action creates one guest document. On a repeated request with the same token, it returns the same success or declined redirect without creating another document.

### Step-by-step implementation

1. Add `submissionToken` to the `Guest` and `GuestDTO` types as a required field for newly created documents, while keeping legacy reads compatible.
2. Add `submissionToken` to the Mongoose schema with a unique sparse index. Confirm that the index is created in the deployed MongoDB database.
3. Add `submissionToken` state to `OSAPage`, initialize it to `null`, and generate it with `crypto.randomUUID()` in a mount-only effect.
4. Render a hidden input named `submissionToken` when the token exists.
5. Keep the submit button disabled until the token exists, in addition to its existing `useFormStatus().pending` state.
6. Read the token at the start of `saveGuestRsvp` and reject requests where it is missing or malformed.
7. Include the token in `GuestModel.create(...)`.
8. Handle MongoDB duplicate-key errors for `submissionToken` by treating them as an already-saved submission and redirecting without inserting another document.
9. Verify that a failed validation does not consume the token, so the user can correct the form and submit again.
10. Deploy to a preview environment and confirm the unique index exists before testing production submissions.

### Testing and verification

- Submit one RSVP normally and confirm one document contains the token.
- Submit the same `FormData` twice concurrently and confirm only one document exists.
- Simulate a retry after the first insert and confirm the second request redirects without inserting.
- Submit without a token and confirm no document is created.
- Confirm existing guest documents without tokens still load in the guest admin page.
- Inspect Vercel runtime logs and confirm duplicate requests have different request IDs but the same submission token.

### Suggested reviewer

- Review the MongoDB index and duplicate-key handling, since those provide the actual idempotency guarantee.

### Rough effort

Medium: approximately 1-2 hours including preview deployment testing.
