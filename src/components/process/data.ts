export interface Process {
  id: string;
  step: string;
  title: string;
  description: string;
}

export const processes: Process[] = [
  {
    id: "1",
    step: "01",
    title: "Discovery",
    description:
      "Understanding your business goals, requirements, and target audience.",
  },
  {
    id: "2",
    step: "02",
    title: "Design",
    description:
      "Creating user-centered designs and technical architecture plans.",
  },
  {
    id: "3",
    step: "03",
    title: "Development",
    description:
      "Building robust, scalable solutions using modern technologies.",
  },
  {
    id: "4",
    step: "04",
    title: "Delivery",
    description: "Testing, deployment, and ongoing support for your success.",
  },
];
