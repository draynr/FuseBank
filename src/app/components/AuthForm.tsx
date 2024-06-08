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

const formSchema = z.object({
  email: z.string().email(),
});

const AuthForm = ({ type }: AuthProps) => {
  const [user, setUser] = useState(null);

  const form = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(
    values: z.infer<typeof formSchema>
  ) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">
                      Email
                    </FormLabel>
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input
                          className="input-class"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2"></FormMessage>
                    </div>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">
                      Password
                    </FormLabel>
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input
                          className="input-class"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2"></FormMessage>
                    </div>
                  </div>
                )}
              />
              <Button type="submit">
                Submit
              </Button>
            </form>
          </Form>
        )}
      </header>
    </section>
  );
};

export default AuthForm;
