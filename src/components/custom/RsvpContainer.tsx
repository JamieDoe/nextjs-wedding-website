"use client";

import { useState } from "react";

import { siteInfo } from "@/data/site-info";
import { Guest } from "@/types/Guest";

import RsvpRegisterForm from "./RsvpRegisterForm";
import RsvpSubmissionForm from "./RsvpSubmissionForm";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";

interface RelatedGuestProps {
  guests: [
    {
      is_rsvping: boolean;
      guest: Guest;
    },
  ];
}

export default function RsvpContainer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInvited, setIsInvited] = useState<boolean | null>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [guest, setGuest] = useState<Guest | null>(null);
  const [relatedGuests, setRelatedGuests] = useState<RelatedGuestProps | null>(
    null
  );

  const weddingDate = new Date(siteInfo.rsvp.hero.date)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    })
    .replace("PM", "pm");

  return (
    <div className="flex flex-col items-center gap-8 w-full font-lovelace pt-8">
      <div className="flex flex-col items-center gap-8">
        {isInvited ? (
          <h1 className="text-5xl font-extralight text-center pb-8">
            RSVP for {guest?.first_name} {guest?.last_name} 🎉
          </h1>
        ) : (
          <>
            <h1 className="text-5xl font-extralight text-center">
              {siteInfo.rsvp.hero.title}
            </h1>
            <div className="flex flex-col items-center gap-8">
              <p className="text-4xl">{weddingDate}</p>
              <div className="flex items-center gap-2 text-2xl">
                <p>{siteInfo.rsvp.hero.venue}</p>
              </div>
            </div>
          </>
        )}
      </div>
      {error && (
        <div className="text-red-500 text-center max-w-md text-xl">
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-col items-center gap-8 max-w-screen-sm w-full">
        {isInvited && guest ? (
          <>
            {relatedGuests && <RelatedGuests guests={relatedGuests} />}
            <Separator />
            <RsvpSubmissionForm
              loading={loading}
              setLoading={setLoading}
              setError={setError}
              setIsInvited={setIsInvited}
            />
          </>
        ) : (
          <RsvpRegisterForm
            loading={loading}
            setLoading={setLoading}
            setError={setError}
            setIsInvited={setIsInvited}
            setRelatedGuests={setRelatedGuests}
            setGuest={setGuest}
          />
        )}
      </div>
    </div>
  );
}

function RelatedGuests({ guests }: RelatedGuestProps) {
  return (
    <div className="flex flex-col gap-8 w-full">
      <h2 className="text-2xl font-extralight">
        RSVP for the following guests?
      </h2>
      <div className="flex flex-col gap-4 w-full">
        {guests.map((guest) => (
          <div key={guest.$id} className="flex gap-4">
            <Checkbox />
            <h3 className="text-xl">
              {guest.first_name} {guest.last_name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
