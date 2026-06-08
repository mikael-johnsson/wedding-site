import Image from "next/image";

const ToastPage = () => {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center my-10">
        Toast och kyrkvärd
      </h1>
      <div className="flex justify-between px-10">
        <div className=" w-1/2 mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold text-center mb-10">Toast</h2>
          <div>
            <Image
              src="/toast_placeholder.jpg"
              alt="Toast"
              width={400}
              height={300}
              className="mx-auto mt-10"
            />
            <p className=" mt-10">Här är info om toastpersonen!</p>
            <p>Mejl: xxxxx@exempel.se</p>
            <p>Telefon: xxx-xxx xx xx</p>
          </div>
        </div>
        <div className=" w-1/2 mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold text-center mb-10">Kyrkvärd</h2>
          <div>
            <Image
              src="/priest_placeholder_2.jpg"
              alt="Toast"
              width={400}
              height={300}
              className="mx-auto mt-10"
            />
            <p className=" mt-10">Här är info om kyrkvärden!</p>
            <p>Mejl: xxxxx@exempel.se</p>
            <p>Telefon: xxx-xxx xx xx</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ToastPage;
