import { NextRequest, NextResponse } from "next/server";
import { dbConfig } from "@/app/utils/dbConfig";
import UserData from "@/app/utils/model/userModel";

export const GET = async (req: NextRequest, params: any) => {
  try {
    const { id }: any = params.params;
    await dbConfig();

    const users = await UserData.findById(id);

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

export const PATCH = async (req: NextRequest, params: any) => {
  try {
    const { name } = await req.json();
    const { id }: any = params.params;

    await dbConfig();

    const users = await UserData.findByIdAndUpdate(id, { name }, { new: true });

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
