import { Button } from "@/components/ui/button";
import Link from "next/link";

const InDevelopmentPage = () => {
  return (
    <div className="w-full h-screen bg-noise flex justify-center items-center">
      <div className="text-center flex flex-col gap-8">
        <h1 className="font-bold text-3xl">
          Opravičujemo se za nevšečnosti!
          <br /> Ta stran je še v razvoju.
        </h1>
        <Link href="/explore">
          <Button variant="link">Pojdi nazaj</Button>
        </Link>
      </div>
    </div>
  );
};

export default InDevelopmentPage;
