import { NextResponse } from "next/server";
import { createUserSchema } from "@/lib/validation/userSchema";
import { UserController } from "@/lib/controllers/userController";

export async function POST(req: Request) {
  const body = await req.json();
  const result = createUserSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten() }, { status: 400 });
  }

  try {
    const user = await UserController.handleCreateUser(result.data);
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 409 });
  }
}

export async function GET() {
  const users = await UserController.handleGetAllUsers();
  return NextResponse.json(users);
}
