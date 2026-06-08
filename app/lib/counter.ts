export type TimeRemainingType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const counter = (): TimeRemainingType => {
  const now = Date.now();
  const weddingDate = new Date("2027-09-11T14:00:00").getTime();

  const remainingTime = weddingDate - now;

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};
