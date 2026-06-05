const WeekendPage = () => {
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold text-center mt-10">HELGEN</h1>
      <div className="container mx-auto px-4 py-6 flex gap-6 justify-evenly">
        <div className="border rounded p-6 h-120 w-1/4">
          <h2 className="text-2xl font-extrabold text-center my-10">FREDAG</h2>
          <p className="text-md font-bold text-center ">Toftaholm Herrgård</p>
          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li>MIDDAG 18:00 (195kr / person)</li>
            <li>QUIZ 19:30</li>
            <li>KARAOKE</li>
          </ul>
        </div>
        <div className="border rounded p-6 h-120 w-1/4">
          <h2 className="text-2xl font-extrabold text-center my-10">LÖRDAG</h2>
          <p className="text-md font-bold text-center ">
            Värnamo Kyrka / Toftaholm Herrgård
          </p>

          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li>VIGSEL 14:00</li>
            <li>MINGEL 16:00</li>
            <li>MIDDAG 18:00</li>
          </ul>
        </div>
        <div className="border rounded p-6 h-120 w-1/4">
          <h2 className="text-2xl font-extrabold text-center my-10">SÖNDAG</h2>
          <p className="text-md font-bold text-center ">Toftaholm Herrgård</p>

          <ul className="list-none list-inside mt-15 flex flex-col gap-4 items-center">
            <li>FRUKOST 10:00</li>
            <li>HEJ DÅ 12:00</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default WeekendPage;
