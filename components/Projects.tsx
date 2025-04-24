import React from "react";
import Image, { StaticImageData } from "next/image";
import ConfettiImg from "@/public/confetti.png";
import VPSStuffImg from "@/public/vps-stuff.png";
import ChromeExtensionListImg from "@/public/chrome_extension_list.png";
import XshotImg from "@/public/xshot_og_v3.png";
import WeContextifyImg from "@/public/wecontextify.png";
import StoppuhrTimerImg from "@/public/stoppuhr-timer.de.png";
import RealtimeBlue from "@/public/realtime-blue.png";
import PostCapture from "@/public/postcapture-com.png";
import YearProgress from "@/public/yearprogress-blue.png";
import ShowUpInAI from "@/public/showupinai-og.png";

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
      badge: "New",
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
      title: "PostCapture.com",
      image: PostCapture,
      link: "https://postcapture.com",
      callToAction: "Check it out",
      badge: "New",
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
      title: "realtime.blue",
      image: RealtimeBlue,
      link: "https://realtime.blue",
      callToAction: "Check it out",
      badge: "New",
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
      badge: "New",
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
      title: "Monitor your VPS with ease 🚀",
      image: VPSStuffImg,
      link: "https://vps-stuff.com",
      callToAction: "Check it out",
      badge: "Waitlist",
      children: (
        <p className="mt-2">
          No more complex setup. Install a single agent and start monitoring CPU, memory, disk, and network traffic in seconds.
        </p>
      ),
    },
    {
      title: "5,000+ Opportunities Waiting for You!",
      image: ChromeExtensionListImg,
      link: "/v2ej",
      callToAction: "Profit now!",
      badge: "Active",
      children: (
        <>
          <p className="mt-2">
            <span className="block">As of June 3, 2024, Chrome officially deprecated Manifest V2—thousands of extensions are about to break!</span>
            <span className="block">I&apos;ve curated a list of 5,000+ obsolete V2 extensions complete with:</span>
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Install count ✅</li>
            <li>Ratings ✅</li>
            <li>Last Updated Date ✅</li>
          </ul>
          <div className="my-4 mx-auto">
            <a href="https://www.producthunt.com/posts/v2-chrome-extension-list?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-v2&#0045;chrome&#0045;extension&#0045;list" target="_blank">
              <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=481039&theme=light" alt="V2&#0032;Chrome&#0032;Extension&#0032;List - 5&#0044;000&#0043;&#0032;Opportunities&#0032;Waiting&#0032;for&#0032;You&#0033; | Product Hunt" style={{ width: '250px', height: '54px' }} width="250" height="54" />
            </a>
          </div>
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
