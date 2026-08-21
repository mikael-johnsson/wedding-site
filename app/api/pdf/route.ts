import { formatDays } from "@/app/lib/formatDays";
import { AttendingStats } from "@/app/models/AttendingStats";
import type { GuestDTO } from "@/app/models/Guest";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export const POST = async (request: Request) => {
  try {
    const {
      guests,
      filters,
      attendingStats,
    }: {
      guests: GuestDTO[];
      filters: string[];
      attendingStats: AttendingStats;
    } = await request.json();

    const PDFDocument = require("pdfkit");

    const doc = new PDFDocument({ size: "A4", margin: 50 });

    const chunks: Buffer[] = [];
    const pdfPromise = new Promise<Buffer>((resolve, reject) => {
      doc.on("data", (chunk: Uint8Array) => chunks.push(Buffer.from(chunk)));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err: Error) => reject(err));
    });

    doc.fontSize(20).text("Gästlista Bernozzi Wedding", { align: "center" });
    doc.moveDown();

    const formatDate = (d?: Date | string) => {
      if (!d) return "-";
      try {
        return new Date(d).toLocaleString("sv-SE", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Europe/Stockholm",
        });
      } catch {
        return String(d);
      }
    };

    const normalizedFilters = filters.map((f) => {
      switch (f) {
        case "attending":
          return "Närvarande";
        case "not-attending":
          return "Inte närvarande";
        default:
          return f;
      }
    });

    doc.fontSize(10).text(`Gästlista skapad: ${formatDate(new Date())}`, {
      align: "right",
      oblique: true,
    });

    doc.fontSize(10).text(`Filter: ${normalizedFilters.join(", ") || "-"}`, {
      align: "right",
      oblique: true,
    });
    doc.moveDown();

    doc
      .fontSize(10)
      .text(`Totalt antal gäster: ${attendingStats.amountOfAttending}`);
    doc
      .fontSize(10)
      .text(`Totalt antal OSA-svar: ${attendingStats.amountOfOSA}`);
    doc
      .fontSize(10)
      .text(`Totalt antal nej: ${attendingStats.amountOfNotAttending}`);
    doc
      .fontSize(10)
      .text(
        `Övernattningar fredag: ${attendingStats.fridayOvernights} personer`,
      );
    doc
      .fontSize(10)
      .text(
        `Övernattningar lördag: ${attendingStats.saturdayOvernights} personer`,
      );
    doc
      .fontSize(10)
      .text(`Gäster fredag: ${attendingStats.fridayAttendees} personer`);
    doc
      .fontSize(10)
      .text(`Gäster lördag: ${attendingStats.saturdayAttendees} personer`);
    doc
      .fontSize(10)
      .text(`Gäster söndag: ${attendingStats.sundayAttendees} personer`);
    doc.moveDown();

    guests.forEach((guest, i) => {
      const p = guest.primaryGuest;

      doc
        .fontSize(14)
        .text(
          `${i + 1}. ${p.name} ${guest.plusOne ? `& ${guest.plusOne.name}` : ""}`,
          { underline: true },
        );

      doc.fontSize(12).text(`Huvudgäst: ${p.name}`, { indent: 10 });
      doc
        .fontSize(12)
        .text(`Närvarande: ${p.attending ? "Ja" : "Nej"}`, { indent: 20 });

      doc.fontSize(12).text(`Allergier: ${p.allergies || "-"}`, { indent: 20 });
      doc
        .fontSize(12)
        .text(`Måltidsval: ${p.mealChoice || "-"}`, { indent: 20 });
      doc.fontSize(12).text(`Måltidsval fredag: ${p.mealChoiceFriday || "-"}`, {
        indent: 20,
      });
      doc.fontSize(12).text(`Övrigt: ${p.notes || "-"}`, { indent: 20 });
      doc
        .fontSize(12)
        .text(`Dagar närvarande: ${formatDays(p.daysAttending)}`, {
          indent: 20,
        });
      doc
        .fontSize(12)
        .text(`Dagar övernattning: ${formatDays(p.daysOvernighting)}`, {
          indent: 20,
        });
      doc.fontSize(12).text(`Transport: ${p.transport || "-"}`, { indent: 20 });

      if (guest.plusOne) {
        const q = guest.plusOne;
        doc.moveDown(0.25);
        doc
          .fontSize(12)
          .text(`Plus one: ${q.name}`, { indent: 10, underline: false });
        doc
          .fontSize(12)
          .text(`Närvarande: ${q.attending ? "Ja" : "Nej"}`, { indent: 20 });
        doc
          .fontSize(12)
          .text(`Allergier: ${q.allergies || "-"}`, { indent: 20 });
        doc
          .fontSize(12)
          .text(`Måltidsval: ${q.mealChoice || "-"}`, { indent: 20 });
        doc
          .fontSize(12)
          .text(`Måltidsval fredag: ${q.mealChoiceFriday || "-"}`, {
            indent: 20,
          });
        doc.fontSize(12).text(`Övrigt: ${q.notes || "-"}`, { indent: 20 });
        doc
          .fontSize(12)
          .text(`Dagar närvarande: ${formatDays(q.daysAttending)}`, {
            indent: 20,
          });
        doc
          .fontSize(12)
          .text(`Dagar övernattning: ${formatDays(q.daysOvernighting)}`, {
            indent: 20,
          });
        doc
          .fontSize(12)
          .text(`Transport: ${q.transport || "-"}`, { indent: 20 });
      }

      doc.moveDown(0.25);
      doc
        .fontSize(11)
        .text(`Antal gäster: ${guest.numberOfGuests ?? "-"}`, { indent: 10 });
      doc
        .fontSize(11)
        .text(`Svar skickat: ${formatDate(guest.rsvpSubmittedAt)}`, {
          indent: 10,
        });
      doc.moveDown();
    });

    doc.end();

    const pdfBuffer = await pdfPromise;
    const pdfUint8 = new Uint8Array(pdfBuffer);

    return new NextResponse(pdfUint8, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=guestlist.pdf",
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return new NextResponse(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
