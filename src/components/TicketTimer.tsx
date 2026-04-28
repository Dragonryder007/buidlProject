"use client";

import React, { useEffect, useState } from "react";

interface Props {
  targetDate?: string; // ISO date string
}

const formatNumber = (n: number) => String(n).padStart(2, "0");

const TicketTimer: React.FC<Props> = ({ targetDate = "2026-05-12T12:00:00Z" }) => {
  const compute = () => {
    const now = new Date();
    const target = new Date(targetDate);
    let diff = Math.max(0, target.getTime() - now.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * 24 * 60 * 60 * 1000;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * 1000 * 60;
    const seconds = Math.floor(diff / 1000);
    return { days, hours, minutes, seconds, isPast: target.getTime() <= now.getTime() };
  };

  const [time, setTime] = useState(compute());
  useEffect(() => {
    const id = setInterval(() => setTime(compute()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);


  return (
    <div className="backdrop-blur-[3px] bg-[rgba(26,13,51,0.8)] border border-solid border-[rgba(150,142,166,0.19)] rounded-lg p-2 flex flex-col gap-4 max-w-md mx-auto">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold text-[#ffa366] text-center tracking-[2px] leading-none">TICKETS LAUNCH MAY 12</p>
        <div className="flex items-center justify-between min-h-[44px]">
          <div className="flex flex-col items-center justify-center text-center w-12">
            <p className="text-2xl font-extrabold text-white leading-[28.8px] tracking-[-0.5px]">{time.days}</p>
            <p className="text-xs text-[#9188a2] leading-4">days</p>
          </div>
          <div className="w-px h-4 bg-white/10" aria-hidden="true"></div>
          <div className="flex flex-col items-center justify-center text-center ">
            <p className="text-2xl font-extrabold text-white leading-[28.8px] tracking-[-0.5px]">{formatNumber(time.hours)}</p>
            <p className="text-xs text-[#9188a2] leading-4">hours</p>
          </div>
          <div className="w-px h-4 bg-white/10" aria-hidden="true"></div>
          <div className="flex flex-col items-center justify-center text-center w-10">
            <p className="text-2xl font-extrabold text-white leading-[28.8px] tracking-[-0.5px]">{formatNumber(time.minutes)}</p>
            <p className="text-xs text-[#9188a2] leading-4">mins</p>
          </div>
          <div className="w-px h-4 bg-white/10" aria-hidden="true"></div>
          <div className="flex flex-col items-center justify-center text-center w-10">
            <p className="text-2xl font-extrabold text-white leading-[28.8px] tracking-[-0.5px]">{formatNumber(time.seconds)}</p>
            <p className="text-xs text-[#9188a2] leading-4">secs</p>
          </div>
        </div>

        <div className="flex items-center justify-between font-extrabold text-sm">
          <p className="text-white leading-[14px]">Global Early Bird</p>
          <p className="text-[#9188a2] text-sm leading-4 ml-4">Discounted</p>
        </div>
      </div>
    </div>
  );
};

export default TicketTimer;
