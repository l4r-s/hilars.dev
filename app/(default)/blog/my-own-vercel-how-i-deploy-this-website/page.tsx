import React from "react";
import BlogHeader from "@/components/BlogHeader";
import { ArrowRight, ArrowDown } from "lucide-react"
import Image from "next/image";
import MyOwnVercelImg from "@/public/blog/my-own-vercel-how-i-deploy-this-website/pr-comment.png"
import EmbedGist from '@/components/embed-gist-lazy';

export const metadata = {
  metadataBase: new URL('https://hilars.dev'),
  alternates: {
    canonical: '/blog/my-own-vercel-how-i-deploy-this-website',
  },
  title: "My Own Vercel: How I Deploy This Website",
  description: "Learn how I made my own Vercel-like preview deployments for this website.",
  author: "Lars",
  date: "2024-08-29",
  url: "https://hilars.dev/blog/my-own-vercel-how-i-deploy-this-website",
  image: "/api/og?title=My+Own+Vercel:+How+I+Deploy+This+Website",
  tags: ["Next.js", "Kubernetes", "Docker", "GitHub Actions", "Helm", "Helmfile", "Deployment"],
  openGraph: {
    type: "article",
    title: "My Own Vercel: How I Deploy This Website",
    description: "Learn how I made my own Vercel-like preview deployments for this website.",
    url: "https://hilars.dev/blog/my-own-vercel-how-i-deploy-this-website",
    images: [
      {
        url: "/api/og?title=My+Own+Vercel:+How+I+Deploy+This+Website",
        width: 1200,
        height: 630,
        alt: "My Own Vercel: How I Deploy This Website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Own Vercel: How I Deploy This Website",
    description: "Learn how I made my own Vercel-like preview deployments for this website.",
    images: [
      {
        url: "/api/og?title=My+Own+Vercel:+How+I+Deploy+This+Website",
        width: 1200,
        height: 630,
        alt: "My Own Vercel: How I Deploy This Website",
      },
    ],
  },
};

const BlogPostMyOwnVercelHowIDeployThisWebsite: React.FC = () => {
  const steps = [
    {
      emoji: "🏗️",
      title: "Build Next.js",
      description: "Build Next.js app in a builder step",
    },
    {
      emoji: "🚚",
      title: "Move Build",
      description: "Move the resulting Next.js build to the actual image",
    },
    {
      emoji: "🏠",
      title: "Upload Image",
      description: "Upload the image to home Docker registry tagged with commit SHA",
    },
    {
      emoji: "⚓",
      title: "Apply Helm",
      description: "Apply Helm release using Helmfile with commit SHA as image tag",
    },
  ]

  return (
    <div className="min-h-screen container my-20 lg:my-28">
      <BlogHeader
        title="My Own Vercel: How I Deploy This Website"
        subtitle="Learn how I made my own Vercel-like preview deployments for this website."
        image={MyOwnVercelImg}
        date="Aug 29 2024"
      />

      <div className="divider divide-gray-400 mb-6 mt-0"></div>

      <div className="prose lg:prose-xl text-sm md:text-base text-left mx-auto">
        <div>
          <p>This site is built with <strong>Next.js</strong>, a React framework that’s great for server-side rendering, which boosts load times by generating content at build time and improves SEO. Next.js also provides automatic image resizing, which is really useful for handling different screen sizes.</p>
          <p>I’m using the <code>output: standalone</code> option in my build process, which bundles everything into a single package, including a <code>server.js</code> file that handles image resizing and serves all assets. I package all of this into a Docker image and run it on my Kubernetes cluster.</p>
          <p>Initially, I hosted the site on Vercel, but I wanted more control, so I moved everything to my own <strong>K3s-based Kubernetes cluster</strong>. (If you’re curious about how I set up the cluster, I wrote a blog post about it <a href="/blog/how-i-setup-my-k3s-kubernetes-cluster">here</a>.)</p>

          <div className="w-full mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center w-full md:w-1/4 relative">
                  <div className="text-4xl mb-2">{step.emoji}</div>
                  <p className="text-base font-semibold mb-1">{step.title}</p>
                  <p className="text-xs text-gray-600">{step.description}</p>
                  {index < steps.length - 1 && (
                    <>
                      <ArrowRight className="hidden md:block w-8 h-8 text-gray-400 absolute -right-4 top-1/2 transform -translate-y-1/2" />
                      <ArrowDown className="md:hidden w-8 h-8 text-gray-400 my-2" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-xl">Optimizing the Docker Image</h2>
          <p>A major concern when building a Docker image is size. If you go with a standard non-alpine based Node.js base image and just install all dependencies, you’ll end up with an image that’s over <strong>1.6GB</strong>. That’s way too big for production.</p>
          <p>Thankfully, Next.js offers a template to slim down the image. I use the <strong><code>node:20-alpine</code></strong> image, which is significantly smaller (116MB) compared to the default Debian image (around 1.1GB). Then, I follow a <strong>multi-stage build</strong> process:</p>
          <ol>
            <li>Build the Next.js project in the first stage.</li>
            <li>Copy only the necessary production files into the final image.</li>
          </ol>
          <p>This approach results in a much smaller image—about <strong>214MB</strong>, which is reasonable for production.</p>
          <div className="w-full overflow-hidden rounded-lg mb-6">
            <Image src="/blog/my-own-vercel-how-i-deploy-this-website/docker-image-size.png" alt="Docker Image Size" width={1000} height={1000} className="w-full h-auto object-contain rounded-lg" />
          </div>
          <p>Here’s the <strong>Dockerfile</strong> I use:</p>
          <EmbedGist gistId="l4r-s/75cd730a6064fbbf03f3edec69cb10f1" file="Dockerfile" />

          <h2 className="text-xl">How I Deploy It</h2>
          <p>For deployments, I use a combination of:</p>
          <ul>
            <li><strong>GitHub Actions</strong>: This handles the automation, triggering builds and deployments whenever there’s a commit or PR.</li>
            <li><strong>Helm & Helmfile</strong>: These manage the Kubernetes deployments. Helmfile lets me declaratively define everything I need for the deployment, so I can reuse Helm charts easily. A post about my personal helm chart repository is coming next!</li>
          </ul>
          <p>Here’s a simplified version of the process:</p>
          <ol>
            <li>The Next.js build is created in a builder stage.</li>
            <li>The production build is copied into the final Docker image.</li>
            <li>The pipeline pushes the image to my private Docker registry, tagged with the commit SHA.</li>
            <li>The Helmfile applies the release to my cluster, using the image tag from the commit.</li>
          </ol>
          <p>This is the helmfile I use:</p>
          <EmbedGist gistId="l4r-s/75cd730a6064fbbf03f3edec69cb10f1" file="helmfile.yaml" />

          <h2 className="text-xl">Making it More Like Vercel</h2>
          <p>One of the things I liked about Vercel was the automatic preview deployments for pull requests (PRs). When you open a PR on Github, Vercel automatically deploys the changes and gives you a preview link. I wanted to bring that feature to my setup too!</p>
          <p>So, I set up <strong>GitHub Actions</strong> to do the following:</p>
          <ol>
            <li>When a new PR is opened, GitHub Actions builds the Docker image as described above.</li>
            <li>The image is pushed to my private registry.</li>
            <li>The site is deployed with a unique release name and URL based on the PR number with the help of environment variables in the helmfile.</li>
            <li>Github Actions adds a comment to the PR with the deployment URL.
              <div className="w-full overflow-hidden rounded-lg mb-6">
                <Image src="/blog/my-own-vercel-how-i-deploy-this-website/pr-comment.png" alt="Github PR Comment" width={1000} height={1000} className="w-full h-auto object-contain rounded-lg" />
              </div>
            </li>
          </ol>
          <p>Here’s how it looks in the <strong>GitHub Actions</strong> workflow:</p>
          <EmbedGist gistId="l4r-s/75cd730a6064fbbf03f3edec69cb10f1" file="build-dev.yml" />
          <p>This setup mimics the PR-based preview feature of Vercel, but with full control over my infrastructure. When the PR is merged or closed, the deployment is cleaned up automatically.</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostMyOwnVercelHowIDeployThisWebsite;
