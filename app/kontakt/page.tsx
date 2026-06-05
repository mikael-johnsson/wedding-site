import Image from "next/image";

const ContactPage = () => {
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold text-center mt-10">KONTAKT</h1>
      <div className="container w-300 mx-auto px-4 py-10 flex gap-6 justify-between">
        <div className="container w-200 mx-auto px-4 py-6 flex flex-col gap-6 justify-evenly">
          <div>
            <h2 className="text-xl font-bold">Toftaholm Herrgård</h2>
            <p>Telefon: xxx-xxxxx</p>
            <p>E-post: xxxx@xxx.com</p>
            <p>
              Hemsida:{" "}
              <a
                href="https://www.toftaholm.se"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                toftaholm.se
              </a>
            </p>
            <p>Adress: Toftaholm Herrgård, Toftaholm, 341 55 Vitteryd</p>
            <p>
              {" "}
              <a
                href="https://maps.app.goo.gl/FW7APCS7Gip3petR6"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Karta
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">Toastmaster 1</h2>
            <p>Telefon: xxx-xxxxx</p>
            <p>E-post: xxxx@xxx.com</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Toastmaster 2</h2>
            <p>Telefon: xxx-xxxxx</p>
            <p>E-post: xxxx@xxx.com</p>
          </div>
        </div>
        <div>
          <Image
            src="/herrgård-sketchad.png"
            alt="Herrgård"
            width={800}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
