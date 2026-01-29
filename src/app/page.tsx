import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, LineChart, ShieldCheck } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ContactForm from "@/components/contact-form";
import RotatingSubheadline from "@/components/rotating-subheadline";
import WealthCalculator from "@/components/wealth-calculator";

const CALENDAR_LINK = "https://calendly.com/";

const services = [
  {
    title: "Family Protection",
    description:
      "Build a protection foundation that safeguards income, family goals, and long-term stability.",
  },
  {
    title: "Life Insurance Products",
    description:
      "IULs, annuities, term life, and permanent coverage strategies tailored to your objectives.",
  },
  {
    title: "Legacy & Wealth Transfer",
    description:
      "401(k) rollovers, IRA-to-Roth conversions, and beneficiary strategies to protect wealth across generations.",
  },
  {
    title: "Retirement Income Planning",
    description:
      "Plan for dependable income streams and tax-efficient distribution in retirement.",
  },
];

const steps = [
  {
    title: "Discovery Call",
    detail: "We learn your goals, timeline, and current coverage.",
  },
  {
    title: "Wealth Blueprint",
    detail: "Custom options comparing IULs, annuities, and protection layers.",
  },
  {
    title: "Implementation",
    detail: "We handle applications and keep you informed at every step.",
  },
  {
    title: "Annual Review",
    detail: "We monitor performance and adjust as your life evolves.",
  },
];

const faqs = [
  {
    question: "Is an IUL right for everyone?",
    answer:
      "Not always. We compare options to determine if it fits your goals, budget, and risk tolerance.",
  },
  {
    question: "How do annuities help with generational wealth?",
    answer:
      "They can create reliable income streams and preserve principal, helping you avoid selling assets prematurely.",
  },
  {
    question: "Do you work with families and business owners?",
    answer:
      "Yes. We support both personal wealth planning and business continuity needs.",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[#0b132b] text-white">
      <div className="pointer-events-none absolute left-1/2 top-[-160px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.35),_transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-40 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,_rgba(12,74,110,0.35),_transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-80 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,_rgba(30,64,175,0.3),_transparent_70%)] blur-3xl" />

      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-24 pt-10">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center">
              <Image
                src="/trupath-wealth-logo-gold.png"
                alt="Trupath Wealth"
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
            <Button
              asChild
              className="rounded-full border border-[#1c2750] bg-[#111c3d] text-[#d4af37] hover:bg-[#1a2a5a]"
              variant="outline"
            >
              <Link href={CALENDAR_LINK}>Schedule a call</Link>
            </Button>
          </nav>
        </header>

        <section className="mt-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Badge className="rounded-full bg-[#d4af37] px-4 py-1 text-xs uppercase tracking-[0.2em] text-[#0b132b]">
              Premium wealth strategy
            </Badge>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Build Wealth &amp; Security
            </h1>
            <RotatingSubheadline />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Button size="lg" className="rounded-full bg-[#d4af37] text-[#0b132b] hover:bg-[#f0cf6b]">
                Book a strategy call
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-[#1c2750] bg-[#111c3d] text-[#d4af37] hover:bg-[#1a2a5a]"
              >
                Download service guide
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Licensed Advisors",
              detail: "Credentialed guidance with compliance-minded planning.",
              icon: ShieldCheck,
            },
            {
              title: "Long-Term Wealth Focus",
              detail: "Strategies designed to build stability across life stages.",
              icon: LineChart,
            },
            {
              title: "Family-First Planning",
              detail: "Protection and legacy planning centered on your loved ones.",
              icon: HeartHandshake,
            },
          ].map((item) => (
            <Card key={item.title} className="rounded-3xl border border-white/10 bg-white/10 text-white">
              <CardHeader className="items-center text-center">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 mx-auto">
                  <item.icon className="h-5 w-5 text-[#d4af37]" />
                </div>
                <CardTitle className="text-xl text-[#d4af37]">{item.title}</CardTitle>
                <CardDescription className="text-white/70">{item.detail}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section id="services" className="mt-24 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <Badge className="w-fit rounded-full bg-[#d4af37] px-4 py-1 text-[#0b132b]">
              Services
            </Badge>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Built For Family Security & Wealth Creation
            </h2>
            <p className="text-white/70">
              We focus on strategies that combine protection with long-term wealth goals. Every plan is tailored
              to your family’s story.
            </p>
            <div className="grid gap-4">
              {services.map((service) => (
                <Card key={service.title} className="rounded-3xl border border-white/10 bg-white/10">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#d4af37]">{service.title}</CardTitle>
                    <CardDescription className="text-white/70">{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Card className="rounded-3xl border border-[#0b132b]/10 bg-[#0b132b] text-[#d4af37] shadow-2xl shadow-slate-400/40">
              <CardHeader>
                <CardTitle className="text-2xl">Wealth Path Snapshot</CardTitle>
                <CardDescription className="text-[#d4af37]/70">
                  Estimate how your current assets can support future goals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WealthCalculator />
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="process" className="mt-24 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Badge className="w-fit rounded-full bg-[#d4af37] px-4 py-1 text-[#0b132b]">
              Our process
            </Badge>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              A clear, high-touch path to confidence.
            </h2>
            <p className="text-white/70">
              We believe wealth strategy is deeply personal. Each client receives a tailored roadmap backed by
              education and transparency.
            </p>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-sm font-semibold text-[#d4af37]">
                    0{index + 1}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[#d4af37]">{step.title}</p>
                    <p className="text-sm text-white/70">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Card className="rounded-3xl border border-white/10 bg-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-[#d4af37]">Request a consultation</CardTitle>
                <CardDescription className="text-white/70">We respond within 1 business day.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
                <p className="mt-3 text-xs text-white/60">
                  By submitting, you agree to be contacted about insurance and wealth planning services.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-20 rounded-[36px] border border-[#d4af37]/20 bg-[#0b132b] px-8 py-12 text-[#d4af37] md:px-12">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold md:text-4xl">Build a legacy that lasts beyond one lifetime.</h2>
              <p className="text-base text-[#d4af37]/70">
                Trupath Wealth specializes in strategies designed to protect families and create multi-generational
                confidence.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <Button size="lg" className="rounded-full border border-[#1c2750] bg-[#111c3d] text-[#d4af37] hover:bg-[#1a2a5a]">
                Request a custom plan
              </Button>
              <Button size="lg" className="rounded-full bg-[#d4af37] text-[#0b132b] hover:bg-[#f0cf6b]">
                Talk with an advisor
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((item) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="rounded-3xl border border-white/10 bg-white/10 px-6"
              >
                <AccordionTrigger className="text-left text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-white/70">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <footer className="mt-16 space-y-6 border-t border-white/10 pt-8 text-sm text-white/70">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-base font-semibold text-[#d4af37]">Trupath Wealth LLC</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Disclosures</span>
            </div>
          </div>
          <p className="text-xs">
            Insurance products are offered through licensed professionals. This information is for educational
            purposes only and does not constitute tax or legal advice. Policy loans and withdrawals may reduce
            cash value and death benefits.
          </p>
        </footer>
      </div>
    </div>
  );
}
