import Image from "next/image";

import { VenueDetails } from "@/components";

import { siteInfo } from "@/data/site-info";

import { weddingInfo } from "@/data/wedding-info";
import ParagraphBlock from "@/components/custom/ParagraphBlock";

import getGuests from "./actions/getGuests";

export default async function Home() {
  const guests = await getGuests();
  console.log(guests);

  const weddingDate = new Date(siteInfo.home.hero.date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const formattedTitle = siteInfo.home.hero.title
    .split(" & ")
    .map((name) =>
      name.split(" ").map((word) => word[0].toUpperCase() + word.slice(1))
    )
    .flat();

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
        <Image
          src="/images/hero.webp"
          alt=""
          width={2000}
          height={1500}
          className="absolute inset-0 w-full h-full object-cover object-top filter saturate-0 brightness-50"
        />
      </section>
      <section className="flex flex-col items-center justify-center gap-32 py-20 px-4 lg:px-8">
        <VenueDetails
          images={weddingInfo.serviceInfo.images}
          name={weddingInfo.serviceInfo.name}
          description={weddingInfo.serviceInfo.description}
          time={weddingInfo.serviceInfo.time}
          location={weddingInfo.serviceInfo.location}
          mapLink={weddingInfo.serviceInfo.mapLink}
          variant="img-right"
        />

        <VenueDetails
          images={weddingInfo.receptionInfo.images}
          name={weddingInfo.receptionInfo.name}
          description={weddingInfo.receptionInfo.description}
          time={weddingInfo.receptionInfo.time}
          location={weddingInfo.receptionInfo.location}
          mapLink={weddingInfo.receptionInfo.mapLink}
          isReception={true}
        />
        {/* stop the column from breaking the overflow*/}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-12 w-full font-lovelace max-w-screen-2xl">
          {weddingInfo.receptionInfo.extraInfo.map(({ title, text }) => (
            <div key={title} className="break-inside-avoid mb-12">
              <ParagraphBlock title={title} text={text} key={title} />
            </div>
          ))}
        </div>
      </section>
      <section className="py-20"></section>
    </div>
  );
}
