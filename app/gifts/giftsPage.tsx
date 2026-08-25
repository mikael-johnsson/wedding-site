import Image from "next/image";

const GiftsPage = () => {
  return (
    <section
      id="gifts"
      className=" px-4 text-text-black sm:px-6 lg:px-8 scroll-mt-30"
    >
      <h1 className="text-4xl font-heading text-center mb-8">GÅVOR</h1>
      <p className="text-center w-80 md:w-125 mx-auto">
        Den största gåvan är att få fira denna dagen med dig! Vill du också
        bidra med en slant till vår bröllopsresa blir vi extra glada.
      </p>
      <p className="text-center mt-10">
        Swisha isåfall till Stefan Johansson: 072-350 17 63 <br />
        Märk gärna swishen ”Bröllopsgåva”.
      </p>
      <Image
        src="/simon_olivia_puss_2.jpeg"
        alt="Wedding"
        width={400}
        height={500}
        className="mx-auto my-10 rounded-lg shadow-xl"
      />
    </section>
  );
};

export default GiftsPage;
