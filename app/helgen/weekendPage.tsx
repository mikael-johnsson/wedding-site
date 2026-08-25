import Image from "next/image";

const WeekendPage = () => {
  return (
    <section id="helgen" className="scroll-mt-30">
      <h1 className="text-4xl font-heading text-center mb-8">HELGEN</h1>
      <div className="container mx-auto mt-8 flex flex-col gap-4 px-4 md:px-0 py-6 lg:flex-row lg:justify-center lg:gap-8">
        {/* FREDAG */}
        <div className="w-full rounded border py-5 px-3 flex flex-col justify-between lg:w-[30%] lg:px-4">
          <div>
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
          </div>
          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li className="flex justify-between md:justify-evenly lg:justify-between w-full">
              <span className="w-25">18:00</span>
              <span className="w-45 text-right">Skål och välkomna!</span>
            </li>
            <li className="flex justify-between md:justify-evenly lg:justify-between w-full">
              <span className="w-25">18:30</span>
              <span className="w-45 text-right">Middag (195kr pp)</span>
            </li>
          </ul>
        </div>

        {/* LÖRDAG */}
        <div className="w-full rounded border p-6 flex flex-col justify-between lg:w-[30%] lg:px-4">
          <div>
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
          </div>
          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li className="flex justify-between md:justify-evenly lg:justify-between w-full">
              <span className="w-25">14:00</span>
              <span className="w-45 text-right">Vigsel i Värnamo Kyrka</span>
            </li>
            <li className="flex justify-between md:justify-evenly lg:justify-between w-full">
              <span className="w-25">16:30</span>
              <span className="w-45 text-right">Brudskål på Toftaholm</span>
            </li>
            <li className="flex justify-between md:justify-evenly lg:justify-between w-full">
              <span className="w-25">18:00</span>
              <span className="w-45 text-right">Middag och fest!</span>
            </li>
          </ul>
        </div>

        {/* SÖNDAG */}
        <div className="w-full rounded border p-6 flex flex-col justify-between lg:w-[30%] lg:px-4">
          <div>
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
          </div>
          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li className="flex justify-between md:justify-evenly lg:justify-between w-full">
              <span className="w-25">10:00</span>
              <span className="w-45 text-right">Frukost</span>
            </li>
            <li className="flex justify-between md:justify-evenly lg:justify-between w-full">
              <span className="w-25">12:00</span>
              <span className="w-45 text-right">Tack å hej ❤️</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WeekendPage;
