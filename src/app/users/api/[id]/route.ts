import { NextResponse } from "next/server";
import User from "../../../models/User";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log(params);
    const body = await req.json();
    const { name, email, role } = body;

    if (!name || !email || !role) {
      return NextResponse.json(
        { success: false, error: "All fields (name, email, role) are required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      { name, email, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}



export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
  ) {

  
    try {
      const deletedUser = await User.findByIdAndDelete(params.id);

      if (!deletedUser) {
        return NextResponse.json(
          { success: false, error: "User not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, message: "User successfully deleted" },
        { status: 200 }
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return NextResponse.json(
        { success: false, error: message },
        { status: 500 }
      );
    }
  }
