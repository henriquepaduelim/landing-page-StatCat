import { useEffect, useMemo, useRef, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import * as Tooltip from "@radix-ui/react-tooltip";
import { content } from "../../data/content";
import { formatCAD } from "../../utils/money";
import { calculatePricing, getPricingTierSummary } from "../../utils/pricing";
import Icon from "../Icon";

const PricingCalculator = () => {
  const { pricing } = content;
  const [athleteCount, setAthleteCount] = useState(pricing.defaultAthletes);
  const [inputValue, setInputValue] = useState(
    pricing.defaultAthletes.toString()
  );
  const [highlight, setHighlight] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);

  const minAthletes = pricing.minAthletes;
  const maxAthletes = pricing.maxAthletes;

  const clampAthletes = (value: number) =>
    Math.min(maxAthletes, Math.max(minAthletes, value));

  const applyAthleteCount = (value: number) => {
    const clamped = clampAthletes(value);
    setAthleteCount(clamped);
    setInputValue(clamped.toString());
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const athletes = Number(params.get("athletes"));

    if (Number.isFinite(athletes)) {
      applyAthleteCount(athletes);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      return;
    }

    setHighlight(true);
    const timer = window.setTimeout(() => setHighlight(false), 300);
    return () => window.clearTimeout(timer);
  }, [athleteCount]);

  const pricingResult = useMemo(
    () =>
      calculatePricing(
        athleteCount,
        "annual",
        pricing.tiers,
        pricing.monthlyRate,
        pricing.contactThreshold
      ),
    [
      athleteCount,
      pricing.contactThreshold,
      pricing.monthlyRate,
      pricing.tiers,
    ]
  );

  const tierSummary = useMemo(
    () => getPricingTierSummary(athleteCount, pricing.tiers),
    [athleteCount, pricing.tiers]
  );

  const isContactOnly = pricingResult.contactOnly;
  const perAthleteRate = pricingResult.perAthleteRate ?? 0;
  const estimatedTotal = pricingResult.estimatedTotal ?? 0;
  const annualTotal = estimatedTotal;
  const monthlyEquivalent = annualTotal / 12;

  const savingsLabel = isContactOnly
    ? pricing.calculator.contactNote
    : tierSummary.savingsAnnual > 0
      ? pricing.calculator.savingsLabelTemplate
      : pricing.calculator.savingsZeroLabel;

  const tierRateTemplate = pricing.calculator.tierRateNoteTemplate;
  const tierRateNote = !isContactOnly
    ? tierRateTemplate.includes("{rate}")
      ? tierRateTemplate.replace(
          "{rate}",
          formatCAD(perAthleteRate, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        )
      : tierRateTemplate
    : pricing.calculator.contactNote;

  const monthlyEquivalentLabel = formatCAD(monthlyEquivalent, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const parsed = Number(value);
    if (
      Number.isFinite(parsed) &&
      parsed >= minAthletes &&
      parsed <= maxAthletes
    ) {
      setAthleteCount(parsed);
    }
  };

  const commitInput = () => {
    const parsed = Number(inputValue);
    if (!Number.isFinite(parsed)) {
      setInputValue(athleteCount.toString());
      return;
    }

    applyAthleteCount(parsed);
  };

  const handleStepper = (direction: number, shiftKey: boolean) => {
    const step = shiftKey ? 10 : 1;
    applyAthleteCount(athleteCount + direction * step);
  };

  const handleShare = async () => {
    if (typeof window === "undefined") {
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set("athletes", athleteCount.toString());
    window.history.replaceState(null, "", url.toString());

    try {
      await navigator.clipboard?.writeText(url.toString());
      setCopied(true);
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        copyTimeoutRef.current = null;
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const resultHighlight = highlight
    ? "ring-2 ring-primary/30 shadow-strong"
    : "ring-1 ring-transparent";

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-small uppercase tracking-[0.2em] text-muted">
              {pricing.calculator.label}
            </p>
            <h3 className="mt-2 text-title font-semibold text-text">
              {pricing.calculator.heading}
            </h3>
            <p className="mt-2 max-w-prose text-small text-muted">
              {pricing.calculator.helper}
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p id="athlete-range-label" className="text-small text-muted">
                    {pricing.calculator.athleteCountLabel}
                  </p>
                  <p className="text-3xl font-semibold text-text font-mono">
                    {athleteCount}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(event) => handleStepper(-1, event.shiftKey)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-text transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    aria-label="Decrease athlete count"
                  >
                    -
                  </button>
                  <div className="w-24">
                    <label className="sr-only" htmlFor="athleteCount">
                      {pricing.calculator.athleteInputLabel}
                    </label>
                    <input
                      id="athleteCount"
                      type="number"
                      min={minAthletes}
                      max={maxAthletes}
                      value={inputValue}
                      onChange={(event) => handleInputChange(event.target.value)}
                      onBlur={commitInput}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          commitInput();
                        }
                      }}
                      className="mt-1 w-full rounded-md border-0 border-b border-white/20 bg-transparent px-3 py-2 text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(event) => handleStepper(1, event.shiftKey)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-text transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    aria-label="Increase athlete count"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <Slider.Root
                  min={minAthletes}
                  max={maxAthletes}
                  step={1}
                  value={[athleteCount]}
                  onValueChange={(value) => {
                    const nextValue = value[0];
                    if (typeof nextValue === "number") {
                      applyAthleteCount(nextValue);
                    }
                  }}
                  className="relative flex w-full touch-none select-none items-center"
                  aria-label={pricing.calculator.athleteRangeLabel}
                  aria-labelledby="athlete-range-label"
                >
                  <Slider.Track className="relative h-2 w-full grow rounded-full bg-white/15">
                    <Slider.Range className="absolute h-full rounded-full bg-primary" />
                  </Slider.Track>
                  <Slider.Thumb
                    aria-label={pricing.calculator.athleteRangeLabel}
                    aria-labelledby="athlete-range-label"
                    className="block h-4 w-4 rounded-full bg-white shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  />
                </Slider.Root>
              </div>
            </div>

            <div
              className={`rounded-lg bg-white/[0.03] p-5 transition motion-safe:transition ${resultHighlight}`}
            >
              <p className="text-small text-muted">
                {pricing.calculator.perAthleteLabelAnnual}
              </p>
              <p className="mt-3 text-2xl font-semibold text-text font-mono break-words">
                {isContactOnly
                  ? pricing.calculator.contactLabel
                  : formatCAD(perAthleteRate, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
              </p>
              <p className="mt-2 text-xs text-muted">
                {pricing.calculator.perAthleteSupport}
              </p>
              <p className="mt-1 text-xs text-muted">{tierRateNote}</p>
            </div>

            <div
              className={`rounded-lg bg-white/[0.03] p-5 transition motion-safe:transition ${resultHighlight}`}
            >
              <p className="text-small text-muted">
                {pricing.calculator.estimatedTotalLabel}
              </p>
              <p className="mt-3 text-3xl font-semibold text-text font-mono break-words">
                {isContactOnly
                  ? pricing.calculator.contactLabel
                  : `${formatCAD(annualTotal, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })} / year`}
              </p>
              <p className="mt-2 text-xs text-muted">
                {isContactOnly
                  ? pricing.calculator.contactNote
                  : `Less than ${monthlyEquivalentLabel} per month for your entire club.`}
              </p>
              {!isContactOnly ? (
                <p className="mt-1 text-xs text-muted">{savingsLabel}</p>
              ) : null}
            </div>
          </div>

          <div className="rounded-xl bg-white/[0.03] p-5">
            <div className="flex items-center gap-2">
              <p className="text-small uppercase tracking-[0.2em] text-muted">
                {pricing.calculator.breakdownTitle}
              </p>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center text-muted transition hover:text-text focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    aria-label={pricing.calculator.setupTooltip}
                  >
                    <Icon name="info" className="text-base" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    sideOffset={6}
                    className="rounded-md bg-bg-dark/95 px-3 py-2 text-xs text-text shadow-strong"
                  >
                    {pricing.calculator.setupTooltip}
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white/[0.03] p-4">
                <p className="text-small font-semibold text-text">
                  {pricing.calculator.breakdownFirstYearLabel}
                </p>
                <p className="mt-2 text-xs text-muted">
                  {pricing.calculator.breakdownFirstYearBody}
                </p>
              </div>
              <div className="rounded-lg bg-white/[0.03] p-4">
                <p className="text-small text-muted">
                  {pricing.calculator.breakdownYearTwoLabel}
                </p>
                <p className="mt-2 text-xl font-semibold text-text font-mono break-words">
                  {isContactOnly
                    ? pricing.calculator.contactLabel
                    : `${formatCAD(annualTotal, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })} / year`}
                </p>
                <p className="mt-2 text-xs text-muted">
                  {pricing.calculator.annualNote}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-1 text-xs text-muted">
            <p>{pricing.calculator.anchorLine}</p>
            <p>{pricing.calculator.riskReducerLine}</p>
            <p>{pricing.disclaimer}</p>
            <button
              type="button"
              onClick={handleShare}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-text transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              aria-label={pricing.calculator.shareTooltip}
            >
              <Icon name="content_copy" className="text-base" />
              {copied ? pricing.calculator.shareCopied : pricing.calculator.shareLabel}
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h3 className="text-title font-semibold text-text">
                {pricing.cta.title}
              </h3>
              <p className="mt-2 max-w-prose text-small text-muted">
                {pricing.cta.text}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#cta"
                className="btn-primary focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {pricing.cta.primaryLabel}
              </a>
              <a
                href={content.footer.contactWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {pricing.cta.secondaryLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
};

export default PricingCalculator;
