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
    <div className="w-full mx-auto">
      <div className="flex justify-center gap-5 md:gap-10 p-3 md:py-4 border">
        <div>
          <p>Dagar</p>
          <p className="text-center mt-2">{timeRemaining.days}</p>
        </div>
        <div>
          <p>Timmar</p>
          <p className="text-center mt-2">{timeRemaining.hours}</p>
        </div>
        <div>
          <p>Minuter</p>
          <p className="text-center mt-2">{timeRemaining.minutes}</p>
        </div>
        <div>
          <p>Sekunder</p>
          <p className="text-center mt-2">{timeRemaining.seconds}</p>
        </div>
      </div>
      <p className="text-lg text-center font-bold mt-10">OSA senast 31 maj</p>
    </div>
  );
};

export default CountdownClock;
