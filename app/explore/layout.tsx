"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/ui/Container";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";

import BannerBlue from "@/assets/Banner Blue.svg";
import BannerPurple from "@/assets/Banner Purple.svg";
import BannerYellow from "@/assets/Banner Yellow.svg";
import { useEffect, useState } from "react";
import Link from "next/link";

const ExploreLayout = ({ children }: { children: React.ReactNode }) => {
  const [randNum, setRandNum] = useState(0);

  const auth = useAuth();
  const images = [BannerBlue, BannerPurple, BannerYellow];

  useEffect(() => {
    setRandNum(Math.floor(Math.random() * 3));
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Container>
        <Navbar />
        <Link href="/tutorials">
          <Image
            className="rounded-md my-8 hover:opacity-90 transition-all ease-in-out duration-100"
            src={images[randNum]}
            alt="banner"
          />
        </Link>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default ExploreLayout;
