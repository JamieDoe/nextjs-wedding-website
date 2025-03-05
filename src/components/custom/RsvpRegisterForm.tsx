"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRef } from "react";
import { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  FormMessage,
} from "@/components";

import { checkIfGustIsAllowed } from "@/app/actions";
import { rsvpSchema } from "@/lib/formSchemas";

const initialState: z.infer<typeof rsvpSchema> = {
  first_name: "",
  last_name: "",
};

export default function RsvpRegisterForm({
  loading,
  setLoading,
  setError,
  setIsInvited,
  setGuest,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsInvited: (isInvited: boolean) => void;
  setGuest: (guest: any) => void;
}) {
  const form = useForm<z.infer<typeof rsvpSchema>>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      ...initialState,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(data: z.infer<typeof rsvpSchema>) {
    setLoading(true);
    const response = await checkIfGustIsAllowed(data);

    if (!response?.success) {
      toast.error(response?.message);
      setError(response?.message ?? "An error occurred");
      setLoading(false);
      return;
    }

    setLoading(false);
    setError(null);
    setIsInvited(true);
    toast.success(response.message);
    return form.reset();
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">
      <Form {...form}>
        <form
          ref={formRef}
          className="space-y-4 w-full font-lovelace"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="w-full h-12 text-[16px] hover:cursor-pointer"
          >
            {loading ? "Loading..." : "That's me!"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
