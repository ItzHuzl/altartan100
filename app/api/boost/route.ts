import { NextResponse } from "next/server";
import { boostPerson } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = Number(body.userId ?? 1);
    const personId = Number(body.personId);
    const amount = Number(body.amount);

    if (!personId || !amount) {
      return NextResponse.json({ message: "personId болон amount шаардлагатай" }, { status: 400 });
    }

    const result = boostPerson(userId, personId, amount);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Алдаа гарлаа";
    return NextResponse.json({ message }, { status: 400 });
  }
}
