export const siteConfig = {
  name: "Haul Time",
  title: "Haul Time | Fast, premium junk removal in the DMV",
  description:
    "Junk removal that feels easy. Get a quote fast, text photos for a rough estimate, or chat with Jade to qualify your job and lock in the next step.",
  phoneDisplay: process.env.NEXT_PUBLIC_SITE_PHONE_DISPLAY || "(888) 575-9390",
  phoneHref: process.env.NEXT_PUBLIC_SITE_PHONE_HREF || "tel:8885759390",
  serviceAreas:
    process.env.NEXT_PUBLIC_SERVICE_AREAS ||
    "Washington, DC, Maryland, Northern Virginia",
  textPhotoCta:
    process.env.NEXT_PUBLIC_TEXT_PHOTO_CTA || "Text photos for a faster estimate",
  chatGreeting:
    "Hey, I’m Jade. I can help with quotes, service questions, timing, and getting your job in front of the team fast.",
};

export const services = [
  {
    title: "Residential junk removal",
    description:
      "Furniture, garage cleanouts, basement clear-outs, appliance haul-away, and the stuff that’s been taking up space too long.",
  },
  {
    title: "Commercial cleanouts",
    description:
      "Office furniture, retail fixtures, storage cleanouts, and end-of-lease junk removal without the chaos.",
  },
  {
    title: "Property & estate cleanouts",
    description:
      "Sensitive, time-critical cleanouts handled with care and a clear next-step process.",
  },
  {
    title: "Yard debris & bulky pickups",
    description:
      "Brush, fencing, outdoor clutter, renovation leftovers, and curbside or on-site bulky removals.",
  },
];

export const faqs = [
  {
    question: "How fast can I get a quote?",
    answer:
      "Most leads can get a same-day response. The fastest path is sending photos plus a short description of what needs to go.",
  },
  {
    question: "Can Jade give final pricing?",
    answer:
      "Jade can qualify the job, collect the right details, and help the team move quickly. Final pricing stays with approved Haul Time rules and owner review when needed.",
  },
  {
    question: "What should I send for an accurate estimate?",
    answer:
      "Photos, location, what items need to go, rough amount, access details like stairs or gates, and when you want it done.",
  },
  {
    question: "Do you handle same-day jobs?",
    answer:
      "If availability is open, Haul Time will try. Jade will collect the timing and get the request in front of the team fast.",
  },
];

export const testimonials = [
  {
    quote:
      "They made a stressful cleanout feel stupid easy. Fast response, clear communication, and they left the place cleaner than I expected.",
    author: "DMV homeowner",
  },
  {
    quote:
      "We needed an office cleared out quickly and they handled it without drama. The process felt organized from the first message.",
    author: "Commercial client",
  },
  {
    quote:
      "The speed and professionalism stood out. No runaround, just a fast quote and a crew that showed up ready.",
    author: "Repeat customer",
  },
];
