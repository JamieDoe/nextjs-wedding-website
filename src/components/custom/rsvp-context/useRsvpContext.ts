"use client";

import { useContext } from "react";

import { RsvpContext } from "./RsvpContext";

export default function useRsvpContext() {
  const context = useContext(RsvpContext);

  if (!context) {
    throw new Error("useRsvpContext must be used within a RsvpContextProvider");
  }
  return context;
}
