export const siteConfig = {
  name: "Haul Time",
  title: "Haul Time | Junk Removal for Homes, Offices, and Cleanouts Across the DMV",
  description:
    "Junk removal for homeowners, landlords, property managers, and businesses across the DMV. Get a fast quote, send photos for a cleaner estimate, or chat with Jade to get the job moving.",
  phoneDisplay: process.env.NEXT_PUBLIC_SITE_PHONE_DISPLAY || "(888) 575-9390",
  phoneHref: process.env.NEXT_PUBLIC_SITE_PHONE_HREF || "tel:8885759390",
  serviceAreas:
    process.env.NEXT_PUBLIC_SERVICE_AREAS ||
    "Gaithersburg, Rockville, Bethesda, Silver Spring, Washington, DC, Arlington, and surrounding DMV areas",
  textPhotoCta:
    process.env.NEXT_PUBLIC_TEXT_PHOTO_CTA || "Send photos for a faster, cleaner estimate",
  chatGreeting:
    "Hey, I’m Jade. Tell me what needs to go, where the job is, and how fast you need it handled. I’ll help you get the right next step in front of the Haul Time team.",
};

export const services = [
  {
    title: "Residential removal",
    description:
      "Furniture, garage clutter, basement junk, curbside piles, and whole-room cleanouts handled without turning your weekend into a hauling project.",
  },
  {
    title: "Commercial cleanouts",
    description:
      "Office junk, retail clear-outs, storage cleanups, and business moves that need to happen quickly and without a sloppy finish.",
  },
  {
    title: "Appliance removal",
    description:
      "Refrigerators, washers, dryers, freezers, and other awkward bulky items removed safely and efficiently.",
  },
  {
    title: "Property cleanouts",
    description:
      "Estate situations, turnovers, move-outs, renovation debris, and time-sensitive cleanouts where speed and reliability matter.",
  },
];

export const faqs = [
  {
    question: "How fast can I get a quote?",
    answer:
      "Usually the fastest path is photos plus a short description of what needs to go, the ZIP code, and how soon you need it handled.",
  },
  {
    question: "Do you handle same-day jobs?",
    answer:
      "When the schedule allows, yes. Jade can collect the details quickly so the team can tell you the cleanest next step.",
  },
  {
    question: "What should I send for a cleaner estimate?",
    answer:
      "Photos, ZIP code, what needs to be removed, rough amount, and any access details like stairs, elevators, gates, or long carry distance.",
  },
  {
    question: "Who is this best for?",
    answer:
      "Homeowners, landlords, property managers, real-estate turnover situations, office cleanouts, and anyone who wants the job handled without the usual hauling chaos.",
  },
];

export const testimonials = [
  {
    quote:
      "Absolutely incredible service. The team showed up on time, worked fast, and left my garage spotless. I couldn’t believe how much space I got back.",
    author: "Marcus Johnson, Gaithersburg",
  },
  {
    quote:
      "We used Haul Time for an office cleanout and they handled everything, desks, electronics, the works, with zero drama. Professional from start to finish.",
    author: "Sarah Rodriguez, Bethesda",
  },
  {
    quote:
      "The pricing felt fair, the crew was friendly, and they even cleaned up after loading the truck. You can feel the difference when people actually care.",
    author: "David Washington, Silver Spring",
  },
];
