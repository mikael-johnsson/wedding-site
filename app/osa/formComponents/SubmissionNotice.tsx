import { useSearchParams } from "next/navigation";

function SubmissionNotice() {
  const searchParams = useSearchParams();
  const hasSubmitted = searchParams.get("submitted") === "1";

  if (!hasSubmitted) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-900">
      Tack! Ditt svar är sparat.
    </div>
  );
}

export default SubmissionNotice;
