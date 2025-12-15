import React from "react";
import Image, { StaticImageData } from "next/image";
import ConfettiImg from "@/public/confetti.png";
import XshotImg from "@/public/xshot_og_v3.png";
import WeContextifyImg from "@/public/wecontextify.png";
import StoppuhrTimerImg from "@/public/stoppuhr-timer.de.png";
import RealtimeBlue from "@/public/realtime-blue.png";
import PostCapture from "@/public/postcapture-com.png";
import YearProgress from "@/public/yearprogress-blue.png";
import ShowUpInAI from "@/public/showupinai-og.png";
import BacklinkDog from "@/public/backlinkdog.png";
import TouchedGrass from "@/public/touched-grass-logo.png";
import { Card, CardFooter, CardTitle, CardDescription, CardContent } from "./ui/card";

interface ProjectCardProps {
  title: string;
  children: React.ReactNode;
  image: StaticImageData;
  link: string;
  callToAction: string;
  badge?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, children, image, link, callToAction, badge }) => {
  const badgeClasses = {
    Building: "badge-primary",
    Active: "badge-success",
    New: "badge-success",
    Decommissioned: "badge-error",
    Rebranded: "badge-warning",
  };

  return (
    <Card className="w-5/6 mx-auto my-12 shadow-lg rounded-lg overflow-hidden">
      <figure>
        <Image
          src={image}
          alt={`${title} preview`}
          width={2560}
          height={1440}
          priority
          className="object-cover"
        />
      </figure>
      <CardContent>
        <div className="flex items-center justify-between mt-6">
          <a href={link} target="_blank" className="no-underline">
            <CardTitle className="link link-hover text-2xl font-bold text-primary">
              {title}
            </CardTitle>
          </a>
          {badge && (
            <div className={`badge text-xs lg:text-base shadow-sm p-3 ${badgeClasses[badge as keyof typeof badgeClasses]}`}>
              {badge === "New" && <span className="flex items-center">{badge}&nbsp;🔥</span>}
              {badge !== "New" && badge}
            </div>
          )}
        </div>
        <CardDescription className="mt-4 text-gray-700">
          {children}
        </CardDescription>
        <CardFooter className="justify-end mt-4">
          <a href={link} target="_blank">
            <button className="btn btn-primary">{callToAction}</button>
          </a>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

const Projects: React.FC = () => {
  const projects = [
    {
      title: "ShowUpInAI.com",
      image: ShowUpInAI,
      link: "https://showupinai.com",
      callToAction: "Get Discovered",
      badge: "Active",
      children: (
        <>
          <p className="mt-2">
            Get Your Website Discovered by AI Tools
          </p>
          <p className="text-sm">
            ShowUpInAI helps your website get discovered by AI tools like ChatGPT, Perplexity and Copilot.
          </p>
        </>
      ),
    },
    {
      title: "touched-grass.com",
      image: TouchedGrass,
      link: "https://touched-grass.com",
      callToAction: "Check it out",
      badge: "Active",
      children: (
        <>
          <p className="mt-2">
            Fun website to show off that you touched grass!
          </p>
          <p className="text-sm">
            Generates badges based on your activities today! Touched grass? Did some marketing? Shipped something new? Showw it off!
          </p>
        </>
      ),
    },
    {
      title: "PostCapture.com",
      image: PostCapture,
      link: "https://postcapture.com",
      callToAction: "Check it out",
      badge: "Active",
      children: (
        <>
          <p className="mt-2">
            Capture Your Posts in Stunning Detail
          </p>
          <p className="text-sm">
            Transform your Bluesky and X posts into beautiful, shareable screenshots with PostCapture.
          </p>
        </>
      ),
    },

    {
      title: "BacklinkDog.com",
      image: BacklinkDog,
      link: "https://backlinkdog.com",
      callToAction: "Monitor your backlinks",
      badge: "Active",
      children: (
        <>
          <p className="mt-2">
            They promised you a backlink.
          </p>
          <p className="text-sm text-orange-500">
            Did they keep it?
          </p>
          <p className="text-sm">
          Stop losing SEO juice from removed or changed backlinks. All with a lifetime deal!
          </p>
        </>
      ),
    },


    {
      title: "realtime.blue",
      image: RealtimeBlue,
      link: "https://realtime.blue",
      callToAction: "Check it out",
      badge: "Active",
      children: (
        <p className="mt-2">
          Track and Celebrate Your Bluesky Growth in Real-Time
        </p>
      ),
    },
    {
      title: "Highlight Your Confetti-Powered App! 🥳",
      image: ConfettiImg,
      link: "https://confettisaas.com",
      callToAction: "List your app!",
      badge: "Active",
      children: (
        <p className="mt-2">
          Every SaaS product should use Confetti to brighten up their users' day!
        </p>
      ),
    },
    {
      title: "YearProgress.blue 🤖",
      image: YearProgress,
      link: "https://yearprogress.blue",
      callToAction: "Keep track",
      badge: "Active",
      children: (
        <>
          <p className="mt-2">
            Bluesky Year Progress Bot
          </p>
          <p className="text-sm">
            Small little bot telling you how much of the year is left with cool visuals!
          </p>
        </>
      ),
    },
    {
      title: "xshot.me",
      image: XshotImg,
      link: "https://xshot.me",
      callToAction: "Check it out",
      badge: "Rebranded",
      children: (
        <p className="mt-2">
          Create perfect Image from any X Tweet.
        </p>
      ),
    },
    {
      title: "WeContextify.com",
      image: WeContextifyImg,
      link: "https://wecontextify.com",
      callToAction: "Check it out",
      badge: "Decommissioned",
      children: (
        <p className="mt-2">
          Generate stunning, contextual aware Images
        </p>
      ),
    },
    {
      title: "Stoppuhr-timer.de",
      image: StoppuhrTimerImg,
      link: "https://stoppuhr-timer.de",
      callToAction: "Check it out",
      badge: "Active",
      children: (
        <p className="mt-2">
          A simple stopwatch, timer and countdown for free use
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen container mt-8">
      <h1 className="text-4xl uppercase text-center font-bold text-primary mb-12">Projects 🚀</h1>
      <div className="divider divide-gray-400 mb-20"></div>
      {projects.map((project, index) => (
        <a key={index} href={project.link} className="no-underline">
          <ProjectCard {...project} />
        </a>
      ))}
    </div>
  );
};

export default Projects;
