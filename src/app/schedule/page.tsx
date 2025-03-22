import Image from "next/image";

import { VenueDetails } from "@/components";

import { siteInfo } from "@/data/site-info";

import { weddingInfo } from "@/data/wedding-info";
import ParagraphBlock from "@/components/custom/ParagraphBlock";

export default async function SchedulePage() {
  return (
    <div className="w-full min-h-dvh flex flex-col items-center justify-center">
      <section className="relative w-full min-h-dvh flex items-center justify-center">
        <div className="relative flex flex-col items-center justify-center gap-8 text-center z-20 font-alegreyaSc text-white tracking-wider">
          <h1 className="text-3xl">{siteInfo.home.hero.preTitle}</h1>
          <h2 className="text-8xl font-extralight">
            {formattedTitle.map((name, index) => (
              <>
                {index === 1 ? " & " : ""}
                <span key={index} className="">
                  {name}
                </span>
              </>
            ))}
          </h2>
          <div className="flex flex-col items-center gap-8">
            <p className="text-[42px]">{weddingDate}</p>
            <div className="flex items-center gap-2 text-3xl">
              <p>
                {siteInfo.home.hero.time}
                <span className="text-xl">pm</span>
              </p>
              |<p>{siteInfo.home.hero.venue}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20"></section>
    </div>
  );
}
