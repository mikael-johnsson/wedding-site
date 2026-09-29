import Image from "next/image";
import CountdownClock from "./components/CountdownClock";
import OSAPage from "./osa/osaPage";
import WeekendPage from "./helgen/weekendPage";
import LivingAndTransportPage from "./boende/boendePage";
import ToastPage from "./toast/toastPage";
import GiftsPage from "./gifts/giftsPage";

const dot =
	"relative before:content-[' '] before:absolute before:top-1  before:rounded-full before:bg-text-black";
const smallDot =
	"before:-left-[15px] before:w-6 before:h-6 before:bg-text-black";
const bigDot =
	"before:-left-[20px] before:w-9 before:h-9 before:border-6 before:bg-bg-beige! before:border-text-black";

export default async function Home() {
	return (
		<main className="flex flex-col gap-35 items-center w-full">
			<section
				id="hem"
				className={`w-screen scroll-mt-40 py-7 mx-auto`}
			>
				<div className="md:w-[85%] pt-30 xl:pt-20 flex justify-center items-center gap-35 mx-auto ">
					<div className="flex flex-col items-center justify-evenly gap-16">
						<h1
							className={`mx-2 text-4xl md:text-5xl font-heading text-center`}
						>
							BERNOZZI WEDDING
						</h1>
						<p className={`text-3xl text-center w-80 `}>10 – 12 sept 2027</p>

						<div className="flex flex-col items-center gap-10">
							<CountdownClock />
						</div>
						<div>
							<p className="text-xl text-center sm:text-2xl md:text-3xl">
								Tre dagar med er -<br /> våra favoritmänniskor
							</p>
						</div>
						<div className="w-[90%] h-80 ml-10 mt-10 -rotate-8 shadow-3xl">
							<Image
								src="/4-1-cropped.jpeg"
								alt="Tre bilder på Simon och Olivia"
								width={600}
								height={250}
								className="rounded-lg shadow-2xl"
							/>
						</div>
						<div>
							<ol>
								<li className={`border-l-5 pl-6 pb-6 ${dot} ${smallDot}`}>
									<p className="text-2xl mb-2">2018</p>
									<p>föll vi för varandra.</p>
								</li>
								<li className={`border-l-5 pl-6 pb-6 ${dot} ${smallDot}`}>
									<p className="text-2xl mb-2">2021</p>
									<p>blev det äntligen vi.</p>
								</li>
								<li className={`border-l-5 pl-6 pb-3 ${dot} ${bigDot}`}>
									<p className="text-2xl mb-2">2027</p>
									<p>säger vi ja.</p>
								</li>
							</ol>
						</div>
						<p className="mt-10 text-2xl sm:text-4xl text-center">
							Det vill vi fira med dig❤️
						</p>
					</div>
				</div>
			</section>
			<section className="mx-auto flex w-full flex-col items-center gap-20 sm:w-11/12 xl:w-[75%]">
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
