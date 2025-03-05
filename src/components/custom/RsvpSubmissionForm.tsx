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

// import { checkIfGustIsAllowed } from "@/app/actions";
import { rsvpSubmissionSchema } from "@/lib/formSchemas";

const initialState: z.infer<typeof rsvpSubmissionSchema> = {
  is_attending_ceremony: false,
  is_attending_reception: false,
  meal_selection: "",
  dietary_requirements: "",
  song_request: "",
  special_notes: "",
};

export default function RsvpSubmissionForm({
  loading,
  setLoading,
  setError,
  setIsInvited,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsInvited: (isInvited: boolean) => void;
}) {
  const form = useForm<z.infer<typeof rsvpSubmissionSchema>>({
    resolver: zodResolver(rsvpSubmissionSchema),
    defaultValues: {
      ...initialState,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(data: z.infer<typeof rsvpSubmissionSchema>) {
    setLoading(true);
    // const response = await checkIfGustIsAllowed(data);

    // if (!response?.success) {
    //   toast.error(response?.message);
    //   setError(response?.message ?? "An error occurred");
    //   setLoading(false);
    //   return;
    // }

    setLoading(false);
    setError(null);
    setIsInvited(true);
    // toast.success(response.message);
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
            name="is_attending_ceremony"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">
                  Will you be attending the Ceremony?
                </FormLabel>
                <FormControl>
                  <Input type="checkbox" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_attending_reception"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">
                  Will you be attending the Reception?
                </FormLabel>
                <FormControl>
                  <Input type="checkbox" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meal_selection"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">Meal Selection</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Meal selection"
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
            name="dietary_requirements"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">Dietary Requirements</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Dietary requirements"
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
            name="song_request"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">Song Request</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Song request"
                    className="h-12"
                    {...field}
                  />
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
