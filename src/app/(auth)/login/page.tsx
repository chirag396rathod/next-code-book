import React from "react";
import { Metadata } from "next";
import LoginForm from "./LoginForm";
import Link from "next/link";
import Image from "next/image";
import SignUpImage from "@/assets/signup-image.jpg";

export const metadata: Metadata = {
  title: "Loading",
};

const Login = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="text-center text-3xl font-bold">
            Login to codebook
          </div>
          <div className="space-y-5">
            <LoginForm />

            <Link
              href={"/sign-up"}
              className="block text-center hover:underline"
            >
              Don't have an account? <span className="font-bold">Sign Up</span>
            </Link>
          </div>
        </div>
        <Image
          src={SignUpImage}
          alt="sign up image"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
};

export default Login;
