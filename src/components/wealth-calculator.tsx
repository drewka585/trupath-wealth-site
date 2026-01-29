"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AssetChoice = "employer" | "ira" | "cash" | "supplemental";

const ASSET_LABELS: Record<AssetChoice, string> = {
  employer: "Employer retirement account (401k or similar)",
  ira: "IRA (Traditional or Roth)",
  cash: "Cash / Savings",
  supplemental: "Exploring a supplemental strategy",
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const clamp = (value: number, min: number, max: number) => {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
};

const annualToMonthly = (rate: number) => Math.pow(1 + rate, 1 / 12) - 1;

const futureValue = (principal: number, monthly: number, years: number, rate: number) => {
  const n = years * 12;
  const rm = annualToMonthly(rate);
  if (rm === 0) return principal + monthly * n;
  return principal * Math.pow(1 + rm, n) + monthly * ((Math.pow(1 + rm, n) - 1) / rm);
};

export default function WealthCalculator() {
  const [assetChoice, setAssetChoice] = useState<AssetChoice>("employer");
  const [balance, setBalance] = useState(180000);
  const [monthly, setMonthly] = useState(550);
  const [years, setYears] = useState(20);
  const [planningOn, setPlanningOn] = useState(false);

  const computed = useMemo(() => {
    const yearsClamped = clamp(years, 1, 40);
    const principal = clamp(balance, 0, 50_000_000);
    const contribution = clamp(monthly, 0, 50_000);
    const rate = 0.06; // Illustrative industry-average assumption.

    const totalFV = futureValue(principal, contribution, yearsClamped, rate);
    const totalContributions = principal + contribution * yearsClamped * 12;
    const growth = totalFV - totalContributions;

    return {
      yearsClamped,
      totalFV,
      totalContributions,
      growth,
    };
  }, [balance, monthly, years]);

  return (
    <div className="space-y-6 text-white">
      <div className="rounded-3xl border border-[#d4af37]/20 bg-white/5 p-5">
        <p className="text-xs italic text-white/60">
          Educational illustration only. Hypothetical results. Not a guarantee. Not financial, tax, or legal
          advice.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Primary asset</p>
        <div className="mt-3 space-y-2">
          {(Object.keys(ASSET_LABELS) as AssetChoice[]).map((asset) => (
            <label
              key={asset}
              className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                assetChoice === asset
                  ? "border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37]"
                  : "border-white/10 text-white/70 hover:border-[#d4af37]/60"
              }`}
            >
              <span>{ASSET_LABELS[asset]}</span>
              <input
                type="radio"
                name="primaryAsset"
                value={asset}
                checked={assetChoice === asset}
                onChange={() => setAssetChoice(asset)}
                className="h-4 w-4 accent-[#d4af37]"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Basic inputs</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3 md:items-center">
          <div className="text-center">
            <label className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Current balance
              <span className="group relative flex h-4 w-4 items-center justify-center rounded-full border border-[#d4af37]/60 text-[10px] text-[#d4af37]">
                i
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 rounded-xl border border-white/10 bg-[#0b132b] px-3 py-2 text-[11px] text-white/70 opacity-0 shadow-lg shadow-black/30 transition group-hover:opacity-100">
                  The approximate value of your account today.
                </span>
              </span>
            </label>
            <Input
              type="number"
              value={balance}
              onChange={(event) => setBalance(clamp(Number(event.target.value), 0, 50_000_000))}
              className="mt-3 border-white/15 bg-white/10 text-white placeholder:text-white/40"
            />
          </div>
          <div className="text-center">
            <label className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Monthly contribution
              <span className="group relative flex h-4 w-4 items-center justify-center rounded-full border border-[#d4af37]/60 text-[10px] text-[#d4af37]">
                i
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-[#0b132b] px-3 py-2 text-[11px] text-white/70 opacity-0 shadow-lg shadow-black/30 transition group-hover:opacity-100">
                  What you’re currently adding each month, or plan to add going forward.
                </span>
              </span>
            </label>
            <Input
              type="number"
              value={monthly}
              onChange={(event) => setMonthly(clamp(Number(event.target.value), 0, 50_000))}
              className="mt-3 border-white/15 bg-white/10 text-white placeholder:text-white/40"
            />
          </div>
          <div className="text-center">
            <label className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Years to grow
              <span className="group relative flex h-4 w-4 items-center justify-center rounded-full border border-[#d4af37]/60 text-[10px] text-[#d4af37]">
                i
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 rounded-xl border border-white/10 bg-[#0b132b] px-3 py-2 text-[11px] text-white/70 opacity-0 shadow-lg shadow-black/30 transition group-hover:opacity-100">
                  How long this money could remain invested before being used.
                </span>
              </span>
            </label>
            <Input
              type="number"
              value={years}
              min={1}
              max={40}
              onChange={(event) => setYears(clamp(Number(event.target.value), 1, 40))}
              className="mt-3 border-white/15 bg-white/10 text-white placeholder:text-white/40"
            />
          </div>
        </div>
      </div>


      <div className="rounded-3xl border border-[#d4af37]/20 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Estimated Future Value</p>
        <p className="mt-3 text-3xl font-semibold text-white">{currency.format(computed.totalFV)}</p>
        <p className="mt-2 text-sm text-white/70">
          {planningOn
            ? `Illustrative estimate assuming long-term, professionally managed growth over ${computed.yearsClamped} years.`
            : `Illustrative estimate assuming long-term growth over ${computed.yearsClamped} years.`}
        </p>
        <div className="mt-4 space-y-2 text-sm text-white/70">
          <p>
            Total contributions: {currency.format(computed.totalContributions)}
            <span className="ml-2 text-[#d4af37]">ⓘ</span>
            <span className="ml-2 text-white/60">What you would contribute over time.</span>
          </p>
          <p>
            Estimated growth (hypothetical): {currency.format(computed.growth)}
            <span className="ml-2 text-[#d4af37]">ⓘ</span>
            <span className="ml-2 text-white/60">
              Potential growth based on illustrative assumptions.
            </span>
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <Button className="w-full rounded-full bg-[#d4af37] text-[#0b132b] hover:bg-[#f0cf6b]">
          Request a personalized review
        </Button>
        <p className="mt-3 text-sm text-white/70">
          An advisor can walk through investment options, tax considerations, and strategies tailored to your
          situation.
        </p>
      </div>

      <p className="text-xs italic text-white/60">
        Educational illustration only. Hypothetical results. Not a guarantee. Not financial, tax, or legal
        advice. Actual outcomes depend on market conditions, investment selection, fees, and individual
        circumstances.
      </p>
    </div>
  );
}
