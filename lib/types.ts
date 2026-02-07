export type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  tokens: number;
};

export type Person = {
  id: number;
  name: string;
  category: string;
  description: string;
  emoji: string;
  totalBoosts: number;
  supporters: number;
};

export type TransactionType = "boost" | "purchase" | "refund";

export type Transaction = {
  id: number;
  userId: number;
  personId?: number;
  type: TransactionType;
  amount: number;
  description: string;
  createdAt: string;
};
