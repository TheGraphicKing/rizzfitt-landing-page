"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Slider from "@radix-ui/react-slider";
import {
  ArrowDown,
  BadgeCheck,
  Check,
  ChevronRight,
  Clock3,
  Coffee,
  CreditCard,
  MapPin,
  MessageCircle,
  PartyPopper,
  Share2,
  Sparkles,
  Trophy,
  Users,
  Utensils,
  Waves,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { type InputHTMLAttributes, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RazorpayWindow = Window & {
  Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
};

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const morningLoop = [
  {
    time: "7:00 AM",
    title: "Get your alias",
    copy: "A host gives you a name, a pod, and your first hello.",
    icon: MessageCircle,
  },
  {
    time: "7:15 - 9:00 AM",
    title: "Rotate courts",
    copy: "Short games. New teammates. Low-pressure rallies.",
    icon: Trophy,
  },
  {
    time: "9:00 AM onward",
    title: "Breakfast buffet",
    copy: "Granola cups, chia pudding, pancakes, smoothies, and bowl choices.",
    icon: Coffee,
  },
];

const differenceCards = [
  ["Curated pods", "People you are likely to enjoy.", Users],
  ["Beginner-safe", "The game is just the icebreaker.", BadgeCheck],
  ["Prompt cards", "Easy first conversations.", MessageCircle],
  ["Breakfast buffet", "Choose your post-game fuel.", Utensils],
  ["Monthly ritual", "A recurring social wellness circle.", Clock3],
  ["Bangalore mix", "Creators, founders, runners, friends.", MapPin],
] as const;

const playCards = ["Court pods", "Rally quests", "Breakfast circle", "Group chat unlock", "Next-month invite"];

const breakfastOptions = ["Granola cups", "Chia pudding", "Pancakes", "Fresh smoothies", "Smoothie bowls"];

const foodImages = [
  { src: "/food/food-01.jpeg", title: "Blueberry almond bowl" },
  { src: "/food/food-02.jpeg", title: "Coconut berry bowl" },
  { src: "/food/food-03.jpeg", title: "Mango smoothie bowl" },
  { src: "/food/food-04.jpeg", title: "Chia pudding cups" },
  { src: "/food/food-05.jpeg", title: "Chocolate granola bowl" },
  { src: "/food/food-06.jpeg", title: "Mini pancake tray" },
  { src: "/food/food-07.jpeg", title: "Cacao fruit bowl" },
  { src: "/food/food-08.jpeg", title: "Avocado smoothie" },
  { src: "/food/food-09.jpeg", title: "Green chia bowl" },
  { src: "/food/food-10.jpeg", title: "Granola cups" },
];

const venueImages = [
  "/venue/paddlex-01.webp",
  "/venue/paddlex-02.webp",
  "/venue/paddlex-03.webp",
  "/venue/paddlex-04.webp",
  "/venue/paddlex-05.webp",
  "/venue/paddlex-06.webp",
  "/venue/paddlex-07.webp",
];

const faqs = [
  ["Do I need pickleball experience?", "No, not at all. Whether you’re a complete beginner or someone who already plays regularly, the mixer is designed to be beginner-friendly and social-first. We’ll make sure you’re paired with people based on your comfort and experience level."],
  ["What’s included in the ticket?", "Your ticket includes a 2-hour curated pickleball social mixer at PaddleX, hosted interactions, a healthy breakfast buffet, fresh smoothies, and access to the Rizzfitt community experience."],
  ["Is this beginner friendly?", "Yes, 100%. The experience is designed to be fun, welcoming, and beginner-friendly for everyone."],
  ["What kind of people attend?", "Young professionals, creators, couples, founders, fitness enthusiasts, runners, community lovers, and socially active people from across Bangalore."],
  ["Is breakfast included?", "Yes. A healthy breakfast buffet is included, with options like granola cups, chia pudding, pancakes, fresh smoothies, and smoothie bowls."],
  ["Is this recurring?", "Yes. Rizzfitt is a recurring community experience and will happen once every month."],
  ["Will there be photos/videos?", "Yes, definitely. Photos and videos will be captured throughout the experience for content, memories, and community storytelling."],
];

function SectionTitle({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto mb-14 max-w-3xl text-center md:mb-20"
    >
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#8d7f68]">{kicker}</p>
      <h2 className="font-display text-4xl font-normal leading-tight tracking-normal text-[#17201a] md:text-6xl">{title}</h2>
      {copy ? <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#596158] md:text-lg">{copy}</p> : null}
    </motion.div>
  );
}

function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-[#17201a]/10 bg-white shadow-sm"
        whileHover={{ rotate: -6, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <Image src="/rizzfitt-mark.svg" alt="Rizzfitt mark" width={48} height={48} className="h-full w-full object-cover" priority />
      </motion.div>
      <span className="font-display text-2xl font-normal tracking-normal text-[#17201a]">Rizzfitt</span>
    </div>
  );
}

function CourtScene() {
  return (
    <div className="scene relative mx-auto h-[470px] max-w-[520px] md:h-[560px]">
      <motion.div
        className="court-card absolute inset-x-5 top-12 rounded-[2.5rem] border border-[#17201a]/10 bg-[#dfe9d4] p-4 shadow-[0_35px_90px_rgba(31,41,34,.16)]"
        animate={{ rotateX: [62, 58, 62], rotateZ: [-8, -4, -8], y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative h-[360px] overflow-hidden rounded-[2rem] border border-white/70 bg-[#a8c8a0] md:h-[430px]">
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/65" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/65" />
          <div className="absolute left-[18%] top-[12%] h-[76%] w-px bg-white/45" />
          <div className="absolute right-[18%] top-[12%] h-[76%] w-px bg-white/45" />
          <div className="absolute inset-6 rounded-[1.5rem] border border-white/60" />
          <motion.div className="absolute left-[25%] top-[26%] h-8 w-8 rounded-full bg-[#f2c37f] shadow-[0_12px_28px_rgba(135,93,40,.2)]" animate={{ x: [0, 115, 10], y: [0, 86, 156] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} />
          {[
            ["left-[18%] top-[68%]", "#f6efe2"],
            ["left-[34%] top-[34%]", "#17201a"],
            ["right-[22%] top-[62%]", "#ffffff"],
            ["right-[34%] top-[28%]", "#ece3d2"],
          ].map(([pos, color], idx) => (
            <motion.div
              key={pos}
              className={cn("absolute h-11 w-11 rounded-full border-4 border-white/80 shadow-lg", pos)}
              style={{ background: color }}
              animate={{ y: [0, idx % 2 ? -10 : 10, 0] }}
              transition={{ duration: 3.8 + idx, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        className="float-note absolute left-0 top-12 max-w-[210px] rounded-[1.6rem] border border-[#17201a]/10 bg-white/80 p-4 shadow-xl backdrop-blur-xl"
        animate={{ y: [0, 12, 0], rotate: [-2, 1, -2] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="flex -space-x-2">
          {["#17201a", "#d8a966", "#f6efe2", "#91b48a"].map((color) => (
            <span key={color} className="h-8 w-8 rounded-full border-2 border-white" style={{ background: color }} />
          ))}
        </div>
        <p className="mt-3 text-sm leading-6 text-[#596158]">Rotating pods so every game starts with someone new.</p>
      </motion.div>
      <motion.div
        className="float-note absolute bottom-10 right-0 max-w-[220px] rounded-[1.6rem] border border-[#17201a]/10 bg-[#fffaf1]/85 p-4 shadow-xl backdrop-blur-xl"
        animate={{ y: [0, -14, 0], rotate: [2, -1, 2] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8d7f68]">friendship odds</p>
        <div className="mt-3 flex items-end gap-2">
          <span className="font-display text-5xl text-[#17201a]">87%</span>
          <span className="pb-2 text-sm text-[#596158]">match energy</span>
        </div>
      </motion.div>
    </div>
  );
}

function Paddle({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={cn("absolute h-32 w-20 rounded-[2rem] bg-[#17201a] shadow-[0_24px_50px_rgba(31,41,34,.18)]", className)}
      animate={{ y: [0, -12, 0], rotate: [-8, -2, -8] }}
      transition={{ duration: 5.5, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-3 rounded-[1.35rem] border border-[#fffaf1]/20" />
      <div className="absolute -bottom-12 left-1/2 h-16 w-5 -translate-x-1/2 rounded-full bg-[#c79258]" />
    </motion.div>
  );
}

function PickleballWorld() {
  return (
    <div className="relative mx-auto h-[560px] max-w-6xl overflow-hidden rounded-[3rem] border border-[#17201a]/10 bg-[#b9d4a8] p-5 shadow-[0_35px_100px_rgba(31,41,34,.12)] md:p-8">
      <div className="absolute inset-5 rounded-[2.4rem] border border-white/70" />
      <div className="absolute left-1/2 top-5 h-[calc(100%-2.5rem)] w-px bg-white/70" />
      <div className="absolute inset-x-5 top-1/2 h-px bg-white/70" />
      <div className="absolute left-[22%] top-12 h-[calc(100%-6rem)] w-px bg-white/45" />
      <div className="absolute right-[22%] top-12 h-[calc(100%-6rem)] w-px bg-white/45" />
      <Paddle className="left-[9%] top-[14%] bg-[#17201a]" />
      <Paddle className="right-[10%] bottom-[18%] bg-[#fffaf1]" delay={0.8} />
      <motion.div className="pickleball absolute left-[48%] top-[42%]" animate={{ x: [-160, 150, -70, -160], y: [-90, 60, 135, -90] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} />
      <div className="absolute inset-x-6 bottom-6 grid gap-3 md:grid-cols-5">
        {playCards.map((card, idx) => (
          <motion.div
            key={card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06 }}
            whileHover={{ y: -8 }}
            className="rounded-[1.4rem] border border-white/60 bg-[#fffaf1]/78 p-4 text-center text-sm font-semibold text-[#17201a] shadow-lg backdrop-blur"
          >
            {card}
          </motion.div>
        ))}
      </div>
      <motion.div className="absolute left-1/2 top-12 w-[min(86%,560px)] -translate-x-1/2 rounded-[2rem] bg-[#fffaf1]/82 p-6 text-center shadow-xl backdrop-blur-xl" whileHover={{ scale: 1.015 }}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7f855f]">the rizzfitt court</p>
        <h3 className="mt-3 font-display text-4xl font-normal text-[#17201a]">Every rally unlocks a new person.</h3>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [paid, setPaid] = useState(false);
  const [skill, setSkill] = useState([30]);
  const [, setAgeOk] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const price = 1499;

  async function celebrate() {
    setPaid(true);
    const confetti = (await import("canvas-confetti")).default;
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#17201A", "#91B48A", "#F2C37F", "#FFFFFF"],
    });
  }

  async function handlePayment() {
    setSubmitting(true);
    const win = window as RazorpayWindow;
    if (!win.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
      await new Promise((resolve) => {
        script.onload = resolve;
        script.onerror = resolve;
        setTimeout(resolve, 1800);
      });
    }

    if (win.Razorpay) {
      const rz = new win.Razorpay({
        key: "rzp_test_RizzfittDemo",
        amount: price * 100,
        currency: "INR",
        name: "Rizzfitt",
        description: "Curated Pickleball Social Mixer",
        handler: celebrate,
        theme: { color: "#91B48A" },
      });
      rz.open();
    } else {
      await celebrate();
    }
    setSubmitting(false);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f1e8] text-[#17201a]">
      <div className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 rounded-full border border-[#17201a]/10 bg-[#fffaf1]/78 px-3 py-3 shadow-[0_18px_60px_rgba(31,41,34,.08)] backdrop-blur-2xl md:px-5">
        <div className="flex items-center justify-between gap-3">
          <BrandLogo />
          <div className="hidden items-center gap-7 text-sm text-[#596158] md:flex">
            <a href="#experience" className="transition hover:text-[#17201a]">The morning</a>
            <a href="#community" className="transition hover:text-[#17201a]">Community</a>
            <a href="#register" className="transition hover:text-[#17201a]">Join</a>
          </div>
          <Button asChild size="default" className="h-10 px-5 text-xs md:h-11 md:text-sm">
            <a href="#register">Save a spot</a>
          </Button>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full border border-[#17201a]/10 bg-[#fffaf1]/80 p-2 shadow-xl backdrop-blur-xl md:hidden">
        <a href="#register" className="pointer-events-auto rounded-full bg-[#17201a] px-5 py-3 text-sm font-semibold text-[#fffaf1]">Join</a>
        <a href="#community" className="pointer-events-auto rounded-full bg-white/70 px-5 py-3 text-sm font-semibold text-[#17201a]">People</a>
      </div>

      <section className="relative min-h-screen px-4 pb-24 pt-32 md:px-8 md:pt-40">
        <div className="calm-grid absolute inset-0" />
        <motion.div className="soft-orb left-[6%] top-40 bg-[#dce9d3]" animate={{ x: [0, 28, 0], y: [0, -22, 0] }} transition={{ duration: 11, repeat: Infinity }} />
        <motion.div className="soft-orb right-[10%] top-24 bg-[#f3d6a5]" animate={{ x: [0, -24, 0], y: [0, 20, 0] }} transition={{ duration: 13, repeat: Infinity }} />

        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_.9fr]">
          <div className="max-w-4xl">
            <motion.div variants={fadeUp} className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#17201a]/10 bg-white/55 px-4 py-2 text-sm text-[#596158] shadow-sm backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-[#91a96f]" />
              June 13, 2026 · PaddleX, Bellandur · morning session
            </motion.div>
            <motion.h1 variants={fadeUp} transition={{ duration: 0.85 }} className="font-display max-w-4xl text-5xl font-normal leading-[1.04] tracking-normal text-[#17201a] md:text-7xl lg:text-[5.9rem]">
              Pickleball, but make it social.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-lg leading-9 text-[#596158] md:text-xl">
              Rotating pods, rally quests, a healthy breakfast buffet, and a Bangalore crowd that actually wants to meet.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
              {["Beginner friendly", "PaddleX courts", "Breakfast buffet", "Monthly community"].map((item) => (
                <span key={item} className="rounded-full border border-[#17201a]/10 bg-white/50 px-4 py-2 text-sm text-[#596158] shadow-sm backdrop-blur-xl">{item}</span>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><a href="#register">Reserve your spot <ChevronRight className="h-5 w-5" /></a></Button>
              <Button asChild size="lg" variant="glass"><a href="#community">See the community</a></Button>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} transition={{ duration: 0.9 }}>
            <CourtScene />
          </motion.div>
        </motion.div>
        <a href="#experience" className="absolute bottom-8 left-1/2 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border border-[#17201a]/10 bg-white/55 text-[#596158] shadow-sm backdrop-blur-xl">
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.7, repeat: Infinity }}><ArrowDown className="h-5 w-5" /></motion.span>
        </a>
      </section>

      <section id="experience" className="relative px-4 py-24 md:px-8 md:py-32">
        <SectionTitle
          kicker="The social game loop"
          title="Play. Rotate. Laugh. Repeat."
        />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {morningLoop.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -8, rotateX: 4, rotateY: idx === 1 ? 0 : idx ? -4 : 4 }}
                key={item.title}
                className="soft-card group rounded-[2rem] p-6 md:p-7"
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="rounded-full bg-[#f7f2e8] px-3 py-1 text-sm text-[#8d7f68]">{item.time}</span>
                  <Icon className="h-6 w-6 text-[#7f9b75]" />
                </div>
                <h3 className="font-display text-3xl font-normal leading-tight">{item.title}</h3>
                <p className="mt-5 leading-8 text-[#596158]">{item.copy}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section id="community" className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative overflow-hidden rounded-[2.5rem] bg-[#17201a] p-8 text-[#fffaf1] shadow-[0_35px_100px_rgba(31,41,34,.18)] md:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#91b48a]/30 blur-3xl" />
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c9d7bf]">not just a mixer</p>
            <h2 className="relative mt-10 font-display text-4xl font-normal leading-tight md:text-6xl">A recurring circle for people who want better weekends.</h2>
            <p className="relative mt-8 text-lg leading-9 text-[#dfe7da]">A game gives everyone something to do. The table gives everyone a reason to stay.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2">
            {differenceCards.map(([title, copy, Icon]) => (
              <motion.div variants={fadeUp} whileHover={{ y: -6 }} key={title} className="soft-card rounded-[1.8rem] p-6">
                <Icon className="h-6 w-6 text-[#7f9b75]" />
                <h3 className="mt-6 font-display text-2xl font-normal">{title}</h3>
                <p className="mt-3 leading-7 text-[#596158]">{copy}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-24 md:px-8 md:py-32">
        <SectionTitle kicker="No random stock photos" title="A whole pickleball social world." />
        <PickleballWorld />
      </section>

      <section className="overflow-hidden px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="soft-card overflow-hidden rounded-[2.5rem]">
            <div className="grid gap-0 lg:grid-cols-[.42fr_.58fr]">
              <div className="flex flex-col justify-between p-8 md:p-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8d7f68]">venue partner</p>
                  <div className="mt-6 flex items-center gap-4">
                    <Image src="/partners/paddlex.jpeg" alt="PaddleX logo" width={88} height={88} className="rounded-3xl border border-[#17201a]/10 object-cover shadow-sm" />
                    <h2 className="font-display text-4xl font-normal leading-tight md:text-5xl">PaddleX</h2>
                  </div>
                  <p className="mt-6 text-lg leading-8 text-[#596158]">The pickleball club hosting our morning mixer at Bhoganahalli Road, Bellandur.</p>
                </div>
                <Button asChild variant="glass" className="mt-8 w-fit">
                  <a href="https://maps.app.goo.gl/N8z3wHvG2Ss8JNWRA" target="_blank" rel="noreferrer">
                    Open location <MapPin className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="relative min-h-[520px] overflow-hidden bg-[#17201a] p-5">
                <div className="venue-collage">
                  {venueImages.map((src, idx) => (
                    <motion.div
                      key={src}
                      className={cn("venue-photo", idx === 0 && "is-large", idx === 4 && "is-wide")}
                      initial={{ opacity: 0, y: 30, rotate: idx % 2 ? 2 : -2 }}
                      whileInView={{ opacity: 1, y: 0, rotate: idx % 2 ? 1 : -1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.06 }}
                      whileHover={{ scale: 1.035, rotate: 0, zIndex: 5 }}
                    >
                      <Image src={src} alt={`PaddleX court ${idx + 1}`} fill sizes="(max-width: 768px) 80vw, 36vw" className="object-cover" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="overflow-hidden px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8d7f68]">food & beverage partner</p>
              <h2 className="mt-5 font-display text-4xl font-normal leading-tight md:text-6xl">Breakfast by Sunkissed.</h2>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-[2rem] border border-[#17201a]/10 bg-white/70 p-4 shadow-sm backdrop-blur">
              <Image src="/partners/sunkissed-logo.png" alt="Sunkissed smoothie bar and kitchen logo" width={260} height={120} className="h-16 w-auto object-contain mix-blend-multiply" />
            </motion.div>
          </div>

          <div className="food-marquee rounded-[2.5rem] border border-[#17201a]/10 bg-[#fffaf1]/58 p-4 shadow-[0_28px_85px_rgba(31,41,34,.09)] backdrop-blur">
            <div className="food-track">
              {[...foodImages, ...foodImages].map((item, idx) => (
                <motion.div whileHover={{ y: -10, rotate: idx % 2 ? 1 : -1 }} key={`${item.src}-${idx}`} className="food-card">
                  <Image src={item.src} alt={item.title} fill sizes="320px" className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#17201a]/78 to-transparent p-5">
                    <p className="font-display text-2xl text-white">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {breakfastOptions.map((item) => (
              <motion.div variants={fadeUp} key={item} className="rounded-full border border-[#17201a]/10 bg-white/55 px-5 py-3 text-center text-sm font-semibold text-[#596158] shadow-sm">
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="register" className="relative px-4 py-24 md:px-8 md:py-32">
        <SectionTitle
          kicker="Reserve"
          title="Save your court spot."
        />
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <motion.form variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="soft-card rounded-[2.5rem] p-5 md:p-8">
            <div className="mb-8 grid gap-3 sm:grid-cols-3">
              {["Your details", "Court vibe", "Breakfast"].map((item, idx) => (
                <div key={item} className="rounded-2xl border border-[#17201a]/10 bg-[#fffaf1]/55 p-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8d7f68]">0{idx + 1}</span>
                  <p className="mt-2 font-display text-xl text-[#17201a]">{item}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Real Name (First & Last)" />
              <Input label="WhatsApp Number" type="tel" />
              <Input label="Email Address" type="email" />
              <Input label="Age" type="number" />
              <Input label="Court Alias" placeholder="What should we call you?" />
              <Input label="Instagram Handle" placeholder="@yourhandle" />
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <ChoiceBlock title="Age Confirmation" options={["Yes, I am 21 or older", "No"]} onYes={() => setAgeOk(true)} />
              <ChoiceBlock title="Gender" options={["Man", "Woman"]} />
              <ChoiceBlock title="Meal Preference" options={["Veg", "Non-Veg"]} />
              <ChoiceBlock title="What's your vibe?" options={["Done with apps. I want IRL connections.", "Just looking for a fun weekend experience.", "Mostly here for the pickleball and the food."]} />
              <ChoiceBlock title="Which best describes you?" options={["Competitive on the court", "Social and easygoing", "Curious to meet new people"]} />
              <div className="rounded-[1.7rem] border border-[#17201a]/10 bg-white/45 p-5">
                <p className="mb-5 text-sm font-semibold text-[#17201a]">Pickleball Skill Level</p>
                <Slider.Root value={skill} onValueChange={setSkill} max={100} step={1} className="relative flex h-6 touch-none select-none items-center">
                  <Slider.Track className="relative h-2 grow overflow-hidden rounded-full bg-[#e9dfcf]">
                    <Slider.Range className="absolute h-full bg-[#91b48a]" />
                  </Slider.Track>
                  <Slider.Thumb className="block h-6 w-6 rounded-full border-2 border-white bg-[#17201a] shadow-lg outline-none" />
                </Slider.Root>
                <div className="mt-3 flex justify-between text-xs text-[#8d7f68]"><span>Beginner/Never Played</span><span>Experienced Player</span></div>
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Textarea label="What do you do?" />
              <Textarea label="What kind of people do you enjoy meeting?" />
              <Textarea label="Anything else we should know about you?" className="md:col-span-2" />
            </div>
          </motion.form>

          <div id="pricing" className="space-y-5">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="soft-card sticky top-24 rounded-[2.5rem] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8d7f68]">Early bird pass</p>
              <div className="mt-5 flex items-end gap-3">
                <span className="mb-3 text-2xl text-[#8d7f68] line-through md:text-3xl">₹1999</span>
                <AnimatePresence mode="popLayout">
                  <motion.div key={price} initial={{ y: 18, opacity: 0, filter: "blur(8px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} exit={{ y: -18, opacity: 0, filter: "blur(8px)" }} className="font-display text-6xl font-normal text-[#17201a]">₹{price}</motion.div>
                </AnimatePresence>
              </div>
              <p className="mt-3 text-[#596158]">per person</p>
              <div className="mt-7 space-y-3">
                {["curated pickleball mixer", "PaddleX court access", "healthy breakfast buffet", "fresh smoothies and bowls", "hosted social flow", "community access"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[#596158]"><Check className="h-5 w-5 text-[#7f9b75]" />{item}</div>
                ))}
              </div>
              <p className="mt-7 rounded-[1.5rem] border border-[#17201a]/10 bg-[#fffaf1]/60 p-4 text-sm leading-6 text-[#596158]">Run club coupon codes are reserved for partner communities and will be shared privately.</p>
              <Button type="button" onClick={handlePayment} disabled={submitting} className="mt-7 w-full" size="lg">
                <CreditCard className="h-5 w-5" /> {submitting ? "Opening payment..." : `Pay ₹${price} with Razorpay`}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {paid && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-[#17201a]/45 p-4 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.94, y: 28, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} className="soft-card max-w-xl rounded-[2.5rem] p-8 text-center">
              <PartyPopper className="mx-auto h-12 w-12 text-[#7f9b75]" />
              <h2 className="mt-5 font-display text-4xl font-normal text-[#17201a]">You’re officially part of Rizzfitt.</h2>
              <p className="mt-4 leading-7 text-[#596158]">Your Saturday morning just got more human. We’ll share court details and community access on WhatsApp.</p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild><a href="https://wa.me/" target="_blank">WhatsApp group</a></Button>
                <Button variant="glass" asChild><a href="https://www.instagram.com/" target="_blank"><Share2 className="h-4 w-4" /> Share Rizzfitt</a></Button>
              </div>
              <button onClick={() => setPaid(false)} className="mt-6 text-sm text-[#8d7f68] hover:text-[#17201a]">Close</button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      <section id="faq" className="px-4 py-24 md:px-8 md:py-32">
        <SectionTitle kicker="Before you arrive" title="A few simple answers." />
        <div className="soft-card mx-auto max-w-4xl rounded-[2.5rem] px-6 md:px-9">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map(([q, a], idx) => (
              <AccordionItem value={`item-${idx}`} key={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="relative px-4 pb-28 pt-12 md:px-8 md:pb-36">
        <div className="mx-auto max-w-6xl rounded-[3rem] bg-[#17201a] p-8 text-center text-[#fffaf1] shadow-[0_35px_100px_rgba(31,41,34,.2)] md:p-16">
          <div className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-sm text-[#dfe7da]">
            <Waves className="h-4 w-4" />
            one morning, many new threads
          </div>
          <h2 className="font-display text-4xl font-normal leading-tight md:text-7xl">Your Saturday could become a story you keep retelling.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#dfe7da]">Meet new people. Play a casual game. Share breakfast. Find the people who make Bangalore feel smaller and warmer.</p>
          <Button asChild size="lg" className="mt-9 bg-[#fffaf1] text-[#17201a] hover:bg-white"><a href="#register">Reserve your spot <ChevronRight className="h-5 w-5" /></a></Button>
        </div>
      </section>
    </main>
  );
}

function Input({ label, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={cn("group block", className)}>
      <span className="mb-2 block text-sm font-semibold text-[#596158] transition-colors group-focus-within:text-[#17201a]">{label}</span>
      <input className="field h-14 px-5" {...props} />
    </label>
  );
}

function Textarea({ label, className }: { label: string; className?: string }) {
  return (
    <label className={cn("group block", className)}>
      <span className="mb-2 block text-sm font-semibold text-[#596158] transition-colors group-focus-within:text-[#17201a]">{label}</span>
      <textarea className="field min-h-28 resize-none p-5" />
    </label>
  );
}

function ChoiceBlock({ title, options, onYes }: { title: string; options: string[]; onYes?: () => void }) {
  return (
    <div className="rounded-[1.7rem] border border-[#17201a]/10 bg-white/45 p-5">
      <p className="mb-4 text-sm font-semibold text-[#17201a]">{title}</p>
      <RadioGroup.Root className="space-y-2" onValueChange={(value) => value.startsWith("Yes") && onYes?.()}>
        {options.map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#17201a]/8 bg-[#fffaf1]/50 p-3 text-sm text-[#596158] transition hover:border-[#91b48a]/70 hover:text-[#17201a]">
            <RadioGroup.Item value={option} className="grid h-5 w-5 place-items-center rounded-full border border-[#17201a]/20 data-[state=checked]:border-[#7f9b75]">
              <RadioGroup.Indicator className="h-2.5 w-2.5 rounded-full bg-[#7f9b75]" />
            </RadioGroup.Item>
            {option}
          </label>
        ))}
      </RadioGroup.Root>
      {title === "Age Confirmation" && (
        <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-2xl border border-[#17201a]/8 bg-[#fffaf1]/50 p-3 text-sm text-[#596158]">
          <Checkbox.Root onCheckedChange={(checked) => checked === true && onYes?.()} className="grid h-5 w-5 place-items-center rounded-md border border-[#17201a]/20 data-[state=checked]:border-[#7f9b75] data-[state=checked]:bg-[#7f9b75]">
            <Checkbox.Indicator><Check className="h-4 w-4 text-white" /></Checkbox.Indicator>
          </Checkbox.Root>
          Confirm I’m joining with good energy.
        </label>
      )}
    </div>
  );
}
