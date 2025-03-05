import { weddingInfo } from "./wedding-info";

export const siteInfo = {
  home: {
    hero: {
      preTitle: "We're getting married!",
      title: "Victoria & Jamie",
      date: weddingInfo.date,
      venue: weddingInfo.serviceInfo.name,
      time: weddingInfo.serviceInfo.time,
    },
  },
  rsvp: {
    hero: {
      title: "We're Excited to Celebrate with You!",
      date: weddingInfo.date + " " + weddingInfo.serviceInfo.time,
      venue: weddingInfo.serviceInfo.name,
      dividerImage: {
        src: "/images/leaves.png",
        alt: "Leaves",
        width: 600,
        height: 400,
      },
    },
  },
};
