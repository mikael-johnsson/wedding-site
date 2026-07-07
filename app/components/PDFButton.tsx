"use client";

import { useState } from "react";
import type { Guest } from "../models/Guest";

type PDFButtonProps = {
  guests: Guest[];
};

const PDFButton = ({ guests }: PDFButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/pdf", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ guests }),
      });

      if (!res.ok) throw new Error("Något gick fel vid generering av PDF");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "guestlist.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {
      console.error(err);
      alert("Kunde inte ladda ner PDF. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="px-2 py-1 h-fit rounded border hover:bg-teal-900 hover:text-white"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Genererar..." : "Ladda ner PDF"}
    </button>
  );
};

export default PDFButton;
