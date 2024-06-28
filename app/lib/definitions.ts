export type Task = {
  id: number;
  title: string;
  description: string;
  type: "CORE" | "PERSONAL"
}

export type Assignment = {
  id: number;
  title: string;
  description: string | null;
  difficulty: number;
  numPostponements: number
}