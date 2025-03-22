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
import { Guest } from "@/types/Guest";

interface RsvpRegisterFormProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setIsInvited: React.Dispatch<React.SetStateAction<boolean | null>>;
  setRelatedGuests: React.Dispatch<React.SetStateAction<Guest[] | null>>;
  setGuest: React.Dispatch<React.SetStateAction<Guest | null>>;
}

const initialState: z.infer<typeof rsvpSchema> = {
  first_name: "",
  last_name: "",
};

export default function RsvpRegisterForm({
  loading,
  setLoading,
  setError,
  setIsInvited,
  setRelatedGuests,
  setGuest,
}: RsvpRegisterFormProps) {
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

    if (!response?.success || !response?.guest) {
      toast.error(response?.message);
      setError(response?.message ?? "An error occurred");
      setLoading(false);
      return;
    }

    setLoading(false);
    setError(null);
    setGuest(response.guest);
    setRelatedGuests(response.relatedGuests ?? []);
    setIsInvited(true);
    toast.success(response.message);
    return form.reset();
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <Form {...form}>
        <form
          ref={formRef}
          className="space-y-4 w-full font-lovelace"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-row space-x-4 items-start">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg">First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First name"
                      className="h-12"
                      {...field}
                    />
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
                    <Input
                      placeholder="Last name"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
