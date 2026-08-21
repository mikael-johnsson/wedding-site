export type SubmissionStatus =
  | "osaSuccess"
  | "osaDeclined"
  | "osaError"
  | "emailSuccess"
  | "emailError"
  | "error";

export const submissionMessages: Record<SubmissionStatus, string> = {
  osaSuccess: "Tack! Vad kul att du kommer!",
  osaDeclined: "Tack för ditt svar. Vad synd att du inte kan komma",
  osaError: "Något gick fel. Försök igen.",
  emailSuccess: "Ditt mail har skickats. Tack!",
  emailError: "Mailet kunde inte skickas. Försök igen.",
  error: "Något gick fel.",
};
