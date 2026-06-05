# Guest RSVP Day Fields Plan

Add `daysAttending`, `daysOvernighting`, and `transport` to the embedded `PersonInfo` guest shape, then update the RSVP form and guest list so the new values can be saved and reviewed.

## Acceptance Criteria

- `PersonInfo` stores `daysAttending`, `daysOvernighting`, and `transport` for both the primary guest and the optional `plusOne`.
- `daysAttending` and `daysOvernighting` are rendered as three checkboxes, one each for Friday, Saturday, and Sunday.
- The form submits the selected day values and transport text through the existing server action.
- The guest admin page shows the new fields for each saved RSVP.
- Existing guest documents still load even if they do not have the new fields yet.

## Suggested Data Type

- Use `("friday" | "saturday" | "sunday")[]` for both `daysAttending` and `daysOvernighting`.
- This fits the checkbox UI, supports multiple selections, and keeps validation strict.

## Files To Change

- `/Users/Micke/Desktop/code_projects/olivia-simon_wedding/app/models/Guest.ts`
- `/Users/Micke/Desktop/code_projects/olivia-simon_wedding/app/actions/GuestActions.ts`
- `/Users/Micke/Desktop/code_projects/olivia-simon_wedding/app/osa/page.tsx`
- `/Users/Micke/Desktop/code_projects/olivia-simon_wedding/app/guests/page.tsx`

## Implementation Steps

1. Update `PersonInfo` in `app/models/Guest.ts` to include `daysAttending`, `daysOvernighting`, and `transport`.
2. Add the matching Mongoose sub-schema fields and validate the day arrays against Friday, Saturday, and Sunday.
3. Update the RSVP form helper in `app/actions/GuestActions.ts` so it reads checkbox arrays with `FormData.getAll(...)` and trims the transport field.
4. Pass the new values into `GuestModel.create(...)` for the primary guest and `plusOne`.
5. Add three checkboxes for `daysAttending` and three checkboxes for `daysOvernighting` in `app/osa/page.tsx`.
6. Add a text input for `transport` in the same form section.
7. Update `app/guests/page.tsx` so the admin view displays the new day selections and transport text for the primary guest and `plusOne`.
8. Check that empty checkbox groups save as empty arrays and that missing `plusOne` data still works.

## Testing / Verification

- Submit one RSVP with only Friday selected, and another with multiple days selected, then confirm the saved document contains arrays.
- Verify the guest list page shows the new fields for both the primary guest and `plusOne`.
- Run lint or TypeScript checks after the change to catch schema or form parsing mistakes.

## Effort

- Small to medium.
