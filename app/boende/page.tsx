const LivingAndTransportPage = () => {
  return (
    <main id="logistik" className="min-h-screen px-10">
      <h1 className="text-4xl font-heading text-center mt-10">
        BOENDE & TRANSPORT
      </h1>
      <div className="mx-auto max-w-5xl md:max-w-2xl flex flex-col gap-6 px-2 md:px-4 py-10 lg:flex-row lg:items-start lg:justify-center lg:gap-10">
        <div className="w-full max-w-2xl px-4 py-10 lg:w-1/2">
          <h2 className="text-2xl font-heading mb-6 text-center">Boende</h2>
          <div className="flex flex-col gap-4">
            <p>
              Bokar du på egen hand via telefon eller mejl till Toftaholm. Alla
              gäster har rabatterat pris. Uppge Simon och Olivia vid bokning.
            </p>
            <p>Dubbelrum: 1 990 kr per rum & natt</p>
            <p>Enkelrum: 1 590 kr per rum & natt</p>
            <div>
              <p className="font-bold">Toftaholm Herrgård</p>
              <p>Adress: Toftaholm Herrgård, 1, 341 55 Vittaryd</p>
              <p>Telefon: 0370-44055</p>
              <p>Mejl: info@toftaholm.se</p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-2xl px-4 py-10 lg:w-1/2">
          <h2 className="text-2xl font-heading text-center mb-6">Transport</h2>
          <div className="flex flex-col gap-4">
            <p>Egen bil är att föredra.</p>
            <p>
              Till och från vigsel hoppas vi att transport kan lösas med hjälp
              av lite hederlig samåkning.
            </p>
            <p>
              Har du ingen aning om hur du ska transportera dig? Hör av dig till
              brudparet så snart som möjligt så ska vi lösa det!
            </p>
            <p>Olivia: 073-8058778</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LivingAndTransportPage;
