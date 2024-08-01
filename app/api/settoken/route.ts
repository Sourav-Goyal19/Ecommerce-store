import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { token } = body;

  if (!token) {
    return NextResponse.json(
      { msg: "Token must be provided" },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ msg: "Token Set" }, { status: 200 });

  response.cookies.set("token", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return response;
};
