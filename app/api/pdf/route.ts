import type { Guest } from "@/app/models/Guest";
import { NextResponse } from "next/server";
// Load pdfkit at runtime to avoid Turbopack replacing __dirname and breaking AFM file paths
const pdfkit: any = eval("require('pdfkit')");

export const POST = async (request: Request) => {
  try {
    console.log("Inside POST");
    const { guests }: { guests: Guest[] } = await request.json();

    const doc = new pdfkit({ size: "A4", margin: 50 });

    const chunks: Buffer[] = [];
    const pdfPromise = new Promise<Buffer>((resolve, reject) => {
      doc.on("data", (chunk: Uint8Array) => chunks.push(Buffer.from(chunk)));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err: Error) => reject(err));
    });

    doc.fontSize(20).text("Gästlista", { align: "center" });
    doc.moveDown();

    const formatDate = (d?: Date | string) => {
      if (!d) return "-";
      try {
        return new Date(d).toLocaleString();
      } catch {
        return String(d);
      }
    };

    const formatArray = (arr?: string[]) =>
      arr && arr.length ? arr.join(", ") : "-";

    console.log("About to start iterating guests");

    guests.forEach((guest, i) => {
      const p = guest.primaryGuest;

      doc.fontSize(14).text(`${i + 1}. ${p.name}`, { underline: true });

      doc
        .fontSize(12)
        .text(`Närvarande: ${p.attending ? "Ja" : "Nej"}`, { indent: 10 });

      doc.fontSize(12).text(`Allergier: ${p.allergies || "-"}`, { indent: 10 });
      doc
        .fontSize(12)
        .text(`Måltidsval: ${p.mealChoice || "-"}`, { indent: 10 });
      doc.fontSize(12).text(`Anteckningar: ${p.notes || "-"}`, { indent: 10 });
      doc
        .fontSize(12)
        .text(`Dagar närvarande: ${formatArray(p.daysAttending)}`, {
          indent: 10,
        });
      doc
        .fontSize(12)
        .text(`Dagar övernattning: ${formatArray(p.daysOvernighting)}`, {
          indent: 10,
        });
      doc.fontSize(12).text(`Transport: ${p.transport || "-"}`, { indent: 10 });

      if (guest.plusOne) {
        const q = guest.plusOne;
        doc.moveDown(0.25);
        doc
          .fontSize(13)
          .text(`Plus One: ${q.name}`, { indent: 10, underline: false });
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
          .text(`Anteckningar: ${q.notes || "-"}`, { indent: 20 });
        doc
          .fontSize(12)
          .text(`Dagar närvarande: ${formatArray(q.daysAttending)}`, {
            indent: 20,
          });
        doc
          .fontSize(12)
          .text(`Dagar övernattning: ${formatArray(q.daysOvernighting)}`, {
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
        .text(`RSVP skickat: ${formatDate(guest.rsvpSubmittedAt)}`, {
          indent: 10,
        });
      doc
        .fontSize(11)
        .text(`Uppdaterad: ${formatDate(guest.updatedAt)}`, { indent: 10 });
      doc.fontSize(10).text(`ID: ${guest._id}`, { indent: 10 });

      doc.moveDown();
    });

    doc.end();

    console.log("Done iterating guests");

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
