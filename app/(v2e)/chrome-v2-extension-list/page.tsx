import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page(props: { searchParams: Promise<{ [key: string]: string }> }) {
  const searchParams = await props.searchParams;
  const reqHeaders = await headers();

  // get referrer from headers this is the url of the page that the user was on before they were redirected to this page
  const referrer = reqHeaders.get('referer') || 'https://hilars.dev/v2e';

  // get referrer from search params (?r=myreferrer), this overrides the referrer from headers if it exists
  let customReferrer = searchParams.r || referrer;

  // Gumroad referrer must start with http:// or https:// but can be anything
  if (!customReferrer.startsWith('http://') && !customReferrer.startsWith('https://')) {
    customReferrer = `https://${customReferrer}`;
  }

  // Get discount code from search params
  let discountCode = searchParams.d || '';

  // // Ensure the discount exists in the price table, if not use 'BUILD' as default
  // const priceTable = {
  //   'BUILD': { price: '$19.99', discount: '50% OFF' },
  //   'BUILD70': { price: '$9', discount: '70% OFF' },
  //   'AGENCY70': { price: '$9', discount: '70% OFF' },
  // };
  // if (!priceTable[discountCode as keyof typeof priceTable]) {
  //   discountCode = '';
  // }

  const url = `https://builditn0w.gumroad.com/l/chrome-manifest-v2-phaseout/${discountCode}?referrer=${encodeURIComponent(customReferrer)}`;
  redirect(url);
}
