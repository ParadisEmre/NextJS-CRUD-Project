import { NextResponse } from "next/server";
import User from "../../models/User";


export async function GET() {
  try {
    console.log("GET request received");
    const users = await User.find();
    console.log("Users found:", users);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, role } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    const newUser = new User({ name, email, role });
    const savedUser = await newUser.save();
    return NextResponse.json(savedUser, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
