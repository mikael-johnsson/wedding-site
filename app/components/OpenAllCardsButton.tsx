"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type OpenAllCardsButtonProps = {
  isOpen: boolean;
};

const OpenAllCardsButton = ({ isOpen }: OpenAllCardsButtonProps) => {
  const [isOpenState, setIsOpenState] = useState(isOpen);
  const searchParams = useSearchParams();
  const attending = searchParams.get("attending");
  const url = attending ? `/guests?attending=${attending}&` : "/guests?";

  return (
    <Link
      onClick={() => setIsOpenState(!isOpenState)}
      href={`${url}openAll=${!isOpenState}`}
      className="px-2 py-1 rounded border hover:bg-teal-900 hover:text-white"
    >
      {isOpen ? "Stäng alla kort" : "Öppna alla kort"}
    </Link>
  );
};

export default OpenAllCardsButton;
