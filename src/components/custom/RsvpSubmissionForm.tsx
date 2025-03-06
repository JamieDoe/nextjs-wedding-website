"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import { useRef, useState } from "react";
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

import { Checkbox } from "../ui/checkbox";

import { rsvpSubmissionSchema } from "@/lib/formSchemas";
import { CheckedState } from "@radix-ui/react-checkbox";

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
  const [isAtReception, setIsAtReception] = useState<CheckedState>(false);

  const form = useForm<z.infer<typeof rsvpSubmissionSchema>>({
    resolver: zodResolver(rsvpSubmissionSchema),
    defaultValues: {
      ...initialState,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(data: z.infer<typeof rsvpSubmissionSchema>) {
    console.log(data);
    setLoading(true);
    setLoading(false);
    setError(null);
    setIsInvited(true);
    return form.reset();
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-screen-sm">
      <Form {...form}>
        <form
          ref={formRef}
          className="space-y-4 w-full font-lovelace"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="is_attending_ceremony"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        {...field}
                        value={field.value ? "true" : "false"}
                        onCheckedChange={(e) =>
                          field.onChange({ target: { value: e } })
                        }
                        className="hover:cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel className="text-lg pt-1 hover:cursor-pointer">
                      Will you be attending the Ceremony?
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_attending_reception"
              render={({ field }) => (
                <FormItem className="">
                  <div className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        {...field}
                        value={field.value ? "true" : "false"}
                        onCheckedChange={(e) => {
                          setIsAtReception(e);
                          field.onChange({ target: { value: e } });
                        }}
                        className="hover:cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel className="text-lg pt-1 hover:cursor-pointer">
                      Will you be attending the Reception?
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="meal_selection"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel
                  className={`text-lg ${!isAtReception && "text-muted-foreground"}`}
                >
                  Meal Selection
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={!isAtReception}
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
                <FormLabel
                  className={`text-lg ${!isAtReception && "text-muted-foreground"}`}
                >
                  Dietary Requirements
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={!isAtReception}
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
                <FormLabel
                  className={`text-lg ${!isAtReception && "text-muted-foreground"}`}
                >
                  Song Request
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={!isAtReception}
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
