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
  const initialUpdate = useRef(true);

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
    if (typeof window === "undefined") {
      return;
    }

    if (initialUpdate.current) {
      initialUpdate.current = false;
      return;
    }

    const handler = window.setTimeout(() => {
      const url = new URL(window.location.href);
      url.searchParams.set("athletes", athleteCount.toString());
      window.history.replaceState(null, "", url.toString());
    }, 250);

    return () => window.clearTimeout(handler);
  }, [athleteCount]);

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

  const resultHighlight = highlight
    ? "ring-2 ring-primary/30 shadow-strong"
    : "ring-1 ring-transparent";

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="card motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-strong">
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
            <div className="rounded-xl border border-border/70 bg-bg p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-small text-muted">
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
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-sm font-semibold text-text transition hover:bg-bg focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
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
                      className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(event) => handleStepper(1, event.shiftKey)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-sm font-semibold text-text transition hover:bg-bg focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
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
                  onValueChange={(value) => applyAthleteCount(value[0])}
                  className="relative flex w-full touch-none select-none items-center"
                  aria-label={pricing.calculator.athleteRangeLabel}
                >
                  <Slider.Track className="relative h-2 w-full grow rounded-full bg-border/60">
                    <Slider.Range className="absolute h-full rounded-full bg-primary" />
                  </Slider.Track>
                  <Slider.Thumb className="block h-4 w-4 rounded-full border border-border bg-surface shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40" />
                </Slider.Root>
              </div>
            </div>

            <div
              className={`rounded-lg border border-border/70 bg-bg p-5 transition motion-safe:transition ${resultHighlight}`}
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
              className={`rounded-lg border border-border/70 bg-bg p-5 transition motion-safe:transition ${resultHighlight}`}
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

          <div className="rounded-xl border border-border/70 bg-surface/80 p-5">
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
                    className="rounded-md border border-border bg-surface px-3 py-2 text-xs text-text shadow-strong"
                  >
                    {pricing.calculator.setupTooltip}
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border/70 bg-bg p-4">
                <p className="text-small font-semibold text-text">
                  {pricing.calculator.breakdownFirstYearLabel}
                </p>
                <p className="mt-2 text-xs text-muted">
                  {pricing.calculator.breakdownFirstYearBody}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 bg-bg p-4">
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
          </div>
        </div>

        <div className="mt-8 border-t border-border/60 pt-6">
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
                href={`mailto:${content.footer.contactEmail}`}
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
