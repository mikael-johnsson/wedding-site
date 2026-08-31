import Image from "next/image";
import CountdownClock from "./components/CountdownClock";
import OSAPage from "./osa/osaPage";
import WeekendPage from "./helgen/weekendPage";
import LivingAndTransportPage from "./boende/boendePage";
import ToastPage from "./toast/toastPage";
import GiftsPage from "./gifts/giftsPage";
import { backgroundOpacity } from "./styles/tailwindVariables";

export default async function Home() {
  return (
    <main className="flex flex-col gap-35 items-center">
      <section
        id="hem"
        className={`w-screen scroll-mt-40 py-7 backgroundURL backgroundPositionXS backgroundPositionSM backgroundPositionXL`}
      >
        <div className="md:w-[85%] pt-30 xl:pt-20 flex justify-center items-center gap-20 md:mx-auto ">
          <div className="h-120 flex flex-col items-center justify-evenly gap-5">
            <h1
              className={`mx-2 text-4xl md:text-5xl font-heading text-center ${backgroundOpacity} removeOpacity`}
            >
              BERNOZZI WEDDING
            </h1>
            <p
              className={`text-3xl text-center w-80 ${backgroundOpacity} removeOpacity`}
            >
              10 – 12 sept 2027
            </p>

            <div className="flex flex-col items-center gap-10">
              <CountdownClock />
            </div>
          </div>
          <div className="hidden xl:block w-95 h-135 overflow-hidden rounded-lg shadow-xl">
            <Image
              className="hidden xl:block "
              src={"/simon_olivia_glasses.jpeg"}
              alt="Bild på brudparet"
              width={400}
              height={500}
            />
          </div>
        </div>
      </section>
      <section className="mx-auto flex w-full flex-col items-center gap-20 sm:w-11/12 xl:w-[75%]">
        <div className="flex flex-col-reverse items-center justify-evenly gap-6 w-[85%] lg:flex-row ">
          <Image
            src="/simon_olivia_orange.jpeg"
            alt="Wedding"
            width={350}
            height={470}
            className="rounded-lg shadow-xl"
          />
          <p className="text-center sm:text-lg">
            2018 föll vi för varandra.
            <br />
            2021 blev det äntligen vi.
            <br />
            2027 säger vi ja.
            <br />
            Det vill vi fira med DIG ❤️
          </p>
        </div>

        <div className="flex flex-col items-center justify-evenly gap-6 lg:flex-row">
          <div>
            <p className="text-center w-80 sm:w-95 sm:text-lg">
              Vi fixar en oförglömlig helg i Smålands skogar. Du behöver bara
              dyka upp i dina finaste och mest dansvänliga kläder!
            </p>
            <br />
            <p className="text-center w-74 sm:w-100 sm:text-lg">
              Era underbara barn älskar vi men denna helg får de tillbringa på
              annan plats. Givetvis med undantag för de allra minsta.
            </p>
          </div>
          <Image
            src="/frances.jpeg"
            alt="Wedding"
            width={350}
            height={470}
            className="rounded-lg shadow-xl"
          />
        </div>
      </section>

      <WeekendPage />
      <OSAPage />
      <LivingAndTransportPage />
      <ToastPage />
      <GiftsPage />
    </main>
  );
}
