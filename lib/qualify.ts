import type { LeadRequest, LeadRoute } from "@/lib/validation";

export type QualificationResult = {
  score: number;
  route: LeadRoute;
  reasons: string[];
};

export function qualifyLead(input: LeadRequest): QualificationResult {
  let score = 0;
  const reasons: string[] = [];

  switch (input.annualRevenue) {
    case "5m_20m":
    case "1m_5m":
      score += 30;
      reasons.push("Revenue sits inside the core ICP range.");
      break;
    case "20m_plus":
      score += 26;
      reasons.push("Revenue is above the published range and treated as a qualified exception.");
      break;
    case "250k_1m":
      score += 12;
      reasons.push("Revenue is below the core range and needs a senior review.");
      break;
    case "prefer_not":
      score += 8;
      reasons.push("Revenue was not disclosed.");
      break;
    default:
      reasons.push("Revenue is below the usual fit threshold.");
  }

  switch (input.averageCustomerValue) {
    case "5k_plus":
    case "1k_5k":
      score += 22;
      reasons.push("Average customer value is well above $500.");
      break;
    case "500_999":
      score += 20;
      reasons.push("Average customer value meets the $500+ bar.");
      break;
    case "250_499":
      score += 8;
      reasons.push("Average customer value is below $500.");
      break;
    default:
      reasons.push("Average customer value is well below the ICP.");
  }

  switch (input.locations) {
    case "1":
    case "2_5":
    case "6_10":
      score += 10;
      break;
    case "11_plus":
      score += 8;
      reasons.push("Location count is above the usual 1–10 range.");
      break;
  }

  if (input.industry === "fitness_sports" || input.industry === "health_wellness") {
    score += 6;
  } else if (input.industry === "other_appointment") {
    score += 3;
  }

  const demand =
    ["50_199", "200_499", "500_plus"].includes(input.leadsPerMonth) ||
    ["2k_10k", "10k_30k", "30k_plus"].includes(input.adSpendPerMonth);
  if (demand) {
    score += 15;
    reasons.push("Existing demand or media activity is present.");
  } else {
    score += 4;
    reasons.push("Current demand/media volume is light.");
  }

  switch (input.decisionAuthority) {
    case "yes":
      score += 15;
      break;
    case "shared":
      score += 8;
      reasons.push("Decision-making is shared.");
      break;
    case "no":
      reasons.push("Submitter does not have decision authority.");
      break;
  }

  switch (input.timeline) {
    case "now":
      score += 10;
      break;
    case "30_days":
      score += 9;
      break;
    case "90_days":
      score += 5;
      break;
    case "exploring":
      score += 2;
      break;
  }

  switch (input.investmentReadiness) {
    case "yes":
      score += 15;
      break;
    case "need_to_understand":
      score += 8;
      reasons.push("Investment readiness still needs a conversation.");
      break;
    case "not_now":
      reasons.push("Not ready to invest outside of media.");
      break;
  }

  const hardNo =
    input.decisionAuthority === "no" && input.investmentReadiness === "not_now";
  const tooSmall =
    input.annualRevenue === "under_250k" &&
    (input.averageCustomerValue === "under_250" ||
      input.averageCustomerValue === "250_499") &&
    !demand;

  let route: LeadRoute = "review";
  if (hardNo || tooSmall || score < 36) {
    route = "disqualified";
  } else if (
    score >= 70 &&
    input.decisionAuthority !== "no" &&
    input.investmentReadiness !== "not_now" &&
    input.annualRevenue !== "under_250k"
  ) {
    route = "qualified";
  }

  return { score, route, reasons };
}
