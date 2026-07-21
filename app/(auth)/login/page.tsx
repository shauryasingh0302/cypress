"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";

import { FormSchema } from "@/lib/types";
import { actionLoginUser } from "@/lib/server-actions/auth-actions";

import Logo from "../../../public/cypresslogo.svg";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/Loader";

const LoginPage = () => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState("");

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "onChange",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
        formData,
    ) => {
        const { error } = await actionLoginUser(formData);

        if (error) {
            form.reset();
            setSubmitError(error.message);
            return;
        }

        router.replace("/dashboard");
    };

    return (
        <div className="w-full flex justify-center items-center min-h-screen px-4">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                onChange={() => submitError && setSubmitError("")}
                className="w-full max-w-[420px] flex flex-col gap-6"
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 w-fit">
                    <Image
                        src={Logo}
                        alt="Cypress Logo"
                        width={50}
                        height={50}
                        priority
                    />

                    <span className="text-3xl sm:text-4xl font-semibold tracking-tight dark:text-white">
                        cypress.
                    </span>
                </Link>

                {/* Description */}
                <div className="space-y-2">
                    <p className="text-sm leading-6 text-muted-foreground">
                        An all-in-one collaboration and productivity platform.
                    </p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Input
                        type="email"
                        placeholder="Email"
                        disabled={isLoading}
                        {...form.register("email")}
                    />

                    {form.formState.errors.email && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Input
                        type="password"
                        placeholder="Password"
                        disabled={isLoading}
                        {...form.register("password")}
                    />

                    {form.formState.errors.password && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>

                {/* Server Error */}
                {submitError && (
                    <p className="text-sm text-destructive">{submitError}</p>
                )}

                {/* Login Button */}
                <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full h-12"
                >
                    {isLoading ? <Loader /> : "Login"}
                </Button>

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground">
                    Don&rsquo;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-medium text-primary transition-colors hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
