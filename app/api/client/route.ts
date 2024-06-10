import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserData from "@/app/utils/model/userModel";
import { dbConfig } from "@/app/utils/dbConfig";

export const POST = async (req: NextRequest) => {
  try {
    await dbConfig();

    const { name, email, password } = await req.json();
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const users = await UserData.create({
      name,
      email,
      password: hashed,
      role: "client",
    });

    return NextResponse.json({
      status: 202,
      data: users,
    });
  } catch (error) {
    return NextResponse.json({
      status: 404,
      error: error,
    });
  }
};
