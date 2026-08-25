import Image from "next/image";
import CountdownClock from "./components/CountdownClock";
import OSAPage from "./osa/osaPage";
import WeekendPage from "./helgen/weekendPage";
import LivingAndTransportPage from "./boende/boendePage";
import ToastPage from "./toast/toastPage";
import GiftsPage from "./gifts/giftsPage";
import GuestsPage from "./guests/guestsPage";
import { checkAuth } from "./actions/UserActions";

type GuestsPageProps = {
  searchParams: Promise<{ attending: string; openAll: string }>;
};

export default async function Home({ searchParams }: GuestsPageProps) {
  const authUser = await checkAuth();

  return (
    <main className="flex flex-col gap-25  px-7 lg:px-18 xl:px-35 pt-10 ">
      <section id="hem" className="flex flex-col gap-10 scroll-mt-40">
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
            className="rounded-lg shadow-xl mt-30 sm:my-0"
          />
        </div>
      </section>
      <section className="mx-auto flex w-full flex-col items-center gap-20 sm:w-11/12 xl:w-[65%]">
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
            2021 blev vi äntligen vi.
            <br />
            2027 säger vi ja.
            <br />
            Det vill vi fira med DIG ❤️
          </p>
        </div>

        <div className="flex flex-col items-center justify-evenly gap-6 w-[80%] lg:flex-row">
          <p className="text-center md:w-[50%] lg:w-[38%] sm:text-lg ">
            Vi fixar en oförglömlig helg i Småland. Dyk upp i dina finaste och
            mest dansvänliga kläder.
            <br />
            <br />
            Era underbara barn älskar vi. Just denna helg får de dock tillbringa
            på annan plats. Givetvis med undantag för småttingarna som
            fortfarande ammar.
          </p>
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
      {authUser && <GuestsPage searchParams={searchParams} />}
    </main>
  );
}
