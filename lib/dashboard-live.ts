import { getDashboardStateSnapshot } from "@/lib/dashboard-state";

type WeatherApiResponse = {
  current?: {
    temperature_2m?: number;
    apparent_temperature?: number;
    weather_code?: number;
    wind_speed_10m?: number;
  };
  hourly?: {
    time?: string[];
    precipitation_probability?: number[];
    precipitation?: number[];
  };
  daily?: {
    sunrise?: string[];
    sunset?: string[];
  };
};

type RouteApiResponse = {
  routes?: Array<{
    duration?: number;
    distance?: number;
  }>;
};

type ServiceZone = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  note: string;
};

type DashboardSection = "general" | "pulse" | "field" | "playbook" | "profit" | "growth" | "crm" | "tasks" | string;

export type DashboardOverview = {
  refreshedAt: string;
  refreshedLabel: string;
  welcomeLabel: string;
  welcomeTitle: string;
  welcomeNote: string;
  heroTitle: string;
  heroCopy: string;
  quoteOfDay: {
    text: string;
    author: string;
  };
  vitals: Array<{ label: string; value: string; note: string }>;
  operatingHeadline: string;
  operatingNote: string;
  weather: {
    condition: string;
    temperature: string;
    feelsLike: string;
    wind: string;
    rainWindow: string;
    daylight: string;
    note: string;
  };
  routes: Array<{ name: string; minutes: string; note: string; tone: "clean" | "watch" | "buffer" }>;
  priorities: Array<{ title: string; body: string; action: string }>;
  crmModules: Array<{ label: string; title: string; body: string }>;
  growthQueue: string[];
  jadeBrief: string[];
};

const HQ = {
  name: "Gaithersburg base",
  lat: 39.1434,
  lon: -77.2014,
};

const SERVICE_ZONES: ServiceZone[] = [
  {
    id: "bethesda",
    name: "Bethesda",
    lat: 38.9847,
    lon: -77.0947,
    note: "Strong residential cleanout lane with good ticket quality.",
  },
  {
    id: "silver-spring",
    name: "Silver Spring",
    lat: 38.9907,
    lon: -77.0261,
    note: "Dense volume zone for repeat residential and landlord turns.",
  },
  {
    id: "arlington",
    name: "Arlington",
    lat: 38.8816,
    lon: -77.091,
    note: "Good money when jobs are paired instead of quoted as one-offs.",
  },
  {
    id: "dc",
    name: "Washington, DC",
    lat: 38.9072,
    lon: -77.0369,
    note: "Traffic-heavy, but worth it for office and property-manager work.",
  },
];

const WEATHER_CODE_LABEL: Record<number, string> = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Frost fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  56: "Freezing drizzle",
  57: "Heavy freezing drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Rain showers",
  81: "Heavy showers",
  82: "Violent showers",
  85: "Snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Storm + hail",
  99: "Severe storm",
};

const WELCOME_MESSAGES = [
  {
    label: "Opening line",
    title: "Phones hot, trucks ready, margin first.",
    note: "Clear the easy money before the day gets noisy.",
  },
  {
    label: "Opening line",
    title: "Fast callbacks beat pretty dashboards.",
    note: "This board only matters if it helps move jobs.",
  },
  {
    label: "Opening line",
    title: "A clean route is a hidden raise.",
    note: "Bundle the right stops and the same day pays better.",
  },
  {
    label: "Opening line",
    title: "Photos first, guessing never.",
    note: "Bulky-item quotes get cleaner when the team can actually see the load.",
  },
  {
    label: "Opening line",
    title: "Leave it clean, earn the next call.",
    note: "That is how reviews, referrals, and repeat work stack up.",
  },
  {
    label: "Opening line",
    title: "Run the phones, protect the route, finish strong.",
    note: "Lead speed and travel sanity are the whole game on busy days.",
  },
  {
    label: "Opening line",
    title: "This board should feel like a dispatcher with taste.",
    note: "Every card should help Antoine and Anthony make the next move faster.",
  },
  {
    label: "Opening line",
    title: "A premium junk job feels effortless to the customer.",
    note: "Reliability sells harder than hype in this business.",
  },
];

const QUOTES_OF_DAY = [
  {
    text: "Do not wait for the perfect plan. Start moving, then improve while in motion.",
    author: "Unknown operator rule",
  },
  {
    text: "Well done is better than well said.",
    author: "Benjamin Franklin",
  },
  {
    text: "Amateurs sit and wait for inspiration. The rest of us just get up and go to work.",
    author: "Stephen King",
  },
  {
    text: "Commit your work to the Lord, and your plans will be established.",
    author: "Proverbs 16:3",
  },
  {
    text: "Success is never owned. It is rented, and the rent is due every day.",
    author: "Rory Vaden",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Faithful with little, faithful with much. That is how real builders compound.",
    author: "Operator principle",
  },
  {
    text: "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln",
  },
  {
    text: "A good reputation is built load by load, call by call, day by day.",
    author: "Field note",
  },
  {
    text: "The diligent hand will rule.",
    author: "Proverbs 12:24",
  },
];

function formatEt(date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    ...options,
  }).format(date);
}

function formatHourLabel(input: string) {
  return formatEt(new Date(input), {
    hour: "numeric",
    minute: "2-digit",
  });
}

function minutesUntil(input: string, now: Date) {
  return Math.max(0, Math.round((new Date(input).getTime() - now.getTime()) / 60_000));
}

function getDayOfYear(date: Date) {
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

function getWelcomePayload(now: Date) {
  const hourEt = Number(formatEt(now, { hour: "numeric", hour12: false }));
  const welcomeIndex = (getDayOfYear(now) + Math.floor(hourEt / 4)) % WELCOME_MESSAGES.length;
  const quoteIndex = getDayOfYear(now) % QUOTES_OF_DAY.length;

  return {
    currentHourEt: hourEt,
    welcomeMessage: WELCOME_MESSAGES[welcomeIndex]!,
    quoteOfDay: QUOTES_OF_DAY[quoteIndex]!,
  };
}

async function fetchJson<T>(url: string) {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      accept: "application/json",
      "user-agent": "HaulTimeDashboard/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function getWeatherData() {
  const params = new URLSearchParams({
    latitude: String(HQ.lat),
    longitude: String(HQ.lon),
    current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m",
    hourly: "precipitation_probability,precipitation",
    daily: "sunrise,sunset",
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    precipitation_unit: "inch",
    timezone: "America/New_York",
    forecast_days: "1",
  });

  return fetchJson<WeatherApiResponse>(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
}

async function getRouteDurations() {
  return Promise.all(
    SERVICE_ZONES.map(async (zone) => {
      try {
        const data = await fetchJson<RouteApiResponse>(
          `https://router.project-osrm.org/route/v1/driving/${HQ.lon},${HQ.lat};${zone.lon},${zone.lat}?overview=false`,
        );

        const durationMinutes = Math.round((data.routes?.[0]?.duration || 0) / 60);

        return {
          name: zone.name,
          note: zone.note,
          minutes: durationMinutes,
        };
      } catch {
        return {
          name: zone.name,
          note: zone.note,
          minutes: 0,
        };
      }
    }),
  );
}

function buildFallbackOverview(now: Date): DashboardOverview {
  const { welcomeMessage, quoteOfDay } = getWelcomePayload(now);

  return {
    refreshedAt: now.toISOString(),
    refreshedLabel: `${formatEt(now, { hour: "numeric", minute: "2-digit" })} ET`,
    welcomeLabel: welcomeMessage.label,
    welcomeTitle: welcomeMessage.title,
    welcomeNote: welcomeMessage.note,
    heroTitle: "Live signals for callbacks, routes, daylight, and the next money move.",
    heroCopy: "If a feed breaks, the board should tell the truth and still keep the brothers moving.",
    quoteOfDay,
    vitals: [
      { label: "Field read", value: "Feed retrying", note: "Weather feed unavailable right now" },
      { label: "Best lane", value: "Feed retrying", note: "Route feed unavailable right now" },
      { label: "Daylight", value: "Check locally", note: "Sunlight feed unavailable right now" },
      { label: "Quote rule", value: "Photo-first", note: "Bulky-item and cleanout leads should not be quoted blind." },
    ],
    operatingHeadline: "Live data is down for the moment, but callback speed and route discipline still win the day.",
    operatingNote: "No fake certainty. Use the board honestly and keep the phones moving.",
    weather: {
      condition: "Feed retrying",
      temperature: "--",
      feelsLike: "--",
      wind: "--",
      rainWindow: "Unavailable",
      daylight: "Unavailable",
      note: "Use local judgment, then refresh again later.",
    },
    routes: SERVICE_ZONES.map((zone) => ({
      name: zone.name,
      minutes: "--",
      note: zone.note,
      tone: "watch" as const,
    })),
    priorities: [
      {
        title: "Hit hot leads first",
        body: "Same-day callbacks still outrank almost everything else.",
        action: "Call the hottest leads before the admin stuff gets loud.",
      },
      {
        title: "Protect route margin",
        body: "Virginia and DC jobs still punish sloppy dispatching.",
        action: "Pair far jobs or price them like far jobs.",
      },
      {
        title: "Reviews need a system",
        body: "The business should not rely on memory to ask for proof after a clean job.",
        action: "Have Jade surface review asks automatically.",
      },
    ],
    crmModules: [
      {
        label: "Lead inbox",
        title: "Every hot lead should feel one swipe away from a callback.",
        body: "Photo status, urgency, ZIP code, carry-distance risk, and next step should all be visible fast.",
      },
      {
        label: "Quote workflow",
        title: "Turn fuzzy asks into quoteable jobs quickly.",
        body: "Photos, rough volume, access notes, urgency, then owner call. No mushy back-and-forth loops.",
      },
      {
        label: "Review engine",
        title: "Five-star proof should be a system.",
        body: "After every clean job, Jade should know whether to ask, what to send, and how to respond when a review lands.",
      },
      {
        label: "Local SEO",
        title: "Field questions should become search assets.",
        body: "Hot tubs, estate cleanouts, office clear-outs, and same-day asks should feed pages, FAQs, and GBP posts.",
      },
    ],
    growthQueue: [
      "Turn hot tub, mattress, and estate-cleanout questions into FAQs and GBP posts.",
      "Track realtor and property-manager work as its own lane. Those relationships compound.",
      "Collect before-and-after proof from every clean turnover. That sells harder than another headline.",
      "Use review replies to reinforce on-time arrival, insured handling, and a clean finish.",
    ],
    jadeBrief: [
      "Jade should answer like a sharp dispatcher with taste.",
      "In dashboard mode, Jade should recommend next actions, flag risk, and draft callbacks or review asks.",
      "In public website mode, Jade stays sandboxed and honest.",
    ],
  };
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const now = new Date();
  const { currentHourEt, welcomeMessage, quoteOfDay } = getWelcomePayload(now);

  try {
    const [weatherData, routeData, snapshot] = await Promise.all([
      getWeatherData(),
      getRouteDurations(),
      getDashboardStateSnapshot(),
    ]);

    const current = weatherData.current || {};
    const hourlyTimes = weatherData.hourly?.time || [];
    const rainProbabilities = weatherData.hourly?.precipitation_probability || [];
    const precipitation = weatherData.hourly?.precipitation || [];
    const sunset = weatherData.daily?.sunset?.[0];
    const sunrise = weatherData.daily?.sunrise?.[0];

    const nextRainIndex = hourlyTimes.findIndex((time, index) => {
      const pointTime = new Date(time);
      return pointTime.getTime() >= now.getTime() && ((rainProbabilities[index] || 0) >= 35 || (precipitation[index] || 0) >= 0.02);
    });

    const nextRainLabel = nextRainIndex >= 0 ? formatHourLabel(hourlyTimes[nextRainIndex]!) : "No rain concern";
    const daylightMinutes = sunset ? minutesUntil(sunset, now) : 0;
    const daylightLabel = daylightMinutes > 0 ? `${Math.floor(daylightMinutes / 60)}h ${daylightMinutes % 60}m left` : "Daylight wrapping";

    const routeCards = routeData
      .filter((route) => route.minutes > 0)
      .sort((a, b) => a.minutes - b.minutes)
      .map((route) => ({
        name: route.name,
        minutes: `${route.minutes} min`,
        note: route.note,
        tone: route.minutes <= 30 ? ("clean" as const) : route.minutes <= 50 ? ("watch" as const) : ("buffer" as const),
      }));

    const cleanestRoute = routeCards[0];
    const toughestRoute = routeCards[routeCards.length - 1];
    const weatherCondition = WEATHER_CODE_LABEL[current.weather_code ?? 0] || "Field conditions normal";
    const isMorning = currentHourEt < 12;
    const rainSoon = nextRainIndex >= 0 && minutesUntil(hourlyTimes[nextRainIndex]!, now) <= 240;
    const breezy = (current.wind_speed_10m || 0) >= 16;
    const callbackPressure = snapshot.leadSummary.needingCallback;
    const criticalTasks = snapshot.taskSummary.critical;
    const overdueTasks = snapshot.taskSummary.overdue;
    const topTask = snapshot.tasks.find((task) => task.status !== "done");

    const priorities = [
      {
        title:
          callbackPressure > 0
            ? `Hit ${callbackPressure} live callback${callbackPressure === 1 ? "" : "s"} before the board sprawls`
            : isMorning
              ? "Hit same-day callbacks before lunch"
              : "Protect the close before the evening drop-off",
        body: isMorning
          ? "This is the cleanest window to convert hot same-day asks while the board still has room."
          : "Anything still warm now needs photos, a real follow-up, and a booked next step before tonight.",
        action: "Call hot leads first. Photo-first estimates second. Nurture later.",
      },
      {
        title: rainSoon ? `Move outdoor-heavy jobs ahead of ${nextRainLabel}` : "Stack crews by margin, not habit",
        body: rainSoon
          ? "Weather is about to make easy jobs harder. Pull curbside, garage, and yard-heavy work forward."
          : "Use the clean weather window for the quickest, easiest-to-stage jobs first.",
        action: rainSoon ? "Text customers now and tighten arrival windows." : "Bundle nearby stops before crossing into DC or Arlington.",
      },
      {
        title:
          criticalTasks > 0
            ? `${criticalTasks} critical task${criticalTasks === 1 ? " is" : "s are"} still sitting open`
            : cleanestRoute
              ? `${cleanestRoute.name} is the cleanest money lane right now`
              : "Use route time as a pricing filter",
        body: cleanestRoute
          ? `${cleanestRoute.name} is the easiest run from ${HQ.name}. Keep that lane warm with photo-qualified jobs.`
          : "When travel time spikes, single small jobs turn into margin leaks unless you bundle them.",
        action:
          topTask?.title
            ? `Current top shared task: ${topTask.title}.`
            : toughestRoute
              ? `Put extra buffer on ${toughestRoute.name} jobs and try to pair them.`
              : "Do not quote far one-offs like close-in work.",
      },
    ];

    const operatingHeadline = rainSoon
      ? `Rain pushes in around ${nextRainLabel}. Pull outdoor work forward.`
      : `${weatherCondition}. Field conditions are workable, so callback speed and route grouping win.`;

    const baseOperatingNote = breezy
      ? "Wind matters today. Secure debris, tarps, and awkward loads with more discipline."
      : "Nothing fancy here. Run the phones, protect the route, and stay honest on quote fit.";

    const operatingNote = `${baseOperatingNote}${callbackPressure > 0 ? ` ${callbackPressure} callback${callbackPressure === 1 ? " is" : "s are"} still open.` : ""}${overdueTasks > 0 ? ` ${overdueTasks} task${overdueTasks === 1 ? " is" : "s are"} overdue.` : ""}`.trim();

    return {
      refreshedAt: now.toISOString(),
      refreshedLabel: `${formatEt(now, { hour: "numeric", minute: "2-digit" })} ET`,
      welcomeLabel: welcomeMessage.label,
      welcomeTitle: welcomeMessage.title,
      welcomeNote:
        callbackPressure > 0
          ? `${welcomeMessage.note} ${callbackPressure} callback${callbackPressure === 1 ? " is" : "s are"} already sitting in the CRM.`
          : topTask?.title
            ? `${welcomeMessage.note} First shared task waiting: ${topTask.title}.`
            : welcomeMessage.note,
      heroTitle: "Live signals for callbacks, routes, daylight, the CRM, and the shared task board.",
      heroCopy: "Built for Antoine and Anthony. Fast reads, honest live data, real lead pressure, and a board Jade can actually work from.",
      quoteOfDay,
      vitals: [
        {
          label: "Field read",
          value: `${weatherCondition}, ${Math.round(current.temperature_2m || 0)}°`,
          note: rainSoon ? `Rain risk starts around ${nextRainLabel}` : "No meaningful rain threat in the next few hours",
        },
        {
          label: "Best lane",
          value: cleanestRoute ? `${cleanestRoute.name} ${cleanestRoute.minutes}` : "Route feed loading",
          note: cleanestRoute ? cleanestRoute.note : "Travel-time data is unavailable right now",
        },
        {
          label: "CRM pressure",
          value: callbackPressure ? `${callbackPressure} live` : "Clear",
          note: callbackPressure ? "Leads are waiting on a callback or quote follow-through." : "No callback pile right now.",
        },
        {
          label: "Task board",
          value: snapshot.taskSummary.totalOpen ? `${snapshot.taskSummary.totalOpen} open` : "Clear",
          note: overdueTasks > 0 ? `${overdueTasks} overdue task${overdueTasks === 1 ? "" : "s"} need a decision.` : topTask?.title || "No shared board pressure yet.",
        },
        {
          label: "Daylight",
          value: daylightLabel,
          note: sunrise ? `Started at ${formatHourLabel(sunrise)}` : "Sunrise feed unavailable",
        },
        {
          label: "Quote rule",
          value: "Photo-first",
          note: "Bulky-item and cleanout leads should never be quoted blind when route time is rising.",
        },
      ],
      operatingHeadline,
      operatingNote,
      weather: {
        condition: weatherCondition,
        temperature: `${Math.round(current.temperature_2m || 0)}°F`,
        feelsLike: `${Math.round(current.apparent_temperature || 0)}°F`,
        wind: `${Math.round(current.wind_speed_10m || 0)} mph`,
        rainWindow: nextRainLabel,
        daylight: daylightLabel,
        note: rainSoon
          ? "Weather is a real variable today. Pull outdoor jobs forward and keep callback windows tighter."
          : "This is a workable field day. Prioritize speed-to-lead and efficient crew stacking.",
      },
      routes: routeCards,
      priorities,
      crmModules: [
        {
          label: "Lead inbox",
          title: "Every hot lead should feel one swipe away from a callback.",
          body: `${snapshot.leadSummary.total || 0} lead${snapshot.leadSummary.total === 1 ? "" : "s"} captured so far. Photo status, urgency, ZIP code, carry-distance risk, and next step should all be visible fast.`,
        },
        {
          label: "Quote workflow",
          title: "Turn fuzzy asks into quoteable jobs quickly.",
          body: "Photos, rough volume, access notes, urgency, then owner call. No mushy back-and-forth loops.",
        },
        {
          label: "Shared board",
          title: "The day should be rankable, draggable, and brutally clear.",
          body: topTask?.title ? `Current top task: ${topTask.title}. Jade should see it and factor it into the opening brief.` : "No top task yet. Load the board with the real work the business is juggling.",
        },
        {
          label: "Local SEO",
          title: "Field questions should become search assets.",
          body: "Hot tubs, estate cleanouts, office clear-outs, and same-day asks should feed pages, FAQs, and GBP posts.",
        },
      ],
      growthQueue: [
        "Turn hot tub, mattress, and estate-cleanout questions into FAQs and GBP posts.",
        "Track realtor and property-manager work as its own lane. Those relationships compound.",
        "Collect before-and-after proof from every clean turnover. That sells harder than another headline.",
        "Use review replies to reinforce on-time arrival, insured handling, and a clean finish.",
      ],
      jadeBrief: [
        "Jade should answer like a sharp dispatcher with taste.",
        `In dashboard mode, Jade should recommend next actions, flag route or weather risk, and work from the real CRM plus the shared task board.${topTask?.title ? ` Top board item right now: ${topTask.title}.` : ""}`,
        "In public website mode, Jade stays sandboxed: no final pricing promises, no fake availability, no prompt leakage.",
      ],
    };
  } catch {
    return buildFallbackOverview(now);
  }
}

export async function buildDashboardAssistantReply(question: string, section: DashboardSection = "general") {
  const [overview, snapshot] = await Promise.all([getDashboardOverview(), getDashboardStateSnapshot()]);
  const lower = question.toLowerCase();
  const firstRoute = overview.routes[0];
  const secondRoute = overview.routes[1];
  const hottestLead = snapshot.leads.find((lead) => lead.status === "hot") || snapshot.leads[0];
  const topTask = snapshot.tasks.find((task) => task.status !== "done");

  if (section === "pulse") {
    return `${overview.welcomeTitle} ${overview.operatingHeadline} Best immediate move: ${overview.priorities[0]?.action}`;
  }

  if (section === "field") {
    return `${overview.weather.note} Best close-in lane right now is ${firstRoute?.name || "the nearest Maryland zone"}${firstRoute?.minutes ? ` at about ${firstRoute.minutes}` : ""}. ${secondRoute ? `${secondRoute.name} sits behind it.` : ""} Protect margin before you chase geography.`;
  }

  if (section === "playbook") {
    return `${overview.priorities[0]?.title}. ${overview.priorities[0]?.body} Then: ${overview.priorities[1]?.action}`;
  }

  if (section === "profit") {
    return `${overview.crmModules[0]?.title} ${overview.crmModules[1]?.title} If the dashboard does not speed callbacks and tighten quote fit, it is decoration.`;
  }

  if (section === "crm") {
    return `${snapshot.leadSummary.needingCallback} lead${snapshot.leadSummary.needingCallback === 1 ? " needs" : "s need"} a live callback. ${hottestLead ? `Most urgent visible lead: ${hottestLead.name || hottestLead.phone || hottestLead.serviceType || "website lead"} in ${hottestLead.zipCode || "ZIP pending"}.` : "The CRM is still quiet, so keep the capture flow ready."}`;
  }

  if (section === "tasks") {
    return `${snapshot.taskSummary.totalOpen} open shared task${snapshot.taskSummary.totalOpen === 1 ? "" : "s"}, ${snapshot.taskSummary.overdue} overdue. ${topTask ? `Top board item right now: ${topTask.title}.` : "The board is clear enough to load the next strategic move cleanly."}`;
  }

  if (section === "growth") {
    return `${overview.growthQueue[0]} ${overview.growthQueue[1]} That is how the board turns field friction into more calls and better proof.`;
  }

  if (lower.includes("priority") || lower.includes("first") || lower.includes("focus")) {
    return `${overview.priorities[0]?.title}. ${overview.priorities[0]?.body} ${overview.priorities[0]?.action}`;
  }

  if (lower.includes("same day") || lower.includes("today") || lower.includes("schedule")) {
    return `${overview.weather.note} Best close-in lane right now is ${firstRoute?.name || "the nearest Maryland zone"}${firstRoute?.minutes ? ` at about ${firstRoute.minutes}` : ""}. If you take a far job, pair it with a second stop.`;
  }

  if (lower.includes("route") || lower.includes("drive") || lower.includes("traffic")) {
    return `Closest money lane right now is ${firstRoute?.name || "not available"}${firstRoute?.minutes ? ` at roughly ${firstRoute.minutes}` : ""}. ${secondRoute ? `${secondRoute.name} is next.` : ""} Long-drive jobs should be bundled or priced like long-drive jobs.`;
  }

  if (lower.includes("review") || lower.includes("seo") || lower.includes("google")) {
    return `${overview.growthQueue[0]} ${overview.growthQueue[1]} That is how the dashboard should turn field friction into reputation and search wins.`;
  }

  if (lower.includes("crm") || lower.includes("lead") || lower.includes("callback")) {
    return `${snapshot.leadSummary.needingCallback} lead${snapshot.leadSummary.needingCallback === 1 ? " is" : "s are"} still waiting on a callback. ${hottestLead ? `First one to touch: ${hottestLead.name || hottestLead.phone || hottestLead.serviceType || "website lead"}.` : "Once new leads land, work them from hottest to coldest."}`;
  }

  if (lower.includes("task") || lower.includes("todo") || lower.includes("board")) {
    return `${snapshot.taskSummary.totalOpen} open task${snapshot.taskSummary.totalOpen === 1 ? "" : "s"}, ${snapshot.taskSummary.overdue} overdue, ${snapshot.taskSummary.critical} critical. ${topTask ? `Move ${topTask.title} first unless a hotter lead lands.` : "Board is light enough to add the next growth move cleanly."}`;
  }

  return `${overview.operatingHeadline} ${overview.operatingNote} Best immediate move: ${overview.priorities[0]?.action}`;
}
