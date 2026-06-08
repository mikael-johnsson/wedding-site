import Image from "next/image";

const LivingAndTransportPage = () => {
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold text-center mt-10">
        BOENDE & TRANSPORT
      </h1>
      <div className="flex">
        <div className=" w-300 mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-10 text-center">Boende</h2>
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
        <div className="container w-300 mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold text-center mb-10">Transport</h2>
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default LivingAndTransportPage;
