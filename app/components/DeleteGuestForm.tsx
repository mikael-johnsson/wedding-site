"use client";

import { useState } from "react";
import { deleteGuest } from "../actions/GuestActions";

type DeleteGuestFormProps = {
  guestId: string;
};

const DeleteGuestForm = ({ guestId }: DeleteGuestFormProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <form action={deleteGuest.bind(null, guestId)} className={`mt-2 `}>
      <div className={showConfirmation ? "inline-block" : "hidden"}>
        <span className="mb-2 mr-2">
          Är du säker på att du vill ta bort denna gäst?
        </span>
        <button
          id={`delete-${guestId}`}
          type="submit"
          className="text-red-600 border hover:underline p-1"
        >
          Ja, ta bort
        </button>
      </div>
      <button
        className={` border hover:underline p-1 ${showConfirmation ? "text-black mx-2" : "text-red-600"}`}
        type="button"
        onClick={() => setShowConfirmation(!showConfirmation)}
      >
        {showConfirmation ? "Avbryt" : "Ta bort gäst"}
      </button>
    </form>
  );
};

export default DeleteGuestForm;
