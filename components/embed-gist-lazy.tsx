"use client";

import dynamic from "next/dynamic";

// Client-only gist embed for the blog pages. Next 15+ rejects
// `dynamic(..., { ssr: false })` in Server Components, so it lives here.
const EmbedGist = dynamic(() => import("@/components/embed-gist"), { ssr: false });

export default EmbedGist;
