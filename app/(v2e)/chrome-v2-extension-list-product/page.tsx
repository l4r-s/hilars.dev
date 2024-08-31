import CategorySelector from './_components/counter';
import './style.css';
import Image from "next/image";
import { headers } from 'next/headers';
import BuySection from './_components/buy-sectoin';
import posthog from 'posthog-js';

const title = "5,000+ Opportunities Waiting for You!";
const description = "Capitalize on Chrome's Manifest V2 Deprecation Before the Market Shifts!";
export const metadata = {
  title,
  description,
  author: "Lars",
  date: "2024-08-21",
  url: "https://hilars.dev/chrome-v2-extension-list",
  canonicalUrl: "https://hilars.dev/chrome-v2-extension-list", // Added canonical URL
  image: "/og_chrome_extension_list.png",
  tags: ["Chrome Extensions", "Manifest V3", "Web Development", "Google Chrome"],
  openGraph: {
    type: "article",
    title,
    description,
    url: "https://hilars.dev/chrome-v2-extension-list",
    images: [
      {
        url: "/og_chrome_extension_list.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: "en_US",
    siteName: "Chrome Extension Opportunities",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: "/og_chrome_extension_list.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
};

export default function V2ExtensionList({ searchParams }: { searchParams: { [key: string]: string } }) {
  // Get referrer from headers
  const reqHeaders = headers();
  const referrer = reqHeaders.get('referer') || 'https://hilars.dev/chrome-v2-extension-list';

  // Get referrer from search params
  let customReferrer = searchParams.r || referrer;
  let discountCode = searchParams.d || 'BUILD';

  const priceTable = {
    'BUILD': { price: '$14.99', discount: '50% OFF' },
    'BUILD70': { price: '$9', discount: '70% OFF' },
    'AGENCY70': { price: '$9', discount: '70% OFF' },
  }

  const price = priceTable[discountCode as keyof typeof priceTable]?.price || '$19.99';
  const discount = priceTable[discountCode as keyof typeof priceTable]?.discount || '50% OFF';

  // Ensure the referrer starts with http:// or https://
  if (!customReferrer.startsWith('http://') && !customReferrer.startsWith('https://')) {
    customReferrer = `https://${customReferrer}`;
  }

  // Example usage of customReferrer
  const url = `https://builditn0w.gumroad.com/l/chrome-manifest-v2-phaseout/${discountCode}?referrer=${encodeURIComponent(customReferrer)}&wanted=true`;

  posthog.capture('v2-extension-list-viewed', { referrer: customReferrer, discountCode: discountCode })

  return (
    <div>
      {/* <a href='https://xshot.me' target='_blank'>
        <div className="bg-[#ffce42] p-2 mb-6">
          <p className="text-gray-800 text-sm text-center">
            Coming Soon: <span className='font-semibold'>Transform Your X Post into Stunning Images Instantly</span> 🚀
          </p>
        </div>
      </a> */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="m-4 max-w-8xl w-full">
          <Image
            src="/chrome_extension_list.png"
            alt="Turn Obsolete Extensions into Profitable Goldmines—5,000+ Opportunities Waiting for You!"
            width={800}
            height={1440}
            className="mx-auto my-32"
            priority
          />
          <div className="flex flex-col lg:flex-row justify-center">
            <div className="lg:w-3/6 w-full mt-2 px-8 mx-2 bg-white shadow-lg rounded-lg">
              <div className="flex flex-col lg:flex-row mb-8">
                <h1 className="text-3xl text-gray-800 text-center lg:text-left">
                  <span className='font-bold'>Transform Obsolete Extensions into Profitable Goldmines</span> — Unlock <span className='font-bold'>5,000+</span> High-Potential Opportunities Now!
                </h1>
                <div className='lg:hidden my-4'>
                  <BuySection price={price} discount={discount} showPH={true} url={url} referral={customReferrer} />
                </div>
              </div>

              {/* <h2 className="text-xl font-bold text-gray-800 mb-4">
                Capitalize on Chrome's Manifest V2 Deprecation Before the Market Shifts!
              </h2> */}
              <p className="text-lg text-gray-600">
              Chrome’s Manifest V2 is Deprecated—Thousands of Extensions Are Now at Risk of Becoming Obsolete. Seize This Rare Opportunity!
              </p>
              {/* <p className="text-lg text-gray-600 mb-6">
                Thousands of extensions will soon stop working. Unlock a golden opportunity!
              </p> */}

              <div className="my-8 text-left">
                <div className="rounded-md mb-2">
                  <p className="text-xl text-gray-800 font-semibold">
                    Get Exclusive Access to a Curated List of 5,000+ V2 Extensions Ripe for Rebuilding and Monetizing.
                  </p>
                  <p className="text-xl text-gray-600">
                    Each Extension Comes with Key Data like Ratings, Install Counts, and Last Updated Dates.
                  </p>
                </div>
                <p className="text-lg text-gray-600">
                </p>
              <p className="text-gray-800 text-lg">
                Chrome extensions using Manifest V2 will soon become obsolete, creating a huge gap in the market.
              </p>
              <p className="text-gray-800 text-lg">
                Be the first to capitalize on this transition and find your next big idea!
              </p>
              </div>
{/* 
              <Image
                src="/ph-2.1.png"
                alt="Turn Obsolete Extensions into Profitable Goldmines—5,000+ Opportunities Waiting for You!"
                width={800}
                height={1440}
                className="mx-auto"
                priority
              /> */}

              <div className="my-4">
                  <h2 className="text-2xl text-gray-800 mb-1">
                    <span className='font-bold'>Unlock Profitable Extension Opportunities</span>
                  </h2>
                  <h3 className="text-gray-600 text-xl mb-4">
                    Leverage Key Metrics like Install Counts, Ratings, and last Update Date to Spot the Next Big Project!
                  </h3>
                <div className="my-4 mx-auto text-center justify-center flex flex-col items-center">
                  <ul className="list-disc list-inside mx-auto text-left space-y-2">
                    <li className='flex items-center space-x-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-[#dc4e41] my-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="21.17" x2="12" y1="8" y2="8" /><line x1="3.95" x2="8.54" y1="6.06" y2="14" /><line x1="10.88" x2="15.46" y1="21.94" y2="14" /></svg>
                      <span className='text-2xl font-semibold'>Install Count</span>
                    </li>
                    <li className='flex items-center space-x-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-[#ffce42] my-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      <span className='text-2xl font-semibold'>Rating</span>
                    </li>
                    <li className='flex items-center space-x-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-[#4988f5] my-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.3V14"/><circle cx="16" cy="16" r="6"/></svg>
                      <span className='text-2xl font-semibold'>Last Update Date</span>
                    </li>
                    <li className='flex items-center space-x-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-[#21a15f] my-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/><path d="m16 16-1.9-1.9"/></svg>
                      <span className='text-2xl font-semibold'>Focused on V2 Extensions</span>
                    </li>
                  </ul>
                </div>

                <CategorySelector url={url} />
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/3 mt-4 lg:mt-0 bg-white lg:max-w-md p-6 shadow-md rounded-lg">
              <div className='hidden lg:block mb-4'>
                <BuySection showPH={true} url={url} price={price} discount={discount} referral={customReferrer} />
              </div>

              <div className='lg:hidden mb-4'>
                <BuySection showPH={false} url={url} price={price} discount={discount} referral={customReferrer} />
              </div>

              {/* <a href={url} target="_blank">
                <button className="w-full bg-[#4988f5] text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 mb-12 font-bold text-xl p-8 lg:hidden">
                  <span className="font-bold block">Don't miss out</span>
                  <span className="font-normal block">Unlock the full list now and start building profitable extensions today! 🚀</span>
                </button>
              </a> */}

              {/* Description */}
              <div className="bg-gray-100 p-4 rounded-md mb-6">
                <p className="text-gray-700">
                  A curated list of 5,000+ Chrome extensions still using the deprecated V2 Manifest. Includes ratings, install counts, and last updated dates to help you easily identify high-potential extensions for rebuilding and monetizing.
                </p>
              </div>

              <div className="justify-center mt-2 mb-16">
                <div className='mx-auto my-4'>
                  <a href="https://x.com/ThePeterMick/status/1824865229282394529" target="_blank">
                    <Image
                      src="/testimonial_2.png"
                      alt="Tweet @ThePeterMick: Super helpful 👌"
                      width={350}
                      height={100}
                      className="mx-auto"
                      priority
                    />
                  </a>
                </div>

                <div className='mx-auto my-4'>
                  <a href="https://x.com/umairs02/status/1824907298772242575" target="_blank">
                    <Image
                      src="/testimonial_1.png"
                      alt="Tweet @umairs02: That's an amazing offer for an amazing product!! Just checked it out."
                      width={350}
                      height={100}
                      className="mx-auto"
                      priority
                    />
                  </a>
                </div>

                <div className='mx-auto my-4'>
                  <a href="https://x.com/shipixen/status/1825614236070085052" target="_blank">
                    <Image
                      src="/testimonial_3.png"
                      alt="Tweet @shipixen: Legendary stuff 🔥"
                      width={350}
                      height={100}
                      className="mx-auto"
                      priority
                    />
                  </a>
                </div>
              </div>
              <div className="border-t border-gray-300">
              </div>


              {/* Info Sections */}
              <div className="border-t border-gray-300">
                <div className="py-4 border-b border-gray-300">
                  <p className="font-bold text-gray-800">Rating</p>
                  <p className="text-gray-600">Spot top-rated extensions for rebuilding</p>
                </div>

                <div className="py-4 border-b border-gray-300">
                  <p className="font-bold text-gray-800">Installs</p>
                  <p className="text-gray-600">Find High-traffic extensions with many users</p>
                </div>

                <div className="py-4 border-b border-gray-300">
                  <p className="font-bold text-gray-800">Last updated</p>
                  <p className="text-gray-600">Spot unmaintained extensions easily</p>
                </div>

                <div className="py-4 border-b border-gray-300">
                  <p className="font-bold text-gray-800">CSV File</p>
                  <p className="text-gray-600">Download the full list in CSV format</p>
                </div>

                <div className="py-4">
                  <p className="font-bold text-gray-800">Size</p>
                  <p className="text-gray-600">881 KB</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mr-2">Ratings</h2>
                <span className="text-sm text-gray-600 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#ffce42]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.078 3.316a1 1 0 00.95.69h3.482c.969 0 1.371 1.24.588 1.81l-2.818 2.047a1 1 0 00-.364 1.118l1.078 3.316c.3.921-.755 1.688-1.54 1.118L10 13.187l-2.818 2.047c-.784.57-1.839-.197-1.54-1.118l1.078-3.316a1 1 0 00-.364-1.118L3.538 8.743c-.783-.57-.38-1.81.588-1.81h3.482a1 1 0 00.95-.69l1.078-3.316z" />
                  </svg>
                  <span className="ml-1 text-gray-800">4.8</span>
                  <span className="ml-1 text-gray-600">(4 ratings)</span>
                </span>
              </div>

              <div className="space-y-2">
                {/* 5 Stars */}
                <div className="flex items-center">
                  <span className="text-sm w-16 text-gray-800">5 stars</span>
                  <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden border border-gray-300 mx-2">
                    <div
                      className="absolute top-0 left-0 h-full bg-[#4988f5]"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">75%</span>
                </div>

                {/* 4 Stars */}
                <div className="flex items-center">
                  <span className="text-sm w-16 text-gray-800">4 stars</span>
                  <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden border border-gray-300 mx-2">
                    <div
                      className="absolute top-0 left-0 h-full bg-[#4988f5]"
                      style={{ width: '25%' }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">25%</span>
                </div>

                {/* 3 Stars */}
                <div className="flex items-center">
                  <span className="text-sm w-16 text-gray-800">3 stars</span>
                  <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden border border-gray-300 mx-2">
                    <div
                      className="absolute top-0 left-0 h-full bg-[#4988f5]"
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">0%</span>
                </div>

                {/* 2 Stars */}
                <div className="flex items-center">
                  <span className="text-sm w-16 text-gray-800">2 stars</span>
                  <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden border border-gray-300 mx-2">
                    <div
                      className="absolute top-0 left-0 h-full bg-[#4988f5]"
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">0%</span>
                </div>

                {/* 1 Star */}
                <div className="flex items-center">
                  <span className="text-sm w-16 text-gray-800">1 star</span>
                  <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden border border-gray-300 mx-2">
                    <div
                      className="absolute top-0 left-0 h-full bg-[#4988f5]"
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">0%</span>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div >
  );
}