'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../../public/cypresslogo.svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/global/Loader';
import { actionLoginUser } from '@/lib/server-actions/auth-actions';

const LoginPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '', password: '' },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    const { error } = await actionLoginUser(formData);
    if (error) {
      form.reset();
      setSubmitError(error.message);
    }
    router.replace('/dashboard');
  };

  return (
    <form
      onChange={() => {
        if (submitError) setSubmitError('');
      }}
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
    >
      <Link
        href="/"
        className="
          w-full
          flex
          justify-left
          items-center"
      >
        <Image
          src={Logo}
          alt="cypress Logo"
          width={50}
          height={50}
        />
        <span
          className="font-semibold
          dark:text-white text-4xl first-letter:ml-2"
        >
          cypress.
        </span>
      </Link>
      <p className="text-foreground/60 text-sm">
        An all-In-One Collaboration and Productivity Platform
      </p>
      <div>
        <Input
          type="email"
          placeholder="Email"
          disabled={isLoading}
          {...form.register("email")}
        />
        {form.formState.errors.email?.message && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      <div>
        <Input
        
          type="password"
          placeholder="Password"
          disabled={isLoading}
          {...form.register("password")}
        />
        {form.formState.errors.password?.message && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>
      {submitError && (
        <p className="text-sm font-medium text-destructive">{submitError}</p>
      )}
      <Button
        type="submit"
        className="w-full p-6"
        size="lg"
        disabled={isLoading}
      >
        {!isLoading ? 'Login' : <Loader />}
      </Button>
      <span className="self-container">
        Dont have an account?{' '}
        <Link
          href="/signup"
          className="text-primary"
        >
          Sign Up
        </Link>
      </span>
    </form>
  );
};

export default LoginPage;
