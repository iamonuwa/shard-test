import { FC } from "react";
import CarIllustration from "./Car";
import Container from "./Container";
import { Navbar } from "./Navbar";

type HeroProps = {
  title: string;
};

export const Hero: FC<HeroProps> = ({ title }) => {
  return (
    <header className="relative overflow-hidden bg-slate-50 pt-6">
      <div className="absolute inset-0 shadow-[inset_0_-1px_0_rgba(22,27,59,0.04)]" />
      <Container className="relative">
        <Navbar />
        <div className="flex justify-center text-center lg:pt-5 lg:pb-7 lg:text-left">
          <div className="flex max-w-[37rem] flex-col py-16 lg:pt-12 lg:pb-11">
            <h1 className="mt-6 text-[1.75rem] font-extrabold leading-9 tracking-tight text-slate-900 md:text-4xl">
              {title}
            </h1>
            <p>Includes tax MOT and up-to-date DVLA vehicle registration information.</p>
          </div>
          <div className="hidden lg:flex lg:flex-auto lg:justify-center">
            <CarIllustration width={320} height={320} />
          </div>
        </div>
      </Container>
    </header>
  );
};
