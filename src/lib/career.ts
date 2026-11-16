export const careerStops = [
  { at: 0, city: "Silicon Valley", location: "Mountain View, California · USA", period: "2025 — Present", company: "Microsoft", role: "Senior UX Designer", detail: "Cross-functional design leadership · AI adoption", scenery: "valley" },
  { at: 0.25, city: "Shanghai", location: "Shanghai · China", period: "2021 — 2025", company: "Microsoft", role: "Senior UX Designer", detail: "ERP products", scenery: "shanghai" },
  { at: 0.5, city: "Shanghai", location: "Shanghai · China", period: "2020 — 2021", company: "Alibaba", role: "Interaction Design Expert", detail: "ele.me · Mobile and desktop experiences", scenery: "shanghai" },
  { at: 0.75, city: "New York", location: "New York · USA", period: "2018 — 2020", company: "GroupM", role: "UX Designer", detail: "Data management · Advertising platforms", scenery: "newyork" },
  { at: 1, city: "New York", location: "New York · USA", period: "2018", company: "Jop", role: "UX Designer", detail: "On-demand service · Mobile app", scenery: "newyork" },
] as const;

export function careerIndex(progress: number) {
  return careerStops.reduce((index, stop, i) => progress >= stop.at ? i : index, 0);
}