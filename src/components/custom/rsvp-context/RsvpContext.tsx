"use client";

import { createContext, useMemo, useState } from "react";

import { Guest } from "@/types/Guest";

interface RsvpContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isInvited: boolean | null;
  setIsInvited: (isInvited: boolean | null) => void;
  guest: Guest | null;
  setGuest: (guest: Guest | null) => void;
  relatedGuests: Guest[] | null;
  setRelatedGuests: (relatedGuests: Guest[] | null) => void;
  additionalGuests: Guest[];
  setAdditionalGuests: (additionalGuests: Guest[]) => void;
}

const RsvpContext = createContext<RsvpContextProps>({
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
  isInvited: null,
  setIsInvited: () => {},
  guest: null,
  setGuest: () => {},
  relatedGuests: null,
  setRelatedGuests: () => {},
  additionalGuests: [],
  setAdditionalGuests: () => {},
});

const RsvpContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInvited, setIsInvited] = useState<boolean | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [relatedGuests, setRelatedGuests] = useState<Guest[] | null>(null);
  const [additionalGuests, setAdditionalGuests] = useState<Guest[]>([]);

  const contextValue = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return (
    <RsvpContext.Provider value={contextValue}>{children}</RsvpContext.Provider>
  );
};

export { RsvpContext, RsvpContextProvider };
