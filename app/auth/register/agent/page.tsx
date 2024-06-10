"use client";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const page = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  const onToggle = () => {
    setToggle(!toggle);
  };

  const formSchema = yup.object({
    name: yup.string().required("showe"),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirm: yup.string().oneOf([yup.ref("password")], "Passwords don't match"),
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
    console.log(data);
  });

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="border rounded-md w-[500px] min-h-[300px] p-4">
        <form onSubmit={onSubmit} className="flex flex-col">
          <div className="flex flex-col mb-3">
            <label className="text-[12px] font-bold">Name</label>
            <input
              className="w-full h-[45px] border rounded-md px-2 outline-none mt-1"
              type="text"
              placeholder="Enter your Name"
              {...register("name")}
            />
          </div>
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

          <div className="flex flex-col mb-3">
            <label className="text-[12px] font-bold">Confirm Password</label>
            <div className="w-full border h-[45px] rounded-md flex justify-between items-center pr-2">
              {!toggle ? (
                <div className="flex w-full items-center justify-between">
                  <input
                    className="ml-2 w-[90%] h-[96%] outline-none "
                    type="password"
                    placeholder="Enter your Confirm Password"
                    {...register("confirm")}
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
                    placeholder="Enter your Confirm Password"
                    {...register("confirm")}
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
              className={`w-full h-[50px] border rounded-md flex justify-center items-center mt-5 ${
                errors.name && errors.email && errors.password && errors.confirm
                  ? "bg-blue-950"
                  : "bg-red-500"
              } 
                text-white`}
            >
              Register Agent
            </button>
          </div>
        </form>
        <br />
        <div className="mt-10 ">
          Already have an Account,{" "}
          <Link href="/auth/register/agent/signin" className="font-semibold">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
