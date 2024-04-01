import localfont from "next/font/local";
import RandomFileComponent from "./components/RandomFileComponent"; // Ajusta la ruta según sea necesario
import RandomFilePage from "./pages/randomFile";
const pixel = localfont({
  src: [
    {
      path: "../../public/fonts/pixel.ttf",
      weight: "700",
    },
  ],
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="font-pixel border-black rainbow-text my-5 md:text-3xl text-2xl">
        Internet is great
      </h1>
      <RandomFilePage />
    </main>
  );
}
