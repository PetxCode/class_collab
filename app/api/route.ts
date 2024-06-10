import { NextResponse } from "next/server";
import { dbConfig } from "../utils/dbConfig";
import UserData from "../utils/model/userModel";

export const GET = async () => {
  try {
    await dbConfig();
    const users = await UserData.find();

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
