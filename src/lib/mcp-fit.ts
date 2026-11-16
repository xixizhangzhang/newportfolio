export type FitRequest = "find" | "summary" | "review" | "compare" | "edit" | "receipts" | "details" | "stay" | "submit";
export const fullExpenseFields = ["date", "merchant", "category", "amount", "costCenter", "status", "receipt"] as const;
export const panelExpenseFields = ["merchant", "category", "date", "amount", "receipt"] as const;
export function expenseFields(count: number, surface: "chat" | "panel" = "chat") {
  if (surface === "panel") return panelExpenseFields;
  return count <= 3 ? fullExpenseFields : ["date", "amount"] as const;
}
export function fitRoute(count: number, issue = false, request: FitRequest = "summary", readyForSubmission = false) {
  const pane = issue || request === "submit" || readyForSubmission || ["review", "compare", "edit", "receipts", "details"].includes(request) || (count >= 8 && request !== "stay");
  return { pane, visibleCount: issue || count >= 8 ? 0 : Math.min(count, 5), more: !issue && count >= 6 && count <= 7 ? count - 5 : 0, offerPane: !pane && count >= 6, confirmationRequired: request === "submit" || readyForSubmission };
}