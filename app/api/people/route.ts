import { NextResponse } from "next/server";
import { db, getTopPeople } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getTopPeople());
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, category, description, emoji } = body;

  if (!name || !category || !description || !emoji) {
    return NextResponse.json({ message: "Мэдээлэл дутуу байна" }, { status: 400 });
  }

  const person = {
    id: db.people.length + 1,
    name,
    category,
    description,
    emoji,
    totalBoosts: 0,
    supporters: 0
  };

  db.people.push(person);
  return NextResponse.json(person, { status: 201 });
}
