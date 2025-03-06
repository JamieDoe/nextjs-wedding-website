"use server";

import z from "zod";
import { Query } from "node-appwrite";
import { rsvpSchema } from "@/lib/formSchemas";

import createAdminClient from "@/lib/appwrite";
import { Guest } from "@/types/Guest";

interface CheckIfGuestIsAllowedResponse {
  success: boolean;
  message: string;
  guest?: Guest;
  relatedGuests?: Guest[];
}

export default async function checkIfGustIsAllowed(
  data: z.infer<typeof rsvpSchema>
): Promise<CheckIfGuestIsAllowedResponse> {
  const { first_name, last_name } = data;

  try {
    const { database } = await createAdminClient();
    const response = (await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_GUEST_COLLECTION_ID!,
      [
        Query.equal("first_name", first_name),
        Query.equal("last_name", last_name),
      ]
    )) as { documents: Guest[] };

    if (response.documents.length === 0) {
      return {
        success: false,
        message:
          "We couldn't find your name in our guest list. Please contact us for further assistance.",
      };
    }

    const relatedGuestIds = response.documents[0].related_guest_ids;
    let relatedGuests: Guest[] = [];

    if (relatedGuestIds.length > 0) {
      const relatedGuestResponse = relatedGuestIds.map((id) => {
        return database.getDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_GUEST_COLLECTION_ID!,
          id
        );
      });

      relatedGuests = (await Promise.all(relatedGuestResponse)) as Guest[];
    }

    const guest = response.documents[0];

    return {
      success: true,
      guest,
      relatedGuests,
      message: "Welcome to the party! 🎉",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  return {
    success: false,
    message: "An error occurred",
  };
}
