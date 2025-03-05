"use client";

import { useState } from "react";

import { siteInfo } from "@/data/site-info";

import Image from "next/image";

import RsvpRegisterForm from "./RsvpRegisterForm";
import RsvpSubmissionForm from "./RsvpSubmissionForm";

interface guest {}

export default function RsvpContainer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInvited, setIsInvited] = useState<boolean | null>(null);
  const [guest, setGuest] = useState<any | null>(null);

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
        <h1 className="text-5xl font-extralight flex items-center gap-5">
          {isInvited ? (
            <>
              RSVPing for {guest?.first_name} {guest?.last_name}
            </>
          ) : (
            <>{siteInfo.rsvp.hero.title}</>
          )}
        </h1>
        <div className="flex flex-col items-center gap-8">
          <p className="text-4xl">{weddingDate}</p>
          <div className="flex items-center gap-2 text-2xl">
            <p>{siteInfo.rsvp.hero.venue}</p>
          </div>
        </div>
      </div>
      <Image
        {...siteInfo.rsvp.hero.dividerImage}
        alt=""
        className="max-h-36 max-w-sm object-cover opacity-90"
      />
      {error && (
        <p className="text-center text-xl text-destructive">
          <strong>Error:</strong> {error}
        </p>
      )}
      <p className="text-center">
        {isInvited === null
          ? "We are so excited to celebrate with you! Please fill out the form below to RSVP."
          : isInvited === false
            ? "We're sorry, but we couldn't find your invitation. Please contact us if you believe this is an error."
            : "Welcome to the party! 🎉"}
      </p>
      {isInvited ? (
        <RsvpSubmissionForm
          loading={loading}
          setLoading={setLoading}
          setError={setError}
          setIsInvited={setIsInvited}
        />
      ) : (
        <RsvpRegisterForm
          loading={loading}
          setLoading={setLoading}
          setError={setError}
          setIsInvited={setIsInvited}
          setGuest={setGuest}
        />
      )}
    </div>
  );
}
