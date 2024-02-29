export const steps = [
  {
    selector: '[data-tour="step-explore"]',
    content:
      "Uinstruktor je platforma namenjena samostojnemu učenju programiranja. Na začetni strani lahko vidite seznam različnih tečajev.",
    style: {
      color: "black",
    },
  },
  {
    selector: '[data-tour="step-explore-1"]',
    content:
      'Tečaj "C++ Osnove" - ta program je ustvarjen posebej za vse začetnike, ki želijo narediti svoje prve korake v navdihujočem svetu programiranja.',
    style: {
      color: "black",
    },
  },
  {
    selector: '[data-tour="step-explore-2"]',
    content:
      'Tečaj "C++ Srednji nivo" je zasnovan za tiste, ki želijo poglobljeno obvladati napredne koncepte v programiranju v jeziku C++.',
    style: {
      color: "black",
    },
  },
  {
    selector: '[data-tour="step-explore-3"]',
    content:
      'Tečaj "C++ Napredno" je ustvarjen za tiste, ki si resnično želijo preizkusiti svoje znanje na najvišji ravni.',
    style: {
      color: "black",
    },
  },
  {
    selector: '[data-tour="step-explore-4"]',
    content:
      'S klikom na gumb "Odpri novo okolje" odprete naše spletno okolje za programiranje, kjer lahko svoje ustvarjalne zamisli prenesete v kodo.',
    style: {
      color: "black",
    },
    action: () => {
      localStorage.setItem("exploreTour", "true");
    },
  },
];

export const courseSteps = [
  {
    selector: '[data-tour="step-course"]',
    content:
      "Tukaj si lahko ogledate vse osnovne informacije o trenutnem tečaju.",
    style: {
      color: "black",
    },
  },
  {
    selector: '[data-tour="step-course-2"]',
    content:
      "S klikom na ta gumb lahko nadaljujete z učenjem, tam kjer ste se zadnjič ustavili.",
    style: {
      color: "black",
    },
  },
  {
    selector: '[data-tour="step-course-3"]',
    content: "Tukaj pa je napredek, katerega ste dosegli v celotnem tečaju.",
    style: {
      color: "black",
    },
  },
  {
    selector: '[data-tour="step-course-4"]',
    content:
      "Trenutno poglavje predstavlja snov in lekcije na katerih ste se nazadnje ustavili.",
    style: {
      color: "black",
    },
  },
  {
    selector: '[data-tour="step-course-5"]',
    content:
      "V kazalu vsebbine pa si lahko ogledate vsa poglavja in lekcije, ki vas čakajo v nadaljevanju tečaja.",
    style: {
      color: "black",
    },
    action: () => {
      localStorage.setItem("courseTour", "true");
    },
  },
];
