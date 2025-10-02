import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import MeAvatar from "@/public/me.png";

const Welcome: React.FC = () => {
  const hashTagEnabled = true;

  return (
    <div className="pt-12 flex flex-col items-center">
      <div className="flex items-center justify-center bg-slate-300 py-4 px-6 rounded-full shadow-lg">
        <a href="/" aria-label="Go to hilars.dev" className="flex items-center space-x-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src={MeAvatar.src} alt="Lars' Avatar" />
            <AvatarFallback>L</AvatarFallback>
          </Avatar>
          <div className="font-bold text-xl text-primary flex flex-col items-center">
            <span className="text-xs lg:text-base">Hi!</span>
            <span className="text-xs lg:text-base">I'm Lars 👋</span>
          </div>
        </a>
      </div>
      <div className="mt-6 prose prose-sm text-center">
        <p>
        A Senior Engineer working at the intersection of software, infrastructure, and reliability.  
        </p>
        {hashTagEnabled && (
          <p className="mt-3 italic">
            <b className="text-primary">#</b>kubernetes{" "}
            <b className="text-primary">#</b>python{" "}
            <b className="text-primary">#</b>nextjs{" "}
            <b className="text-primary">#</b>observability{" "}
            <b className="text-primary">#</b>sre{" "}
            <b className="text-primary">#</b>ansible{" "}
            <b className="text-primary">#</b>terraform{" "}
            <b className="text-primary">#</b>typescript{" "}
            <b className="text-primary">#</b>react/nextjs{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default Welcome;
