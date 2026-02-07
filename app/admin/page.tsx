"use client";

import { useState } from "react";

const initialState = { name: "", category: "", description: "", emoji: "⭐" };

export default function AdminPage() {
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/people", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setMessage("✅ Хүн амжилттай нэмэгдлээ");
      setForm(initialState);
    } else {
      const data = await res.json();
      setMessage(`❌ ${data.message}`);
    }
  };

  return (
    <section className="card detail">
      <h2>Админ панел</h2>
      <p>Шинэ алдартай хүн нэмэх</p>
      <form onSubmit={submit} className="form">
        <input
          placeholder="Нэр"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Ангилал"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <textarea
          placeholder="Тайлбар"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Emoji"
          value={form.emoji}
          onChange={(e) => setForm({ ...form, emoji: e.target.value })}
        />
        <button type="submit">Нэмэх</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
}
