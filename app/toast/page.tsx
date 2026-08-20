import Image from "next/image";

const ToastPage = () => {
  return (
    <section id="toast" className="min-h-screen px-10 scroll-mt-30">
      <h1 className="text-4xl font-heading text-center mb-8">
        TOAST & KYRKVÄRD
      </h1>
      <div className="mx-auto">
        <div className="w-full px-4 py-10">
          <h2 className="text-2xl font-heading text-center mb-10">
            Toastparet
          </h2>
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div>
              <h3 className="text-center text-lg mb-2">Toast Toastsson</h3>
              <Image
                src="/toast_placeholder.jpg"
                alt="Toast"
                width={400}
                height={300}
                className="mx-auto rounded-lg shadow-xl"
              />
              <div className="mt-4 flex flex-col gap-4 mx-auto text-center">
                <p>Här är info om toastpersonen!</p>
                <p>Mejl: xxxxx@exempel.se</p>
                <p>Telefon: xxx-xxx xx xx</p>
              </div>
            </div>
            <div>
              <h3 className="text-center text-lg mb-2">Toast Toastsson</h3>

              <Image
                src="/toast_placeholder.jpg"
                alt="Toast"
                width={400}
                height={300}
                className="mx-auto rounded-lg shadow-xl"
              />
              <div className="mt-4 flex flex-col gap-4 mx-auto text-center">
                <p>Här är info om toastpersonen!</p>
                <p>Mejl: xxxxx@exempel.se</p>
                <p>Telefon: xxx-xxx xx xx</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center mt-10 items-center gap-4">
            <button className="border rounded p-2 bg-text-black text-bg-primary w-40">
              Anmäl tal
            </button>
            <p>Här anmäler du tal eller spex!</p>
          </div>
        </div>
        <div className="w-full px-4 py-10">
          <h2 className="text-2xl font-heading text-center mb-10">
            Kyrkvärdarna
          </h2>
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div>
              <h3 className="text-center text-lg mb-2">
                Kyrkvärd Kyrkvärdsson
              </h3>

              <Image
                src="/priest_placeholder_2.jpg"
                alt="Toast"
                width={400}
                height={300}
                className="mx-auto rounded-lg shadow-xl"
              />
              <div className="mt-4 flex flex-col gap-4 mx-auto text-center">
                <p>Här är info om kyrkvärden!</p>
                <p>Mejl: xxxxx@exempel.se</p>
                <p>Telefon: xxx-xxx xx xx</p>
              </div>
            </div>
            <div>
              <h3 className="text-center text-lg mb-2">
                Kyrkvärd Kyrkvärdsson
              </h3>

              <Image
                src="/priest_placeholder_2.jpg"
                alt="Toast"
                width={400}
                height={300}
                className="mx-auto rounded-lg shadow-xl"
              />
              <div className="mt-4 flex flex-col gap-4 mx-auto text-center">
                <p>Här är info om kyrkvärden!</p>
                <p>Mejl: xxxxx@exempel.se</p>
                <p>Telefon: xxx-xxx xx xx</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToastPage;
