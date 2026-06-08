import CountdownClock from "./components/CountdownClock";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen py-10">
      <div className="flex">
        <div className=" w-1/2 py-44 mx-auto">
          <h1 className="text-5xl font-bold text-center">BERNOZZI WEDDING</h1>
          <p className="text-xl text-center mt-15">10-12 sept 2027</p>
        </div>
        {/* <div className=" w-1/2 ">
          <Image
            src="/couples_placeholder.jpg"
            alt="Wedding"
            className=" object-contain"
            width={800}
            height={1000}
          />
        </div> */}
      </div>
      <CountdownClock />
      <div className="flex flex-col gap-10 mt-10 w-1/2 mx-auto">
        <p className="text-lg text-center">
          2018 blev vi kära. 2021 fick vi äntligen varann. 2027 ska vi gifta oss
          och vill att DU ska vara med❤️.
        </p>
        <p className="text-lg text-center">
          Vi fixar en oförglömlig helg i Småland. Du behöver bara dyka upp i
          dina finaste, och mest dansvänliga, kläder.
        </p>
        <p className="text-lg text-center">
          Era underbara barn älskar vi. Men just denna helg får de tillbringa på
          annan plats.
        </p>
      </div>
    </main>
  );
}
