"use client";

import { useEffect, useState } from "react";

import { weddingInfo } from "@/data/wedding-info";

export default function CountDown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const countDownDate = new Date(weddingInfo.date).getTime();
      const now = new Date().getTime();
      const distance = countDownDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div>
      <h2 className="text-4xl font-garet">Countdown to the big day</h2>
      <div className="flex justify-center space-x-4">
        <TimeContainer time={timeLeft.days} label="Days" />
        <TimeContainer time={timeLeft.hours} label="Hours" />
        <TimeContainer time={timeLeft.minutes} label="Minutes" />
        <TimeContainer time={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
}

function TimeContainer({ time, label }: { time: number; label: string }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <h3 className="text-2xl">{time}</h3>
      <p>{label}</p>
    </div>
  );
}
