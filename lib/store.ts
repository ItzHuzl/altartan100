import { Person, Transaction, User } from "./types";

const users: User[] = [
  { id: 1, email: "bat@example.com", name: "Бат", password: "demo123", tokens: 120 }
];

const people: Person[] = [
  {
    id: 1,
    name: "Д.Болд",
    category: "Дуучин",
    description: "Монголын поп урлагийн төлөөлөгч, олон хит дууны эзэн.",
    emoji: "🎤",
    totalBoosts: 90,
    supporters: 34
  },
  {
    id: 2,
    name: "Хакүхо М.Даваажаргал",
    category: "Спорт",
    description: "Мэргэжлийн сүмогийн их аварга, Монголын бахархал.",
    emoji: "🥇",
    totalBoosts: 120,
    supporters: 48
  },
  {
    id: 3,
    name: "Чингис хаан",
    category: "Түүх",
    description: "Монголын эзэнт гүрнийг байгуулсан дэлхийн түүхэн хүн.",
    emoji: "🏇",
    totalBoosts: 70,
    supporters: 29
  },
  {
    id: 4,
    name: "Ариунаа",
    category: "Дуучин",
    description: "Орчин үеийн хөгжмийн тайзнаа олон жил манлайлсан уран бүтээлч.",
    emoji: "🌟",
    totalBoosts: 65,
    supporters: 27
  }
];

const transactions: Transaction[] = [
  {
    id: 1,
    userId: 1,
    type: "purchase",
    amount: 200,
    description: "Эхний токен худалдан авалт",
    createdAt: new Date().toISOString()
  }
];

export const db = {
  users,
  people,
  transactions
};

export function getTopPeople() {
  return [...db.people].sort((a, b) => b.totalBoosts - a.totalBoosts);
}

export function boostPerson(userId: number, personId: number, amount: number) {
  const user = db.users.find((u) => u.id === userId);
  const person = db.people.find((p) => p.id === personId);

  if (!user || !person) {
    throw new Error("Хэрэглэгч эсвэл хүн олдсонгүй");
  }

  if (amount <= 0) {
    throw new Error("Boost хэмжээ буруу байна");
  }

  if (user.tokens < amount) {
    throw new Error("Токен хүрэлцэхгүй байна");
  }

  user.tokens -= amount;
  person.totalBoosts += amount;
  person.supporters += 1;

  const tx: Transaction = {
    id: db.transactions.length + 1,
    userId,
    personId,
    type: "boost",
    amount,
    description: `${person.name} рүү ${amount} boost өглөө`,
    createdAt: new Date().toISOString()
  };

  db.transactions.unshift(tx);

  return { user, person, transaction: tx, ranking: getTopPeople() };
}
