import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import Person from "@/assets/classes-icon.svg";
import Clipboard from "@/assets/group-icons.svg";
import Circle from "@/assets/circle-icon.svg";
import Scoreboard from "@/assets/score-icon.svg";
import Bolt from "@/assets/bolt-icon.svg";

import LandingNavbar from "@/components/Navbar/LandingNavbar";
import Footer from "@/components/Footer/Footer";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { Label } from "@/components/ui/label";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconSignature,
} from "@tabler/icons-react";
import { BentoGridThirdDemo } from "@/components/BentoGridLanding";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import Link from "next/link";

const words = [
  { text: "Samostojno", className: "" },
  { text: "učenje", className: "" },
  { text: "programiranja,", className: "" },
  { text: "poenostaljeno", className: "text-blue" },
];

export default function Home() {
  const SkeletonOne = () => {
    const variants = {
      initial: {
        x: 0,
      },
      animate: {
        x: 10,
        rotate: 5,
        transition: {
          duration: 0.2,
        },
      },
    };
  };
  return (
    <div className="bg-noise dark:bg-black">
      <LandingNavbar />
      <div className="mt-8 p-8 flex flex-col relative" suppressHydrationWarning>
        <h1 className="text-center text-5xl md:text-7xl font-black">
          Samostojno učenje
          <br /> programiranja, <br />
          <span className="text-transparent bg-gradient-to-r from-sky-500 to-blue bg-clip-text">
            poenostavljeno
          </span>
        </h1>
        <p className="mt-6 text-center font-medium text-lg">
          Nov pristop do učenja programiranja. <br /> Preprosto in prilagojeno
          tvojemu trenutnemu nivoju znanja.
        </p>
        <div className="text-center mt-4">
          <div className="mt-12 mb-2 self-center flex gap-4 items-center justify-center">
            <Link href="/login">
              <Button
                className="rounded-full hover:opacity-75 transition-all ease-in-out duration-150"
                variant="landing"
                size={"xl"}
              >
                Začni učenje
              </Button>
            </Link>
            <Link href="#lastnosti">
              <Button
                className="rounded-full hover:opacity-75 transition-all ease-in-out duration-150"
                variant="outline"
                size={"xl"}
              >
                Oglej si lastnosti
              </Button>
            </Link>
          </div>
          <Label className="text-sm">
            Brezplačna doživljenska uporaba naših produktov
          </Label>
        </div>

        <MaskContainer
          revealSize={300}
          revealText={
            <p className="max-w-4xl mx-auto text-slate-800 text-center  text-4xl font-bold">
              Podvojite svoj užitek, podvojite svojo zabavo.
            </p>
          }
          className="h-[100px] my-20"
        >
          Podvojite svoj <span className="text-red-500">užitek</span>, podvojite
          svojo <span className="text-red-500">zabavo</span>.
        </MaskContainer>

        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-4xl lg:text-5xl font-bold text-center">
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

        <div className="my-16" id="lastnosti">
          <h3 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            Značilnosti in lastnosti
          </h3>
          <BentoGridThirdDemo />
        </div>

        <MaskContainer
          revealSize={300}
          revealText={
            <p className="max-w-4xl mx-auto text-slate-800 text-center  text-4xl font-bold">
              Ne počite pod pritiskom. Nadaljujte z učenjem.
            </p>
          }
          className="h-[100px]"
        >
          Ne počite pod <span className="text-red-500">pritiskom</span>.
          Nadaljujte z učenjem.
        </MaskContainer>
      </div>
      <div className="px-8">
        <Footer />
      </div>
    </div>
  );
}
