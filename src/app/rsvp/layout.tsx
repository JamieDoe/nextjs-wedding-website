import { RsvpContextProvider } from "@/components/custom/rsvp-context/RsvpContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <RsvpContextProvider>
        <main>{children}</main>
      </RsvpContextProvider>
    </body>
  );
}
