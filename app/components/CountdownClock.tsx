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
      <div
        className={`flex justify-center gap-5 md:gap-10 p-3 md:py-4 backgroundOpacity ${backgroundOpacity} removeOpacity`}
      >
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
    </div>
  );
};

export default CountdownClock;
