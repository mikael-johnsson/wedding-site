"use client";

import { useEffect, useState } from "react";
import { counter, TimeRemainingType } from "../lib/counter";

const CountdownClock = () => {
	const [timeRemaining, setTimeRemaining] =
		useState<TimeRemainingType>(counter());

	useEffect(() => {
		const update = () => setTimeRemaining(counter());

		update();
		const interval = setInterval(update, 1000);

		return () => clearInterval(interval);
	}, []);

	if (!timeRemaining) {
		return <p>Kan inte hitta time remaining</p>;
	}

	return (
		<div className="w-80 mx-auto md:w-100">
			<div className={`flex justify-center gap-5 md:gap-10 p-3 md:py-4`}>
				<div className="w-15 h-15 sm:w-20 sm:h-20 md:w-30 md:h-30 flex flex-col items-center justify-center bg-accent-green text-bg-beige rounded-lg p-2 gap-1">
					<p className="text-center text-xl">{timeRemaining.days}</p>
					<p className="text-[9px] sm:text-md">DAGAR</p>
				</div>
				<div className="w-15 h-15 sm:w-20 sm:h-20 md:w-30 md:h-30 flex flex-col items-center justify-center bg-accent-green text-bg-beige rounded-lg p-2 gap-1">
					<p className="text-center text-xl">{timeRemaining.hours}</p>
					<p className="text-[9px] sm:text-md">TIMMAR</p>
				</div>
				<div className="w-15 h-15 sm:w-20 sm:h-20 md:w-30 md:h-30 flex flex-col items-center justify-center bg-accent-green text-bg-beige rounded-lg p-2 gap-1">
					<p className="text-center text-xl">{timeRemaining.minutes}</p>
					<p className="text-[9px] sm:text-md">MINUTER</p>
				</div>
				<div className="w-15 h-15 sm:w-20 sm:h-20 md:w-30 md:h-30 flex flex-col items-center justify-center bg-accent-green text-bg-beige rounded-lg p-2 gap-1">
					<p className="text-center text-xl">{timeRemaining.seconds}</p>
					<p className="text-[9px] sm:text-md">SEKUNDER</p>
				</div>
			</div>
		</div>
	);
};

export default CountdownClock;
