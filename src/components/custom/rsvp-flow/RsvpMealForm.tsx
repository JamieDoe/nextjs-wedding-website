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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { weddingInfo } from "@/data/wedding-info";

import { rsvpMealSchema } from "@/lib/formSchemas";
import { Guest } from "@/types/Guest";

interface RsvpRegisterFormProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setIsInvited: React.Dispatch<React.SetStateAction<boolean | null>>;
  setRelatedGuests: React.Dispatch<React.SetStateAction<Guest[] | null>>;
  setGuest: React.Dispatch<React.SetStateAction<Guest | null>>;
}

const initialState: z.infer<typeof rsvpMealSchema> = {
  starter: "",
  main: "",
  dessert: "",
  dietary_requirements: "",
};

export default function RsvpMealForm({
  loading,
  setLoading,
  setError,
  setIsInvited,
  setRelatedGuests,
  setGuest,
}: RsvpRegisterFormProps) {
  const form = useForm<z.infer<typeof rsvpMealSchema>>({
    resolver: zodResolver(rsvpMealSchema),
    defaultValues: {
      ...initialState,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(data: z.infer<typeof rsvpMealSchema>) {
    setLoading(true);
    // const response = await checkIfGustIsAllowed(data);

    // if (!response?.success || !response?.guest) {
    //   toast.error(response?.message);
    //   setError(response?.message ?? "An error occurred");
    //   setLoading(false);
    //   return;
    // }

    // setLoading(false);
    // setError(null);
    // setGuest(response.guest);
    // setRelatedGuests(response.relatedGuests ?? []);
    // setIsInvited(true);
    // toast.success(response.message);
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
          {weddingInfo.receptionInfo.weddingBreakfast.menu.map(
            ({ title, name, options }, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-2xl font-extralight">{title}</h3>
                <div className="flex flex-col gap-4">
                  {options.map((option) => (
                    <FormField
                      key={option}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2 space-y-0">
                            <FormControl>
                              <RadioGroup>
                                <RadioGroupItem value={option}>
                                  {option}
                                </RadioGroupItem>
                              </RadioGroup>
                            </FormControl>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            )
          )}

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

function RadioOption() {
  return (
    <RadioGroup>
      <RadioGroupItem value="option1">Option 1</RadioGroupItem>
      <RadioGroupItem value="option2">Option 2</RadioGroupItem>
      <RadioGroupItem value="option3">Option 3</RadioGroupItem>
    </RadioGroup>
  );
}
