import Link from "next/link";
import { getTopPeople } from "@/lib/store";

const medals = ["🥇", "🥈", "🥉"];

export default function HomePage() {
  const people = getTopPeople();

  return (
    <section>
      <h2>Топ хүмүүсийн рейтинг</h2>
      <p className="subtitle">Boost өгөөд дуртай хүнээ дэмжээрэй.</p>
      <div className="grid">
        {people.map((person, index) => (
          <Link href={`/people/${person.id}`} key={person.id} className="card">
            <div className="row">
              <span className="emoji">{person.emoji}</span>
              <span className="medal">{medals[index] ?? `#${index + 1}`}</span>
            </div>
            <h3>{person.name}</h3>
            <p>{person.category}</p>
            <p className="desc">{person.description}</p>
            <div className="stats">
              <span>🔥 {person.totalBoosts}</span>
              <span>👥 {person.supporters}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
