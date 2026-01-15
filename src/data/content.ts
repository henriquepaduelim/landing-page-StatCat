export const content = {
  brand: {
    name: "StatCat Sports",
    logoText: "StatCat Sports",
    logoMark: "SC",
    tagline:
      "Proudly Canadian development and communication platform for football programs.",
  },
  header: {
    openLabel: "Open navigation menu",
    closeLabel: "Close navigation menu",
    mobileTitle: "Navigation",
    primaryNavLabel: "Primary",
    mobileNavLabel: "Mobile navigation",
    mobileNavMenuLabel: "Mobile",
  },
  nav: [
    { label: "Features", href: "features" },
    { label: "How It Works", href: "how-it-works" },
    { label: "Use Cases", href: "use-cases" },
    { label: "Pricing", href: "pricing" },
    { label: "Testimonials", href: "testimonials" },
    { label: "FAQ", href: "faq" },
  ],
  hero: {
    trustLine: {
      primary: "Proudly Canadian",
      secondary: "The all-in-one platform for modern football programs.",
    },
    headline:
      "Give your club a branded app that proves progress.",
    subheadline:
      "StatCat brings development tracking, report cards, schedules, and family updates into one polished experience - branded for your club.",
    primaryCta: "Book a demo",
    secondaryCta: "See how it works",
    highlights: [
      "Your own branded club app",
      "Development tracking from sessions to seasons",
      "Professional report cards for families",
      "One hub for updates and approvals",
    ],
    preview: {
      label: "StatCat club app",
      tag: "App Preview",
      video: {
        src: "/media/profile.photo-1400.jpg",
        label: "Athlete report card photo",
      },
      cards: ["Development", "Report Cards", "Scheduling"],
    },
  },
  socialProof: {
    eyebrow: "Why StatCat",
    title: "Built for Canadian football programs",
    subtitle:
      "A professional interface between club, athlete, and family with a branded app that looks and feels like your club and structured development data.",
    metrics: [
      { label: "Your club, your brand", value: "Your own app" },
      { label: "Professional feedback", value: "Report cards" },
      { label: "Long-term tracking", value: "Sessions to seasons" },
      { label: "Local onboarding", value: "Canadian support" },
    ],
  },
  features: {
    eyebrow: "Features",
    title: "The development and communication stack for football programs",
    subtitle:
      "Run a branded app, track athlete progress, and keep families aligned with professional reporting.",
    highlight: {
      eyebrow: "Development tracking spotlight",
      title: "Turn evaluations into long-term development data",
      description:
        "Capture combine results, session ratings, and coach notes in one timeline, then share progress in professional report cards.",
      bullets: [
        "Track speed, agility, and technical metrics across seasons",
        "Compare athletes against their own baselines, not just peers",
        "Export charts and summaries for meetings and parent updates",
      ],
      video: {
        src: "/media/combineChart.webm",
        label: "Development tracking preview",
        caption: "Combine and evaluation tracking preview",
        ariaLabel: "Development tracking preview",
      },
    },
    items: [
      {
        title: "Athlete development tracking",
        description:
          "Capture every session, combine, and evaluation so progress tells a fuller story than the scoreboard.",
        icon: "timeline",
      },
      {
        title: "Report cards and evaluations",
        description:
          "Turn coaching notes into clear, shareable report cards for athletes and families.",
        icon: "assignment",
      },
      {
        title: "Communication hub",
        description:
          "Keep updates, approvals, and feedback in one place so conversations stay clean and fast.",
        icon: "forum",
      },
      {
        title: "Scheduling and events",
        description:
          "Run training, testing, and events from one calendar so everyone shows up ready.",
        icon: "event_available",
      },
      {
        title: "Your club's own app",
        description:
          "Your logo, colors, and name make the app feel unmistakably yours and more professional.",
        icon: "palette",
      },
      {
        title: "Digital presence and club website",
        description:
          "Launch and maintain a club website that matches your app's look and message.",
        icon: "language",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Process",
    title: "From launching your club's own app to visible progress",
    stepLabel: "Step",
    steps: [
      {
        title: "Set up your club and brand",
        description:
          "Launch your club's own app with your name, logo, and colors.",
        icon: "palette",
      },
      {
        title: "Add teams and athletes",
        description:
          "Invite staff, coaches, athletes, and families with role-based access.",
        icon: "group_add",
      },
      {
        title: "Track sessions and evaluations",
        description:
          "Log training, combines, and assessments in a consistent timeline.",
        icon: "timeline",
      },
      {
        title: "Share reports and updates",
        description:
          "Publish report cards and summaries that families can understand.",
        icon: "assignment_turned_in",
      },
      {
        title: "Strengthen digital presence",
        description:
          "Extend your brand with an optional club website aligned to the app.",
        icon: "public",
      },
    ],
  },
  useCases: {
    eyebrow: "Use cases",
    title: "Built for every stakeholder",
    items: [
      {
        title: "Club Directors",
        description:
          "Lead with a professional brand and a clear digital presence.",
        bullets: [
          "An app that looks and feels like your club",
          "Development records and report cards you can stand behind",
          "Website creation and maintenance to boost credibility",
        ],
        icon: "verified_user",
      },
      {
        title: "Coaches",
        description:
          "Spend more time developing athletes with structured feedback.",
        bullets: [
          "Track evaluations and combine data over time",
          "Publish report cards after sessions or seasons",
          "One schedule for training, testing, and events",
        ],
        icon: "sports",
      },
      {
        title: "Athletes and Parents",
        description:
          "Know what is happening and why, with transparent feedback.",
        bullets: [
          "Clear schedules and event updates",
          "Shared report cards that explain progress",
          "Single source of truth for communication",
        ],
        icon: "family_restroom",
      },
      {
        title: "Academies and Goalkeeping Programs",
        description:
          "Run specialized programs with measurable development and consistent branding.",
        bullets: [
          "Program-specific testing and evaluation templates",
          "A branded app experience for each academy or camp",
          "Professional web presence to attract new families",
        ],
        icon: "sports_football",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Simple pricing for clubs ready to have their own app",
    subtitle:
      "Your club's own app, athlete tracking, report cards, clear communication, and scheduling — pricing that scales as you grow.",
    subtitleNote:
      "Plans start around CAD $1 per athlete with volume discounts.",
    callout: "Your club's own app is included in every plan.",
    toggle: {
      monthly: "Monthly",
      annual: "Annual",
    },
    calculator: {
      label: "Calculator",
      heading: "Simple, predictable pricing for growing clubs",
      helper:
        "No hidden fees. Pay only for active athletes. Cancel anytime.",
      contractBadge: "Annual pricing",
      athleteCountLabel: "Athlete count",
      athleteInputLabel: "Athletes",
      athleteRangeLabel: "Athlete count",
      perAthleteLabelAnnual: "Per athlete / month (billed annually)",
      perAthleteLabelMonthly: "Per athlete / month (monthly plan)",
      perAthleteSupport:
        "Includes full platform access, performance tracking, and club branding.",
      perAthleteAnnualSuffix: "",
      estimatedTotalLabel: "Estimated annual investment",
      estimatedMonthlySuffix: " / month",
      estimatedAnnualSuffix: "",
      monthlyNote: "Monthly billing uses a flat per-athlete rate.",
      annualNote: "Pricing shown reflects an annual contract.",
      contactNote: "Over 500 athletes? Contact us to confirm the best option.",
      contactLabel: "Contact us",
      estimatedPerAthleteNoteTemplate:
        "That's about {rate} per athlete / month (annual contract).",
      billingLabel: "Billing cycle",
      billingAnnual: "Annual (best value)",
      billingMonthly: "Monthly",
      billingMonthlyTooltip:
        "Monthly pricing shown for comparison. Annual contracts unlock volume discounts.",
      tierLabelTemplate: "Volume pricing",
      tierStatusBase: "Standard",
      tierStatusDiscount: "Discounted",
      tierStatusCustom: "Custom",
      savingsLabelTemplate: "Volume discounts apply automatically as you grow.",
      savingsZeroLabel: "Volume discounts apply automatically as you grow.",
      tierRateNoteTemplate: "Volume discounts apply automatically as you grow.",
      annualTotalNoteTemplate: "Based on {count} athletes.",
      shareLabel: "Copy link",
      shareTooltip: "Share this estimate with your club.",
      shareCopied: "Link copied",
      breakdownTitle: "FIRST YEAR & RENEWAL",
      breakdownFirstYearLabel: "First-year setup & onboarding",
      breakdownFirstYearBody:
        "One-time setup based on your club size and needs. We define scope together during the demo.",
      breakdownYearTwoLabel: "Year 2+ estimate",
      breakdownNoteAnnual: "Includes one-time setup.",
      breakdownNoteMonthly: "Monthly plan shown as an annualized estimate.",
      setupTooltip:
        "Setup includes club-branded app configuration, onboarding, and launch support.",
      anchorLine:
        "Comparable tools often charge CAD $3-$6 per athlete/month.",
      riskReducerLine:
        "No long-term lock-in. We earn your renewal every year.",
    },
    setupFee: {
      eyebrow: "Setup & launch",
      label: "Customized Setup",
      amount: null,
      description: "We align the scope during the demo to fit your club’s needs.",
      bullets: [
        "Club-branded app setup",
        "Configuration and onboarding",
        "Launch support",
        "Ready for athletes and parents",
      ],
      note: "Contact Us to learn more.",
    },
    tiers: [
      { min: 1, max: 100, rate: 1.0 },
      { min: 101, max: 300, rate: 0.95 },
      { min: 301, max: 500, rate: 0.9 },
    ],
    minAthletes: 25,
    maxAthletes: 800,
    defaultAthletes: 120,
    monthlyRate: 1.2,
    contactThreshold: 500,
    volumeNote: "Volume discounts apply automatically as you grow.",
    disclaimer:
      "Final pricing may vary by club needs, onboarding scope, and optional website services.",
    addonsLabel: "Grow your club's visibility",
    addons: [
      "Professional club website — creation and ongoing maintenance (optional)",
      "Dedicated launch support — for multi-team or multi-club organizations",
      "Advanced reporting and exports — for clubs that want deeper insights",
      "Branding assistance — align app visuals with your club identity",
    ],
    idealFor: {
      title: "Ideal for",
      bullets: [
        "Clubs that want a professional experience for parents and athletes",
        "Academies focused on long-term athlete development",
        "Programs tired of spreadsheets and scattered messaging",
      ],
    },
    cta: {
      title: "Not sure what fits your club?",
      text: "We’ll help you choose the right setup based on your athlete count and goals.",
      primaryLabel: "Book a 15-min demo",
      secondaryLabel: "See if StatCat fits your club",
    },
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Trusted by program leaders",
    items: [
      {
        quote:
          "Our club's own app makes us look professional, and the development history keeps everyone aligned.",
        name: "Jordan Lee",
        role: "Club Operations Director",
        location: "Ontario",
      },
      {
        quote:
          "Report cards and scheduling in one place reduced messaging chaos for our families.",
        name: "Avery Chen",
        role: "Head Coach",
        location: "British Columbia",
      },
      {
        quote:
          "Parents appreciate clear progress summaries, and coaches value the evaluation timeline.",
        name: "Morgan Patel",
        role: "Program Administrator",
        location: "Alberta",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        question: "Do athletes and parents see our club branding?",
        answer:
          "Yes. The app is branded with your club name, logo, and colors so families see your club, not a generic platform.",
      },
      {
        question: "Is this our own app or a shared platform?",
        answer:
          "It's your club's own branded app with your name, logo, and colors, so families see your club, not a generic platform.",
      },
      {
        question: "Do you also build and maintain club websites?",
        answer:
          "Yes. We offer website creation and ongoing maintenance as an optional service aligned to your app branding.",
      },
      {
        question: "Who owns the data?",
        answer:
          "Your club owns its data. We provide secure access controls and export options for administrators.",
      },
      {
        question: "How fast can we get set up?",
        answer:
          "Most clubs are live within a few weeks depending on data readiness and onboarding scope.",
      },
    ],
  },
  cta: {
    eyebrow: "Demo",
    title: "Give your club its own app for development and communication",
    subtitle:
      "Book a demo to see how StatCat tracks athlete progress, streamlines communication, and supports your club's digital presence with an optional website.",
    highlights: [
      "Your club's own app, branded to your name and colors",
      "Report cards and development summaries built in",
      "Optional club website creation and maintenance",
      "Proudly Canadian support and onboarding",
    ],
    form: {
      nameLabel: "Full name",
      emailLabel: "Work email",
      submitLabel: "Book a demo",
    },
    validation: {
      nameRequired: "Please enter your full name.",
      emailInvalid: "Please enter a valid email address.",
    },
    consent: "By submitting, you agree to receive demo communications from StatCat.",
    toast: "Thanks for booking a demo. Our team will follow up shortly.",
  },
  footer: {
    line:
      "Athlete development tracking, report cards, scheduling, and clear communication for sports programs across Canada.",
    contactEmail: "hello@statcatsports.ca",
    linksHeading: "Links",
    contactHeading: "Contact",
    contactLabel: "Email",
    copyright: "All rights reserved.",
    copyrightTemplate: "(c) {year} {brand}. {rights}",
    proudBadge: "",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Contact", href: "#cta" },
    ],
  },
};
