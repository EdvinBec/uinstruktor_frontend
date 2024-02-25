import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import Cpp from "@/assets/cpp-logo.svg";
import Python from "@/assets/python-logo.svg";
import Java from "@/assets/java-logo.svg";
import Person from "@/assets/classes-icon.svg";
import Clipboard from "@/assets/group-icons.svg";
import Circle from "@/assets/circle-icon.svg";
import Scoreboard from "@/assets/score-icon.svg";
import Bolt from "@/assets/bolt-icon.svg";

import LandingNavbar from "@/components/Navbar/LandingNavbar";
import Footer from "@/components/Footer/Footer";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { ContainerScroll } from "@/components/ui/container-scroll";

const words = [
  { text: "Samostojno", className: "" },
  { text: "učenje", className: "" },
  { text: "programiranja,", className: "" },
  { text: "poenostaljeno", className: "text-blue" },
];

export default function Home() {
  return (
    <div className="bg-noise">
      <LandingNavbar />
      <div
        className="mt-16 p-8 flex flex-col relative"
        suppressHydrationWarning
      >
        <h1 className="text-center text-5xl md:text-7xl font-black">
          Samostojno učenje
          <br /> programiranja, <br />
          <span className="text-transparent bg-gradient-to-r from-sky-500 to-blue bg-clip-text">
            poenostavljeno
          </span>
        </h1>
        <p className="mt-6 text-center font-medium">
          Nov pristop do učenja programiranja.
        </p>
        <p className="text-center font-medium">
          Preprosto in prilagojeno tvojemu trenutnemu nivoju znanja.
        </p>
        <div className="mt-16 mb-8 self-center flex flex-col gap-4 items-center justify-center  ">
          <Button className="" variant="landing" size={"xl"}>
            Začni učenje
          </Button>
        </div>

        <div className="py-16 px-8 flex items-center justify-evenly md:w-1/2 w-full flex-row self-center">
          <Image className="w-[60px] lg:w-[100px]" src={Cpp} alt="C++ Logo" />
          <Image
            className="w-[60px] lg:w-[100px]"
            src={Python}
            alt="C++ Logo"
          />
        </div>
        <Separator className="my-16 w-3/4 self-center" />

        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-4xl lg:text-5xl mt-8 font-bold text-center">
                Rešujte naloge s pomočjo <br />{" "}
                <span className="text-blue-500">umetne inteligence</span>
              </h2>
              <p className="text-center mt-8">
                Open AI Model - analizira vašo kodo ter ponuja napotke za
                izboljšavo in bolj <br /> učinkovito reševanje nalog.
              </p>
            </>
          }
        />

        <h3 className="text-3xl lg:text-4xl mt-16 text-center font-bold">
          Značilnosti in prednosti
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 p-8 lg:mx-16 mt-8 self-center justify-items-center">
          <div className="space-y-4 lg:w-2/3 p-8 flex flex-col">
            <Image src={Person} className="self-center" alt="d" />
            <h4 className="text-2xl text-center font-medium">
              Ustvarjanje učilnic
            </h4>
            <p className="text-center">
              Ustvarite svojo učilnico, v katero se lahko pridružijo učenci in
              imate popoln nadzor nad njihovim delom.
            </p>
          </div>
          <div className="space-y-4 lg:w-2/3 p-8 flex flex-col">
            <Image src={Clipboard} className="self-center" alt="d" />
            <h4 className="text-2xl text-center font-medium">
              Skupinsko preverjanje znanja
            </h4>
            <p className="text-center">
              Ustvari časovno omejena preverjanja znanja za posamezno skupino
              uporabnikov.
            </p>
          </div>
          <div className="space-y-4 lg:w-2/3 p-8 flex flex-col">
            <Image src={Circle} className="self-center" alt="d" />
            <h4 className="text-2xl text-center font-medium">
              Dodajanje svojih nalog
            </h4>
            <p className="text-center">
              Če niste zadovoljni z že dodanimi nalogami. Lahko tudi ustvarite
              svoje in jih dodate v svojo učilnico.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:w-1/2 self-center justify-items-center justify-evenly">
          <div className="space-y-4 w-2/3 p-8 flex flex-col">
            <Image src={Scoreboard} className="self-center" alt="d" />
            <h4 className="text-2xl text-center font-medium">
              Avtomatsko ocenjevanje
            </h4>
            <p className="text-center">
              Umetna inteligenca ob reševanju nalog analizira vašo kodo ter
              sestavlja oceno vašega znanja.
            </p>
          </div>
          <div className="space-y-4 w-2/3 p-8 flex flex-col">
            <Image src={Bolt} className="self-center" alt="d" />
            <h4 className="text-2xl text-center font-medium">Hitra pomoč</h4>
            <p className="text-center">
              V primeru da se zataknete pri reševanju lahko uporabite zbrane
              točke in zaprosite osebnega AI asistenta za pomoč.
            </p>
          </div>
        </div>
      </div>
      <div className="px-8">
        <Footer />
      </div>
    </div>
  );
}
