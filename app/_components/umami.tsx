import Script from "next/script";

const UmamiScript: React.FC<{ websiteId: string }> = ({ websiteId }) => {
  if (process.env.NODE_ENV !== 'development') {
    return (
      <Script
        defer
        src="https://umami-dev.hilars.dev/script.js"
        data-website-id={websiteId}
      />
    );
  }
  return null;
};

export default UmamiScript;