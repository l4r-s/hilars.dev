import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const reqHeaders = headers();

  // get referrer from headers this is the url of the page that the user was on before they were redirected to this page
  const referrer = reqHeaders.get('referer') || 'https://hilars.dev/v2e';

  // get referrer from search params (?r=myreferrer), this overrides the referrer from headers if it exists
  let customReferrer = searchParams.r || referrer;

  // Gumroad referrer must start with http:// or https:// but can be anything
  if (!customReferrer.startsWith('http://') && !customReferrer.startsWith('https://')) {
    customReferrer = `https://${customReferrer}`;
  }

  const url = `https://builditn0w.gumroad.com/l/chrome-manifest-v2-phaseout/UNEED40?referrer=${encodeURIComponent(customReferrer)}`;
  redirect(url);
}
