const ContactPage = () => {
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold text-center mt-10">KONTAKT</h1>
      <div className="container w-200 mx-auto px-4 py-6 flex flex-col gap-6 justify-evenly">
        <div>
          <h2>Toftaholm Herrgård</h2>
          <p>Telefon: xxx-xxxxx</p>
          <p>E-post: xxxx@xxx.com</p>
          <p>
            Hemsida:{" "}
            <a
              href="https://www.toftaholm.se"
              target="_blank"
              rel="noopener noreferrer"
            >
              toftaholm.se
            </a>
          </p>
        </div>
        <div>
          <h2>Olivia</h2>
          <p>Telefon: xxx-xxxxx</p>
          <p>E-post: xxxx@xxx.com</p>
        </div>
        <div>
          <h2>Simon</h2>
          <p>Telefon: xxx-xxxxx</p>
          <p>E-post: xxxx@xxx.com</p>
        </div>
        <div>
          <h2>Toastmaster 1</h2>
          <p>Telefon: xxx-xxxxx</p>
          <p>E-post: xxxx@xxx.com</p>
        </div>
        <div>
          <h2>Toastmaster 2</h2>
          <p>Telefon: xxx-xxxxx</p>
          <p>E-post: xxxx@xxx.com</p>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
