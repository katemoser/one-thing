export type Task = {
  id: number;
  title: string;
  description: string;
  type: "CORE" | "PERSONAL"
}