"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { SubmissionStatus, submissionMessages } from "../models/Toasts";

const MessageToast = () => {
	const searchParams = useSearchParams();
	const status = (searchParams.get("submitted") as SubmissionStatus) || null;
	const message = submissionMessages[status];

	useEffect(() => {
		if (status === "osaSuccess") {
			toast.success(message);
		} else if (status === "osaDeclined") {
			toast.error(message);
		}

		window.history.replaceState(
			null,
			"",
			`${window.location.pathname}${window.location.hash}`,
		);
	}, [status, message]);
	return <>{/* <button>TESTA TOAST</button> */}</>;
};

export default MessageToast;
