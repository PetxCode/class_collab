import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConfig } from "@/app/utils/dbConfig";
import UserData from "@/app/utils/model/userModel";

export const POST = async (req: NextRequest) => {
  try {
    await dbConfig();

    const { email, password } = await req.json();

    const users = await UserData.findOne({ email });

    if (users) {
      const checkPassword = await bcrypt.compare(password, users.password);

      if (checkPassword) {
        return NextResponse.json({
          status: 201,
          data: users,
        });
      } else {
        return NextResponse.json({
          status: 404,
          message: "password is incorrect",
        });
      }
    } else {
      return NextResponse.json({
        status: 404,
        message: "Email does not exit",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 404,
      error: error,
    });
  }
};
