"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  buttonVariants,
} from "@/components";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NavBar() {
  return (
    <header className="fixed w-full top-0 z-50 pt-2">
      <nav className="flex justify-between md:grid md:grid-cols-2 items-center gap-2 p-4 max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="font-lovelace text-4xl text-white text-nowrap"
        >
          J & V
        </Link>

        <div className="flex justify-end gap-8 w-full">
          <DesktopNav />
          <Link
            href="/rsvp"
            className={buttonVariants({
              variant: "outline",
              className: "w-fit",
            })}
          >
            RSVP
          </Link>
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}

function DesktopNav() {
  return (
    <div className="hidden md:flex items-center gap-16">
      <ul className="flex gap-4">
        {navigationLinks.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className="text-white font-garet">
              {label.toLocaleUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileNav() {
  return (
    <div className="flex md:hidden gap-4">
      <Drawer direction="left">
        <DrawerTrigger>
          <Menu className="text-white" size={30} />
        </DrawerTrigger>

        <DrawerContent className="block md:hidden">
          <DrawerClose className="absolute top-0 right-0 p-4">
            <X />
          </DrawerClose>
          <div className="flex flex-col gap-8 px-8">
            <p className="text-2xl font-bold">Logo</p>
            <ul className="flex flex-col h-full text-xl gap-6">
              {navigationLinks.map(({ label, href }) => (
                <li key={href}>
                  <DrawerClose asChild>
                    <Link href={href}>{label}</Link>
                  </DrawerClose>
                </li>
              ))}
            </ul>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
