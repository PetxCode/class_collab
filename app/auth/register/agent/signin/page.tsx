"use client";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

const page = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const onToggle = () => {
    setToggle(!toggle);
  };

  const formSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;

    console.log(email, password);

    signIn("credentials", { email, password });
  });

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="border rounded-md w-[500px] min-h-[300px] p-4">
        <form onSubmit={onSubmit} className="flex flex-col">
          <div className="flex flex-col mb-3">
            <label className="text-[12px] font-bold">Email</label>
            <input
              className="w-full h-[45px] border rounded-md px-2 outline-none mt-1"
              type="email"
              placeholder="Enter your Email"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="text-[12px] font-bold">Password</label>
            <div className="w-full border h-[45px] rounded-md flex justify-between items-center pr-2">
              {!toggle ? (
                <div className="flex w-full items-center justify-between">
                  <input
                    className="ml-2 w-[90%] h-[96%] outline-none "
                    type="password"
                    placeholder="Enter your Password"
                    {...register("password")}
                  />

                  <div className="opacity-70 cursor-pointer" onClick={onToggle}>
                    <MdVisibility />
                  </div>
                </div>
              ) : (
                <div className="flex w-full items-center justify-between">
                  <input
                    className="ml-2 w-[90%] h-[96%] outline-none "
                    type="text"
                    placeholder="Enter your Password"
                    {...register("password")}
                  />

                  <div className="opacity-70 cursor-pointer" onClick={onToggle}>
                    <MdVisibilityOff />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`w-full h-[50px] border rounded-md flex justify-center items-center mt-5  bg-blue-500 text-white`}
            >
              Register Agent
            </button>
          </div>
        </form>
        <br />
        <div>
          Don't have an Account,{" "}
          <Link href="/auth/register/agent" className="font-semibold">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
