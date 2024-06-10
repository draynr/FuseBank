"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "../../../lib/utils";
import FormInput from "./FormInput";
import { Loader2 } from "lucide-react";


const AuthForm = ({ type }: AuthProps) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);


  const form = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  });

  const onSubmit = async(data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "register") {
        const userStruct = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }
        const newUserStruct = await register(userStruct);
        setUser(newUserStruct);
      }
      else if (type == "login") {
        const loginInfo = {
          email: data.email,
          password: data.password,
        }
        const response = login(loginInfo);
        if (response) {
          router.push('/')
        }
      }
    }
    catch(e) {
        console.log(e)
    }
    finally {
      setIsLoading(false);
    }

  }
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8 px-8">
        <Link
          href="/"
          className="flex  cursor-pointer items-center gap-3"
        >
          <Image
            alt="Logo"
            width={42}
            height={42}
            src="/icons/logo.svg"
          />
          <h1 className="text-white text-[28px] font-bold">
            fuse
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-[24px] lg:text-[36px] font-semibold text-white">
            {user
              ? "Link Account"
              : type === "login"
              ? "Login"
              : "Register"}
            <p className="text-[16px] text-white font-normal">
              {user
                ? "Link account"
                : "Enter your account details."}{" "}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {/*Plaid*/}
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="text-white space-y-8"
          >
            {type === "register" && (
              <>
                <div className="text-white flex gap-4">
                  <FormInput
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name."
                  />
                  <FormInput
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name."
                  />
                </div>
                {/* <FormInput
                  control={form.control}
                  name="primaryAddress"
                  label="Address"
                  placeholder="Enter your primary address."
                />
                <FormInput
                  control={form.control}
                  name="city"
                  label="City"
                  placeholder="Enter your city."
                />
                <div className="flex gap-4">
                  <FormInput
                    control={form.control}
                    name="state"
                    label="State"
                    placeholder="Enter your state."
                  />
                  <FormInput
                    control={form.control}
                    name="zipCode"
                    label="Zip Code"
                    placeholder="Enter your zip code."
                  />
                </div> */}
              </>
            )}
            <FormInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email."
            />
            <FormInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password."
            />
            <FormInput
              control={form.control}
              name="password"
              label="Confirm Password"
              placeholder="Confirm your password."
            />
            <div className="flex flex-col gap-4">

              <Button type="submit" disabled={isLoading} className="form-button">
                {isLoading ? (
                  <>
                  <Loader2 size={} className="animation-spin" />
                  Loading...
                  </>


                )}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )}
    </section>
  );
};

export default AuthForm;
