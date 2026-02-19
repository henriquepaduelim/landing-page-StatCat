#!/usr/bin/env python3
import argparse
import json
import re
from pathlib import Path

METRICS = [
    ("first-contentful-paint", "FCP"),
    ("largest-contentful-paint", "LCP"),
    ("speed-index", "Speed Index"),
    ("total-blocking-time", "TBT"),
    ("interactive", "TTI"),
    ("cumulative-layout-shift", "CLS"),
]
CATEGORIES = [
    ("performance", "Performance"),
    ("accessibility", "Accessibility"),
    ("best-practices", "Best Practices"),
    ("seo", "SEO"),
]


def extract_json(report_path: Path) -> dict:
    html = report_path.read_text(encoding="utf-8", errors="ignore")
    match = re.search(r"window\.__LIGHTHOUSE_JSON__\s*=\s*(\{[\s\S]*?\});\s*</script>", html)
    if not match:
        raise ValueError(f"Could not find Lighthouse JSON in: {report_path}")
    return json.loads(match.group(1))


def load_report(report_path: Path) -> dict:
    payload = extract_json(report_path)
    runtime_error = payload.get("runtimeError")

    result = {
        "path": str(report_path),
        "runtime_error": runtime_error,
        "scores": {},
        "metrics": {},
    }

    categories = payload.get("categories", {})
    for key, label in CATEGORIES:
        score = categories.get(key, {}).get("score")
        result["scores"][label] = None if score is None else round(score * 100)

    audits = payload.get("audits", {})
    for key, label in METRICS:
        audit = audits.get(key, {})
        result["metrics"][label] = {
            "display": audit.get("displayValue"),
            "numeric": audit.get("numericValue"),
        }

    return result


def fmt_delta(before: float, after: float, suffix: str = "") -> str:
    delta = after - before
    sign = "+" if delta > 0 else ""
    return f"{sign}{delta:.1f}{suffix}"


def print_report_summary(title: str, report: dict) -> None:
    print(f"\n{title}: {report['path']}")
    if report["runtime_error"]:
        print(f"  runtimeError: {report['runtime_error'].get('code')} - {report['runtime_error'].get('message')}")

    print("  Scores:")
    for label, value in report["scores"].items():
        v = "n/a" if value is None else str(value)
        print(f"    {label}: {v}")

    print("  Core metrics:")
    for label, data in report["metrics"].items():
        print(f"    {label}: {data.get('display') or 'n/a'}")


def compare(before: dict, after: dict) -> None:
    if before["runtime_error"] or after["runtime_error"]:
        print("\nComparison skipped: one of the reports has runtimeError.")
        return

    print("\nDelta (after - before):")
    print("  Scores:")
    for label in before["scores"]:
        b = before["scores"][label]
        a = after["scores"][label]
        if b is None or a is None:
            print(f"    {label}: n/a")
        else:
            print(f"    {label}: {fmt_delta(float(b), float(a), ' pts')}")

    print("  Metrics (negative is better for all except scores):")
    for label in before["metrics"]:
        b = before["metrics"][label]["numeric"]
        a = after["metrics"][label]["numeric"]
        if b is None or a is None:
            print(f"    {label}: n/a")
            continue

        suffix = ""
        if label in ("FCP", "LCP", "Speed Index", "TTI"):
            suffix = " ms"
        elif label == "TBT":
            suffix = " ms"
        elif label == "CLS":
            suffix = ""

        print(f"    {label}: {fmt_delta(float(b), float(a), suffix)}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Compare two Lighthouse HTML reports.")
    parser.add_argument("before", help="Path to baseline report HTML")
    parser.add_argument("after", help="Path to new report HTML")
    args = parser.parse_args()

    before = load_report(Path(args.before))
    after = load_report(Path(args.after))

    print_report_summary("Before", before)
    print_report_summary("After", after)
    compare(before, after)


if __name__ == "__main__":
    main()
