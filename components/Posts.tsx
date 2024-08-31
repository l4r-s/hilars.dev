import React from "react";
import Image from "next/image";

interface Props {
  title?: string;
  theme?: string;
}

const posts = [
  {
    title: "How I setup my Kubernetes Cluster",
    image: "/kubernetes.png",
    link: "/blog/how-i-setup-my-k3s-kubernetes-cluster",
    description: "See how I setup my Kubernetes Cluster and how I use it to host my sideprojects.",
    date: "Aug 23 2024",
    buttonText: "Read"
  },

  {
    title: "How to Create Custom Short Links with Referrer Tracking Using Next.js",
    image: "/blog-nextjs-shortlink.png",
    link: "/blog/how-to-create-custom-short-links-with-referrer-tracking-using-next-js",
    description: "Learn how to create custom short links with referrer tracking using Next.js to maintain accurate marketing and traffic data.",
    date: "Aug 18 2024",
    buttonText: "Read"
  },

  {
    title: "The End of Manifest V2",
    image: "/chrome_web_store.png",
    link: "/blog/the-end-of-manifest-v2-what-you-need-to-know-about-the-chrome-extension-transition",
    description: "What You Need to Know About the Chrome Extension Transition",
    date: "Aug 17 2024",
    buttonText: "Read"
  }
];

const Posts: React.FC<Props> = () => {
  return (
    <div>
      <div className="min-h-screen container my-20 lg:my-28">
        <h1 className="text-4xl uppercase text-center">Latest Blog Posts</h1>
        <div className="divider divide-gray-400 mb-20"></div>

        {posts.map((post, index) => (
          <div key={index} className="card card-side bg-base-100 shadow-xl hover:shadow-2xl cursor-pointer my-5">
            <figure className="max-w-40 min-w-40">
              <Image
                src={post.image}
                alt={post.title}
                width={320}
                height={320}
                className="object-fill"
              />
            </figure>
            <div className="card-body">
              <a href={post.link}>
                <h2 className="card-title link link-hover">
                  {post.title}
                </h2>
              </a>
              <p>{post.description}</p>
              <div className="card-actions text-gray-400 mt-5">{post.date}</div>
              <div className="card-actions justify-end">
                <a href={post.link}>
                  <button className="btn btn-primary">{post.buttonText}</button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;