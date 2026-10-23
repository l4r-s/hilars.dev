// Liveness/readiness probe for Kubernetes; answers without rendering a page.
export const dynamic = "force-dynamic";

export function GET() {
  return new Response("ok\n", {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
