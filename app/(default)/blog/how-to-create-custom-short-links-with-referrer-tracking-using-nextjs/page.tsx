import React from "react";
import BlogHeader from "@/components/BlogHeader";
import NextJsShortLinkImg from "@/public/blog-nextjs-shortlink.png";
import EmbedGist from '@/components/embed-gist-lazy';

export const metadata = {
  metadataBase: new URL('https://hilars.dev'),
  title: "How to Create Custom Short Links with Referrer Tracking Using Next.js",
  description: "Learn how to create custom short links with referrer tracking using Next.js to maintain accurate marketing and traffic data.",
  author: "Lars",
  date: "2024-08-18",
  url: "https://hilars.dev/blog/how-to-create-custom-short-links-with-referrer-tracking-using-next-js",
  image: "/api/og?title=How+to+Create+Custom+Short+Links+with+Referrer+Tracking+Using+Next.js",
  tags: ["Next.js", "Nextjs", "Nextjs Tutorials", "Web Development", "Refeeral Marketing", "Referrer Tracking", "Custom Short Links", "Gumroad"],
  openGraph: {
    type: "article",
    title: "How to Create Custom Short Links with Referrer Tracking Using Next.js",
    description: "Learn how to create custom short links with referrer tracking using Next.js to maintain accurate marketing and traffic data.",
    url: "https://hilars.dev/blog/how-to-create-custom-short-links-with-referrer-tracking-using-next-js",
    images: [
      {
        url: "/api/og?title=How+to+Create+Custom+Short+Links+with+Referrer+Tracking+Using+Next.js.",
        width: 1200,
        height: 630,
        alt: "How to Create Custom Short Links with Referrer Tracking Using Next.js",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Create Custom Short Links with Referrer Tracking Using Next.js",
    description: "Learn how to create custom short links with referrer tracking using Next.js to maintain accurate marketing and traffic data.",
    images: [
      {
        url: "/api/og?title=How+to+Create+Custom+Short+Links+with+Referrer+Tracking+Using+Next.js.",
        width: 1200,
        height: 630,
        alt: "How to Create Custom Short Links with Referrer Tracking Using Next.js",
      },
    ],
  },
};

const BlogPostHowToCreateCustomShortLinksWithReferrerTrackingUsingNextJs: React.FC = () => {
  return (
    <div className="min-h-screen container my-20 lg:my-28">
      <BlogHeader
        title="How to Create Custom Short Links with Referrer Tracking Using Next.js"
        subtitle="Learn how to create custom short links with referrer tracking using Next.js"
        date="Aug 17 2024"
        crossPostUrl="https://medium.com/@buildItN0w/how-to-create-custom-short-links-with-referrer-tracking-using-next-js-ffca6a1d1e79"
        crossPostText="Medium"
        image={NextJsShortLinkImg}
      />

      <div className="divider divide-gray-400 mb-6 mt-0"></div>

      <div className="prose lg:prose-xl text-sm md:text-base text-left mx-auto">
        <p>If you're selling digital products on platforms like Gumroad or LemonSqueezy, having control over your marketing and traffic data is crucial. Tracking sales from specific referrers is essential to ensure that your data is accurate. However, using short links from your own website instead of the product link directly can sometimes compromise this accuracy.</p>

        <p>In this post, I'll show you how to use custom short links with Next.js while still preserving the original referrer information.</p>

        <h2 className="text-xl">Why Use Custom Short Links?</h2>

        <p>Before diving into the code, let's go over some of the benefits of using custom short links with referrer tracking:</p>

        <ul>
          <li><span className="font-bold">Branding</span>: A branded short link on your own domain (e.g., https://yourdomain.com/product) looks professional and gives you more control over the user experience.</li>
          <li><span className="font-bold">Tracking</span>: By attaching referrer data to the short link, you can analyze traffic sources more accurately. For example, if you share different versions of the link for the same product, you can override the referrer to gain more insights.</li>
          <li><span className="font-bold">SEO</span>: Hosting the short link on your domain helps build backlinks, which can improve your website's SEO. Even though users are ultimately redirected to Gumroad, search engines still recognize the link as part of your website.</li>
          <li><strong>Control</strong>: Having control over the link you share allows you to change the destination in the future if needed, without breaking existing links.</li>
        </ul>

        <h2 className="text-xl">The Code: Dynamic Referrer Tracking</h2>

        <p>Here’s a simple Next.js page component that creates a customizable short link for your Gumroad product. It tracks referrers and allows custom referrer data to be passed through query parameters.</p>

        <p>Place it in your Next.js app router directory, for example under <code>app/v2e/page.tsx</code>:</p>

          <EmbedGist gistId="l4r-s/175a7233a68c1fd0e0024e8e89c73fb9" file="page.tsx" />

        <h2 className="text-xl">How It Works</h2>

        <p>The short link URL using the code above would be something like <a href="https://hilars.dev/v2e">https://hilars.dev/v2e</a>?r=optional-referrer.</p>

        <p>Here’s a breakdown of what happens when a user opens the link:</p>

        <ol>
          <li><span className="font-bold">Headers and Referrer</span>: The <code>headers</code> object captures the request headers, including the Referer header, which contains the URL of the page the user visited before landing on this page. If no referrer is found, the code defaults to a specific fallback URL (<a href="https://hilars.dev/v2e">https://hilars.dev/v2e</a>).</li>
          <li><span className="font-bold">Custom Referrer</span>: If the referrer is overridden by a query parameter (e.g., <code>?r=optional-referrer</code>), this takes precedence over the browser's Referer header. This feature is useful for creating custom links for different marketing campaigns.</li>
          <li><span className="font-bold">URL Validation</span>: The code ensures that the referrer starts with <code>http://</code> or <code>https://</code>. This format is required by Gumroad for tracking. In my tests, even arbitrary text works as long as it begins with http(s)://.</li>
          <li><span className="font-bold">Redirect</span>: After processing the referrer, the user is redirected to the specified Gumroad product page. The referrer information is passed along as a query parameter to Gumroad, enabling accurate tracking of the traffic source.</li>
        </ol>

        <h2 className="text-xl">Conclusion</h2>

        <p>I use short links like these to make my products easier to share on social media. It’s much simpler to share a short link like <a href="https://hilars.dev/v2e" className="link link-hover link-primary">https://hilars.dev/v2e</a> compared to a long Gumroad URL such as <a href="https://builditn0w.gumroad.com/l/chrome-manifest-v2-phaseout/BUILD" className="link link-hover link-primary">https://builditn0w.gumroad.com/l/chrome-manifest-v2-phaseout/BUILD</a>.</p>

        <p>One of the hidden advantages of hosting these short links on your own domain is the SEO benefit. Every time someone shares your link or a search engine crawls it, they’re effectively pointing back to your domain. Over time, these backlinks help improve your website’s authority and search engine ranking.</p>

        <p>Additionally, by controlling the URL, you ensure that you have the flexibility to update the destination of the short link in the future. If you ever switch platforms from Gumroad or update the product page, you can simply update the redirect target without losing traffic.</p>
      </div>

    </div>
  );
};

export default BlogPostHowToCreateCustomShortLinksWithReferrerTrackingUsingNextJs;
