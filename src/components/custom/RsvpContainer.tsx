"use client";

import { siteInfo } from "@/data/site-info";
import { Guest } from "@/types/Guest";

import RsvpRegisterForm from "./RsvpRegisterForm";
import RsvpSubmissionForm from "./RsvpSubmissionForm";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";

import useRsvpContext from "./rsvp-context/useRsvpContext";
import RsvpMealForm from "./rsvp-flow/RsvpMealForm";

export default function RsvpContainer() {
  const {
    loading,
    setLoading,
    error,
    setError,
    isInvited,
    setIsInvited,
    guest,
    setGuest,
    relatedGuests,
    setRelatedGuests,
    additionalGuests,
    setAdditionalGuests,
  } = useRsvpContext();

  const weddingDate = new Date(siteInfo.rsvp.hero.date)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    })
    .replace("PM", "pm");

  console.log(additionalGuests);

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
            {relatedGuests && (
              <RelatedGuests
                guests={relatedGuests}
                additionalGuests={additionalGuests}
                setAdditionalGuests={setAdditionalGuests}
              />
            )}
            <Separator />
            <RsvpSubmissionForm
              loading={loading}
              setLoading={setLoading}
              setError={setError}
              setIsInvited={setIsInvited}
            />
            <RsvpMealForm />
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

function RelatedGuests({
  guests,
  setAdditionalGuests,
}: {
  guests: Guest[];
  additionalGuests: Guest[];
  setAdditionalGuests: React.Dispatch<React.SetStateAction<Guest[]>>;
}) {
  return (
    <div className="flex flex-col gap-8 w-full">
      <h2 className="text-2xl font-extralight">
        RSVP for the following guests?
      </h2>
      <div className="flex flex-col gap-4 w-full">
        {guests.map((guest) => (
          <div key={guest.$id} className="flex gap-4 items-center">
            <Checkbox
              onCheckedChange={(checked) => {
                if (checked) {
                  setAdditionalGuests((prev) => [...prev, guest]);
                } else {
                  setAdditionalGuests((prev) =>
                    prev.filter((g) => g.$id !== guest.$id)
                  );
                }
              }}
            />
            <h3 className="text-xl pt-1">
              {guest.first_name} {guest.last_name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
