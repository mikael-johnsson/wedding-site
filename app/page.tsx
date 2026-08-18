import Image from "next/image";
import CountdownClock from "./components/CountdownClock";
import OSAPage from "./osa/page";
import WeekendPage from "./helgen/page";
import LivingAndTransportPage from "./boende/page";
import ToastPage from "./toast/page";
import GiftsPage from "./gifts/page";
import GuestsPage from "./guests/page";
import { checkAuth } from "./actions/UserActions";

type GuestsPageProps = {
  searchParams: Promise<{ attending: string; openAll: string }>;
};

export default async function Home({ searchParams }: GuestsPageProps) {
  const authUser = await checkAuth();

  return (
    <main className="flex flex-col gap-20 min-h-screen px-7 py-5 md:py-10 lg:px-25 xl:px-35">
      <section id="hem" className="min-h-screen flex flex-col gap-10">
        <div className="flex items-center flex-col lg:flex-row lg:gap-10 lg:justify-center xl:px-15">
          <div className="w-[97%] md:w-[70%] py-20 md:mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading text-center">
              BERNOZZI WEDDING
            </h1>
            <p className="text-3xl text-center mt-15 mb-30">
              10 – 12 sept 2027
            </p>
            <CountdownClock />
          </div>
          <Image
            src="/simon_olivia_puss.jpeg"
            alt="Wedding"
            width={500}
            height={600}
            className="rounded-lg shadow-xl"
          />
        </div>
      </section>
      <section className="mx-auto flex w-full flex-col items-center gap-15 sm:w-11/12 xl:w-[65%]">
        <div className="flex flex-col-reverse items-center justify-between gap-10 w-[85%] lg:flex-row ">
          <Image
            src="/simon_olivia_orange.jpeg"
            alt="Wedding"
            width={350}
            height={470}
            className="rounded-lg shadow-xl"
          />
          <p className="text-center sm:text-lg">
            2018 blev vi kära. 2021 fick vi äntligen varann. 2027 ska vi gifta
            oss och vill att DU ska vara med❤️
          </p>
        </div>
        <div className="flex flex-col items-center justify-between gap-10 w-[80%] lg:flex-row">
          <p className="text-center sm:text-lg">
            Vi fixar en oförglömlig helg i Småland. Du behöver bara dyka upp i
            dina finaste, och mest dansvänliga, kläder.
          </p>
          <Image
            src="/simon_olivia_hast.jpeg"
            alt="Wedding"
            width={350}
            height={470}
            className="rounded-lg shadow-xl"
          />
        </div>
        <div className="flex flex-col-reverse items-center justify-between gap-10 w-[80%] lg:flex-row">
          <Image
            src="/frances.jpeg"
            alt="Wedding"
            width={350}
            height={470}
            className="rounded-lg shadow-xl"
          />
          <p className="text-center sm:text-lg">
            Era underbara barn älskar vi. Men just denna helg får de tillbringa
            på annan plats.
          </p>
        </div>
      </section>

      <WeekendPage />
      <OSAPage />
      <LivingAndTransportPage />
      <ToastPage />
      <GiftsPage />
      {authUser && <GuestsPage searchParams={searchParams} />}
    </main>
  );
}
