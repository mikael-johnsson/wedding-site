import Image from "next/image";

const ToastPage = () => {
  return (
    <main>
      <h1 className="text-4xl font-heading text-center mt-10 mb-5">
        TOAST & KYRKVÄRD
      </h1>
      <div className="mx-auto flex flex-col gap-6 px-4 lg:flex-row lg:justify-center lg:gap-10 lg:px-10">
        <div className="w-full px-4 py-10 lg:w-1/2">
          <h2 className="text-2xl font-heading text-center mb-10">Toast</h2>
          <div>
            <Image
              src="/toast_placeholder.jpg"
              alt="Toast"
              width={400}
              height={300}
              className="mx-auto mt-10"
            />
            <div className="mt-4 flex flex-col gap-4 mx-auto text-center">
              <p>Här är info om toastpersonen!</p>
              <p>Mejl: xxxxx@exempel.se</p>
              <p>Telefon: xxx-xxx xx xx</p>
            </div>
          </div>
        </div>
        <div className="w-full  px-4 py-10 lg:w-1/2">
          <h2 className="text-2xl font-heading text-center mb-10">Kyrkvärd</h2>
          <div>
            <Image
              src="/priest_placeholder_2.jpg"
              alt="Toast"
              width={400}
              height={300}
              className="mx-auto mt-10"
            />
            <div className="mt-4 flex flex-col gap-4 mx-auto text-center">
              <p>Här är info om kyrkvärden!</p>
              <p>Mejl: xxxxx@exempel.se</p>
              <p>Telefon: xxx-xxx xx xx</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ToastPage;
