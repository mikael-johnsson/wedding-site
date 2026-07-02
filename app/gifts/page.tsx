import Image from "next/image";

const GiftsPage = () => {
  return (
    <main>
      <h1 className="text-4xl font-heading text-center my-10">GÅVOR</h1>
      <p className="text-center w-70 md:w-125 mx-auto">
        Den största gåvan är att du dyker upp och firar oss. Vill du också bidra
        med en slant till vår bröllopsresa blir vi extra glada.
      </p>
      <p className="text-center mt-10">Swisha isåfall till xxx-xxx xx xx</p>
      <Image
        src="/simon_olivia_puss_2.jpeg"
        alt="Wedding"
        width={400}
        height={500}
      />
    </main>
  );
};

export default GiftsPage;
