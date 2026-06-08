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
    <div>
      <div className=" text-center py-4 w-300 mx-auto flex gap-20 justify-center">
        <div>
          <p>Dagar</p>
          <p>{timeRemaining.days}</p>
        </div>
        <div>
          <p>Timmar</p>
          <p>{timeRemaining.hours}</p>
        </div>
        <div>
          <p>Minuter</p>
          <p>{timeRemaining.minutes}</p>
        </div>
        <div>
          <p>Sekunder</p>
          <p>{timeRemaining.seconds}</p>
        </div>
      </div>
      <p className="text-lg text-center">OSA senast 31 maj</p>
    </div>
  );
};

export default CountdownClock;
