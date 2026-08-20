import Image from "next/image";

const WeekendPage = () => {
  return (
    <section id="helgen" className="scroll-mt-30">
      <h1 className="text-4xl font-heading text-center mb-8">HELGEN</h1>
      <div className="container mx-auto mt-8 flex flex-col gap-4 px-4 py-6 lg:flex-row lg:justify-center lg:gap-8">
        {/* FREDAG */}
        <div className="w-full rounded border p-4 lg:w-[30%] lg:px-4">
          <Image
            src="/toftaholm_2.jpeg"
            alt="Wedding"
            className="object-contain mx-auto rounded-lg shadow-xl"
            width={500}
            height={800}
          />
          <h2 className="text-2xl font-heading text-center my-10">FREDAG</h2>
          <p className="text-md font-heading text-center ">
            Plats: Toftaholm Herrgård
          </p>
          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li className="flex justify-between w-full">
              <span>18:00</span>
              <span>Skål och välkomna!</span>
            </li>
            <li className="flex justify-between w-full">
              <span>18:30</span>
              <span>Middag (195kr pp)</span>
            </li>
            <li className="flex justify-between w-full">
              <span>21:00</span>
              <span>Överraskning!</span>
            </li>
          </ul>
        </div>

        {/* LÖRDAG */}
        <div className="w-full rounded border p-6 lg:w-[30%] lg:px-4">
          <Image
            src="/varnamo_kyrka.jpg"
            alt="Wedding"
            className="object-contain mx-auto rounded-lg shadow-xl"
            width={500}
            height={800}
          />
          <h2 className="text-2xl font-heading text-center my-10">LÖRDAG</h2>
          <p className="text-md font-heading text-center ">
            Plats: Värnamo Kyrka / <br /> Toftaholm Herrgård
          </p>

          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li className="flex justify-between w-full">
              <span>14:00</span>
              <span>Vigsel i Värnamo Kyrka</span>
            </li>
            <li className="flex justify-between w-full">
              <span>16:00</span>
              <span>Brudskål på Toftaholm</span>
            </li>
            <li className="flex justify-between w-full">
              <span>18:00</span>
              <span>Middag och fest!</span>
            </li>
          </ul>
        </div>

        {/* SÖNDAG */}
        <div className="w-full rounded border p-6 lg:w-[30%] lg:px-4">
          <Image
            src="/toftaholm_1.jpeg"
            alt="Wedding"
            className="object-contain mx-auto rounded-lg shadow-xl"
            width={500}
            height={800}
          />
          <h2 className="text-2xl font-heading text-center my-10">SÖNDAG</h2>
          <p className="text-md font-heading text-center">
            Plats: Toftaholm Herrgård
          </p>

          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li className="flex justify-between w-full">
              <span>10:00</span>
              <span>Frukost</span>
            </li>
            <li className="flex justify-between w-full">
              <span>12:00</span>
              <span>Hej då ❤️</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WeekendPage;
