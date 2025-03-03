import { siteInfo } from "@/data/site-info";
import Image from "next/image";

export default async function Home() {
  const weddingDate = new Date(siteInfo.home.hero.date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="w-full min-h-dvh flex items-center justify-center">
      <section className="relative w-full min-h-dvh flex items-center justify-center">
        <div className="relative flex flex-col items-center justify-center gap-8 text-center z-20 font-lovelace text-white">
          <h1 className="text-3xl">{siteInfo.home.hero.preTitle}</h1>
          <h2 className="text-9xl">{siteInfo.home.hero.title}</h2>
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
          className="absolute inset-0 object-cover w-full h-full filter brightness-30"
        />
      </section>
    </div>
  );
}
