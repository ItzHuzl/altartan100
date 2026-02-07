"use client";

import { useEffect, useState } from "react";

type UserData = {
  id: number;
  name: string;
  email: string;
  tokens: number;
  transactions: Array<{
    id: number;
    type: string;
    amount: number;
    description: string;
    createdAt: string;
  }>;
};

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then(setUser);
  }, []);

  if (!user) return <p>Уншиж байна...</p>;

  return (
    <section>
      <h2>{user.name}-ийн Dashboard</h2>
      <div className="card">
        <p>📧 {user.email}</p>
        <p>🪙 Токен: {user.tokens}</p>
      </div>

      <h3>Гүйлгээний түүх</h3>
      <div className="list">
        {user.transactions.map((tx) => (
          <div className="card" key={tx.id}>
            <p>
              <strong>{tx.type.toUpperCase()}</strong> · {tx.amount}
            </p>
            <p>{tx.description}</p>
            <small>{new Date(tx.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
