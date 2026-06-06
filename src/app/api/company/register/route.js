import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    // Minimal validation
    if (!data.companyName || !data.category) {
      return NextResponse.json(
        { error: "companyName and category are required" },
        { status: 400 },
      );
    }

    // TODO: persist company to DB
    console.log("New company registered:", data);

    return NextResponse.json(
      { message: "Company registered", company: data },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid request" }, { status: 500 });
  }
}
