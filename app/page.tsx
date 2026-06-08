import CountdownClock from "./components/CountdownClock";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen py-10">
      <section className="h-screen">
        <div className=" w-1/2 py-20 mx-auto">
          <h1 className="text-5xl font-bold text-center">BERNOZZI WEDDING</h1>
          <p className="text-xl text-center mt-15">10-12 sept 2027</p>
        </div>
        <CountdownClock />
      </section>
      <section className="mx-auto flex w-[92%] flex-col gap-8 sm:w-11/12 md:w-5/6 lg:w-1/2">
        <p className="text-base leading-relaxed text-center sm:text-lg">
          2018 blev vi kära. 2021 fick vi äntligen varann. 2027 ska vi gifta oss
          och vill att DU ska vara med❤️.
        </p>
        <p className="text-base leading-relaxed text-center sm:text-lg">
          Vi fixar en oförglömlig helg i Småland. Du behöver bara dyka upp i
          dina finaste, och mest dansvänliga, kläder.
        </p>
        <p className="text-base leading-relaxed text-center sm:text-lg">
          Era underbara barn älskar vi. Men just denna helg får de tillbringa på
          annan plats.
        </p>
      </section>
    </main>
  );
}
