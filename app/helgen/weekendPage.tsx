import Image from "next/image";

const WeekendPage = () => {
  return (
    <section id="helgen" className="scroll-mt-30 md:px-20">
      <h2 className="text-3xl font-heading text-center mb-8">HELGEN</h2>
      <div className="container mx-auto mt-8 flex flex-col items-center gap-4 px-4 md:px-0 md:gap-6 py-6 xl:flex-row xl:justify-center xl:gap-8">
        {/* FREDAG */}
        <div className="w-full max-w-125 min-h-125 rounded border py-5 px-3 flex flex-col justify-between lg:px-4 xl:min-h-155 2xl:min-h-170">
          <div>
            <Image
              src="/toftaholm_2.jpeg"
              alt="Wedding"
              className="object-contain mx-auto rounded-lg shadow-xl"
              width={500}
              height={800}
            />
            <h3 className="text-2xl font-heading text-center my-10">
              FREDAG 10/9
            </h3>
            <p className="text-md font-heading text-center ">
              Plats: Toftaholm Herrgård
            </p>
          </div>
          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li className="flex justify-between md:justify-evenly lg:justify-between w-full">
              <span className="w-25">18:00</span>
              <span className="w-50 text-right">Skål och välkomna!</span>
            </li>
            <li className="flex justify-between md:justify-evenly lg:justify-between w-full">
              <span className="w-25">18:30</span>
              <span className="w-50 text-right">Middag (195kr pp)</span>
            </li>
          </ul>
        </div>

        {/* LÖRDAG */}
        <div className="w-full max-w-125 min-h-125 rounded border py-5 px-3 flex flex-col justify-between lg:px-4 xl:min-h-155 2xl:min-h-170">
          <div>
            <Image
              src="/varnamo_kyrka.jpg"
              alt="Wedding"
              className="object-contain mx-auto rounded-lg shadow-xl"
              width={500}
              height={800}
            />
            <h3 className="text-2xl font-heading text-center my-10">
              LÖRDAG 11/9
            </h3>
            <p className="text-md font-heading text-center">
              Plats: Värnamo Kyrka / <br />
              Toftaholm Herrgård
            </p>
          </div>
          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li className="flex justify-between md:justify-evenly lg:justify-between w-full">
              <span className="w-25">14:00</span>
              <span className="w-50 text-right">Vigsel i Värnamo Kyrka</span>
            </li>
            <li className="flex justify-between md:justify-evenly lg:justify-between w-full">
              <span className="w-25">16:30</span>
              <span className="w-50 text-right">Brudskål på Toftaholm</span>
            </li>
            <li className="flex justify-between md:justify-evenly lg:justify-between w-full">
              <span className="w-25">18:00</span>
              <span className="w-50 text-right">Middag och fest!</span>
            </li>
          </ul>
        </div>

        {/* SÖNDAG */}
        <div className="w-full max-w-125 min-h-125 rounded border py-5 px-3 flex flex-col justify-between lg:px-4 xl:min-h-155 2xl:min-h-170">
          <div>
            <Image
              src="/toftaholm_1.jpeg"
              alt="Wedding"
              className="object-contain mx-auto rounded-lg shadow-xl"
              width={500}
              height={800}
            />
            <h3 className="text-2xl font-heading text-center my-10">
              SÖNDAG 12/9
            </h3>
            <p className="text-md font-heading text-center">
              Plats: Toftaholm Herrgård
            </p>
          </div>
          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li className="flex justify-between md:justify-evenly lg:justify-between w-full">
              <span className="w-25">10:00</span>
              <span className="w-50 text-right">Frukost</span>
            </li>
            <li className="flex justify-between md:justify-evenly lg:justify-between w-full">
              <span className="w-25">12:00</span>
              <span className="w-50 text-right">Tack å hej ❤️</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WeekendPage;
