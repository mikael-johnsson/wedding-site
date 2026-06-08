import Image from "next/image";

const WeekendPage = () => {
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold text-center mt-10">HELGEN</h1>
      <div className="container mx-auto flex flex-col gap-4 px-4 py-6 lg:flex-row lg:justify-evenly">
        {/* FREDAG */}
        <div className="w-full rounded border p-6 lg:w-[30%]">
          <Image
            src="/herrgård-sketchad.png"
            alt="Wedding"
            className="object-contain mx-auto"
            width={600}
            height={900}
          />
          <h2 className="text-2xl font-extrabold text-center my-10">FREDAG</h2>
          <p className="text-md font-bold text-center ">
            Plats: Toftaholm Herrgård
          </p>
          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li>18:00 Skål och välkomna!</li>
            <li>18:30 Middag (195kr per person)</li>
            <li>19:30 Quiz </li>
            <li>21:00 Överraskning</li>
          </ul>
        </div>

        {/* LÖRDAG */}
        <div className="w-full rounded border p-6 lg:w-[30%]">
          <Image
            src="/varnamo_kyrka.jpg"
            alt="Wedding"
            className="object-contain mx-auto"
            width={600}
            height={900}
          />
          <h2 className="text-2xl font-extrabold text-center my-10">LÖRDAG</h2>
          <p className="text-md font-bold text-center ">
            Plats: Värnamo Kyrka / Toftaholm Herrgård
          </p>

          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li>14:00 i Värnamo Kyrka</li>
            <li>16:00 Brudskål på Toftaholm</li>
            <li>18:00 Middag och fest!</li>
          </ul>
        </div>

        {/* SÖNDAG */}
        <div className="w-full rounded border p-6 lg:w-[30%]">
          <Image
            src="/herrgård-sketchad.png"
            alt="Wedding"
            className="object-contain mx-auto"
            width={600}
            height={900}
          />
          <h2 className="text-2xl font-extrabold text-center my-10">SÖNDAG</h2>
          <p className="text-md font-bold text-center ">
            Plats: Toftaholm Herrgård
          </p>

          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li>10:00: Frukost</li>
            <li>12:00: Hej då❤️</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default WeekendPage;
