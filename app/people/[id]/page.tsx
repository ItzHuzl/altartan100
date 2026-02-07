"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Person = {
  id: number;
  name: string;
  category: string;
  description: string;
  emoji: string;
  totalBoosts: number;
};

export default function PersonDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [people, setPeople] = useState<Person[]>([]);
  const [amount, setAmount] = useState(10);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/people")
      .then((r) => r.json())
      .then(setPeople);
  }, []);

  const person = useMemo(() => people.find((p) => p.id === Number(params.id)), [params.id, people]);

  if (!person) return <p>Хүн олдсонгүй.</p>;

  const submitBoost = async () => {
    const res = await fetch("/api/boost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 1, personId: person.id, amount })
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus(`❌ ${data.message}`);
      return;
    }
    setStatus(`✅ Амжилттай! ${person.name} ${amount} boost авлаа.`);
    router.refresh();
  };

  return (
    <section className="detail card">
      <h2>
        {person.emoji} {person.name}
      </h2>
      <p>{person.description}</p>
      <div className="stats">
        <span>Ангилал: {person.category}</span>
        <span>Нийт boost: {person.totalBoosts}</span>
      </div>
      <label>Boost хэмжээ</label>
      <input type="number" min={1} value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      <button onClick={submitBoost}>Boost өгөх</button>
      {status && <p>{status}</p>}
    </section>
  );
}
