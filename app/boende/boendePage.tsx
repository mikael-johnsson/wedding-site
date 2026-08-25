const LivingAndTransportPage = () => {
  return (
    <section id="logistik" className="px-6 scroll-mt-30">
      <h2 className="text-3xl font-heading text-center">BOENDE & TRANSPORT</h2>
      <div className="mx-auto max-w-5xl md:max-w-2xl flex flex-col gap-6 px-2 md:px-4 py-7 lg:flex-row lg:items-start lg:justify-center lg:gap-10">
        <div className="w-full max-w-2xl px-2 py-7 lg:w-1/2">
          <h3 className="text-2xl font-heading text-center mb-6">Boende</h3>
          <div className="flex flex-col items-center lg:items-end gap-4">
            <p className="w-65 sm:w-90 md:w-120 lg:w-80">
              Bokar du på egen hand via telefon eller mejl till Toftaholm.
              <br />
              Uppge ”Olivia och Simon” för rabatterat pris.
            </p>
            <p className="w-65 sm:w-90 md:w-120 lg:w-80">
              Dubbelrum: 1 990 kr per natt
              <br />
              Enkelrum: 1 590 kr per natt
            </p>
            <div className="flex flex-col items-center lg:items-end gap-1">
              <p className="w-65 sm:w-90 md:w-120 lg:w-80 font-bold">
                Toftaholm Herrgård
              </p>
              <p className="w-65 sm:w-90 md:w-120 lg:w-80">
                Adress: Toftaholm Herrgård 1, <br />
                341 55 Vittaryd
              </p>
              <p className="w-65 sm:w-90 md:w-120 lg:w-80">
                Telefon: 0370-44055
              </p>
              <p className="w-65 sm:w-90 md:w-120 lg:w-80">
                Mejl: info@toftaholm.se
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-2xl px-4 py-7 lg:w-1/2">
          <h3 className="text-2xl font-heading text-center mb-6">Transport</h3>
          <div className="flex flex-col gap-4 items-center">
            <p className="w-65 sm:w-90 md:w-120 lg:w-80">
              Egen bil är att föredra.
            </p>
            <p className="w-65 sm:w-90 md:w-120 lg:w-80">
              Till och från vigsel hoppas vi att transport kan lösas med hjälp
              av lite hederlig samåkning.
            </p>
            <p className="w-65 sm:w-90 md:w-120 lg:w-80">
              Har du ingen aning om hur du ska transportera dig? Hör av dig till
              kyrkvärdarna!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivingAndTransportPage;
