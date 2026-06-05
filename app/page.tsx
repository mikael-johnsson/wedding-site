import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div className=" w-1/2 py-44">
        <h1 className="text-5xl font-bold text-center">BERNOZZI WEDDING</h1>
        <p className="text-xl text-center mt-15">10-12 sept 2027</p>
      </div>
      <div className=" w-1/2 ">
        <Image
          src="/couples_placeholder.jpg"
          alt="Wedding"
          className=" object-contain"
          width={800}
          height={1000}
        />
      </div>
    </main>
  );
}
