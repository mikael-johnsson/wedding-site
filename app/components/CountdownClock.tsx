"use client";

import { useEffect, useState } from "react";
import { counter, TimeRemainingType } from "../lib/counter";
import { backgroundOpacity } from "../styles/tailwindVariables";

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
			<div className={`flex justify-center gap-5 md:gap-10 p-3 md:py-4 `}>
				<div className="width-35 height-35 flex flex-col items-center justify-center bg-accent-green text-bg-beige rounded-lg p-3 gap-1">
					<p className="text-center text-3xl">{timeRemaining.days}</p>
					<p className="text-xs">DAGAR</p>
				</div>
				<div className="width-35 height-35 flex flex-col items-center justify-center bg-accent-green text-bg-beige rounded-lg p-3 gap-1">
					<p className="text-center text-3xl">{timeRemaining.hours}</p>
					<p className="text-xs">TIMMAR</p>
				</div>
				<div className="width-35 height-35 flex flex-col items-center justify-center bg-accent-green text-bg-beige rounded-lg p-3 gap-1">
					<p className="text-center text-3xl">{timeRemaining.minutes}</p>
					<p className="text-xs">MINUTER</p>
				</div>
				<div className="width-35 height-35 flex flex-col items-center justify-center bg-accent-green text-bg-beige rounded-lg p-3 gap-1">
					<p className="text-center text-3xl">{timeRemaining.seconds}</p>
					<p className="text-xs">SEKUNDER</p>
				</div>
			</div>
		</div>
	);
};

export default CountdownClock;
