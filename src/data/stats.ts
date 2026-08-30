export interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

export const stats: Stat[] = [
  { label: "Clients Protected", value: 1, suffix: "+" },
  { label: "Projects Completed", value: 8, suffix: "+" },
  { label: "Security Experts", value: 2, suffix: "+" },
  { label: "Years of Experience", value: 3, suffix: "+" },
  { label: "Threats Prevented", value: 50, suffix: "+" },
];