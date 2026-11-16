export type AffectedProduct = { id: string; product: string; batch: string; customer: string; status: string };

// Fictional records for the portfolio prototype, not research or production data.
export const affectedProductBatches: AffectedProduct[][] = [
  [{ id: "FP-1042", product: "City bicycle", batch: "B-2401", customer: "Northstar Cycles", status: "Shipped" }, { id: "FP-1043", product: "City bicycle", batch: "B-2402", customer: "Northstar Cycles", status: "Shipped" }],
  [{ id: "FP-1051", product: "Touring bicycle", batch: "B-2403", customer: "Harbor Bikes", status: "Shipped" }, { id: "FP-1052", product: "Touring bicycle", batch: "B-2404", customer: "Harbor Bikes", status: "In stock" }],
  [{ id: "FP-1060", product: "City bicycle", batch: "B-2405", customer: "Ridgeway Retail", status: "Shipped" }, { id: "FP-1061", product: "Touring bicycle", batch: "B-2406", customer: "Not assigned", status: "In stock" }],
];

export function mergeAffectedProducts(current: AffectedProduct[], incoming: AffectedProduct[]) {
  return [...new Map([...current, ...incoming].map(item => [item.id, item])).values()];
}

export function affectedProductsCsv(items: AffectedProduct[]) {
  const cell = (value: string) => `"${value.replace(/"/g, '""')}"`;
  return ["Product ID,Product,Batch,Customer,Status", ...items.map(item => [item.id, item.product, item.batch, item.customer, item.status].map(cell).join(","))].join("\n");
}