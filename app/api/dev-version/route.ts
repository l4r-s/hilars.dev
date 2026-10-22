// Served at /_dev/version (see the rewrite in next.config.js). CI polls it to
// see which commit a deployment runs. It returns the commit SHA baked into the
// image at build time and nothing else; anything that is not a hex SHA reads
// as "unknown", so a local or mis-built image never echoes arbitrary input.
export const dynamic = "force-dynamic";

const SHA = /^[0-9a-f]{7,40}$/;

export function GET() {
  const value = process.env.HILARS_DEV_COMMIT_SHA ?? "";
  return Response.json(
    { sha: SHA.test(value) ? value : "unknown" },
    { headers: { "cache-control": "no-store" } },
  );
}
