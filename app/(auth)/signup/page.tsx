"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";

import { actionSignUpUser } from "@/lib/server-actions/auth-actions";

import Logo from "../../../public/cypresslogo.svg";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/Loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";
import clsx from "clsx";

const FormSchema = z
    .object({
        email: z.string().describe("Email").email({ message: "Invalid Email" }),
        password: z
            .string()
            .describe("Password")
            .min(6, "Password must be minimum of 6 characters"),
        confirmPassword: z
            .string()
            .describe("Confirm Password")
            .min(6, "Password must be minimum 6 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match.",
        path: ["confirmPassword"],
    });

const SignupPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const codeExchangeError = useMemo(() => {
        if (!searchParams) return "";
        return searchParams.get("error_description");
    }, [searchParams]);

    const [submitError, setSubmitError] = useState("");
    const [confirmation] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "onChange",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const confirmationAndErrorStyles = useMemo(
        () =>
            clsx("bg-primary", {
                "bg-red-500/10": codeExchangeError,
                "border-red-500/50": codeExchangeError,
                "text-red-700": codeExchangeError,
            }),
        [codeExchangeError],
    );

    const isLoading = form.formState.isSubmitting;

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
        formData,
    ) => {
        const { error } = await actionSignUpUser(formData);

        if (error) {
            form.reset();
            setSubmitError(error.message);
            return;
        }

        router.replace("/login");
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

                {/* Confirm Password */}
                <div className="space-y-2">
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        disabled={isLoading}
                        {...form.register("confirmPassword")}
                    />

                    {form.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Server Error */}
                {submitError && (
                    <p className="text-sm text-destructive">{submitError}</p>
                )}

                {/* Sign Up Button */}

                {!confirmation && !codeExchangeError && (
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="w-full h-12"
                    >
                        {isLoading ? <Loader /> : "Create Account"}
                    </Button>
                )}

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-primary transition-colors hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {(confirmation || codeExchangeError) && (
                    <Alert className={confirmationAndErrorStyles}>
                        {!codeExchangeError && (
                            <MailCheck className="h-4 w-4" />
                        )}
                        <AlertTitle>
                            {codeExchangeError
                                ? "Invalid Link"
                                : "Check your mail"}
                        </AlertTitle>
                        <AlertDescription>{codeExchangeError || 'An email confirmation has been sent.'}</AlertDescription>
                    </Alert>
                )}
            </form>
        </div>
    );
};

export default SignupPage;
