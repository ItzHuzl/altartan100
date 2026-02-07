import { NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET() {
  const user = db.users[0];
  const transactions = db.transactions.filter((tx) => tx.userId === user.id);

  return NextResponse.json({
    ...user,
    transactions
  });
}
