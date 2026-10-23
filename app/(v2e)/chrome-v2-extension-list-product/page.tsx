import CategorySelector from './_components/counter';
import './style.css';
import Image from "next/image";
import { headers } from 'next/headers';
import BuySection from './_components/buy-sectoin';
import { Metadata } from 'next';

import ChromeExtensionListImg from "@/public/og_chrome_extension_list.png"
import Testimonial1Img from "@/public/testimonial_1.png"
import Testimonial2Img from "@/public/testimonial_2.png"
import Testimonial3Img from "@/public/testimonial_3.png"

const title = "5,000+ Opportunities Waiting for You!";
const description = "Capitalize on Chrome's Manifest V2 Deprecation Before the Market Shifts!";
export const metadata: Metadata = {
  metadataBase: new URL('https://hilars.dev'),
  title,
  description,
  alternates: {
    canonical: "https://hilars.dev/chrome-v2-extension-list",
  },
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

export default async function V2ExtensionList(props: { searchParams: Promise<{ [key: string]: string }> }) {
  const searchParams = await props.searchParams;
  // Get referrer from headers
  const reqHeaders = await headers();
  const referrer = reqHeaders.get('referer') || 'https://hilars.dev/chrome-v2-extension-list';

  // Get referrer from search params
  let customReferrer = searchParams.r || referrer;
  let discountCode = searchParams.d || 'BUILD20';

  const priceTable = {
    'BUILD': { price: '$14.99', discount: '50% OFF' },
    'BUILD20': { price: '$23.99', discount: '20% OFF' },
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

  return (
    <div className="pb-16">
      <div className="min-h-screen flex items-center justify-center">
        <div className="mt-4 max-w-8xl w-full z-10">
          <Image
            src={ChromeExtensionListImg}
            alt="Turn Obsolete Extensions into Profitable Goldmines—5,000+ Opportunities Waiting for You!"
            className="mx-auto mb-8 md:max-w-xl lg:max-w-2xl"
            priority
          />
          <div className="flex flex-col lg:flex-row justify-center z-10">
            <div className="lg:w-3/6 w-full mt-2 px-8 mx-2 bg-white shadow-lg rounded-lg">
              <div className="flex flex-col lg:flex-row mb-8">
                {/* <h1 className="text-3xl text-gray-800 text-center lg:text-left">
                  <span className='font-bold'>Transform Obsolete Extensions into Profitable Goldmines</span> — Unlock <span className='font-bold'>5,000+</span> High-Potential Opportunities Now!
                </h1> */}
                <h1 className="text-3xl text-gray-800 text-center mt-4">
                  Get Exclusive Access to a Curated List of <span className="font-bold">5,000+</span> V2 Chrome Extensions ready for Rebuilding and Monetizing!
                </h1>

                <div className='lg:hidden mb-4 mt-12'>
                  <BuySection price={price} discount={discount} showPH={true} url={url} referral={customReferrer} />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 text-center mt-16 mb-8">
                What people are saying 👇
              </h2>
              <div className="flex justify-center">
                <div className="carousel carousel-center mb-16 lg:w-2/3 mx-auto">
                  <div className="carousel-item mx-4 my-auto lg:max-w-96 md:max-w-84 max-w-52">
                    <Image
                      src={Testimonial2Img}
                      alt="Tweet @ThePeterMick: Super helpful 👌"
                    />
                  </div>

                  <div className="carousel-item mx-4 my-auto lg:max-w-96 md:max-w-84 max-w-52">
                    <Image
                      src={Testimonial1Img}
                      alt="Tweet @umairs02: That's an amazing offer for an amazing product!! Just checked it out."
                    />
                  </div>

                  <div className="carousel-item mx-4 my-auto lg:max-w-96 md:max-w-84 max-w-52">
                    <Image
                      src={Testimonial3Img}
                      alt="Tweet @shipixen: Legendary stuff 🔥"
                    />
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-600 my-4">
              With Chrome's Manifest V2 being deprecated, countless extensions are at risk of disappearing, leaving a massive gap in the market.
              This is your rare opportunity to make money and save time by identifying high-potential extensions that are ripe for rebuilding and monetizing.
              </p>

              <p className="text-lg text-gray-600 my-4">
              The exclusive list I’ve created provides key data for each extension—like <span className='font-bold'>ratings, install counts, and last updated dates</span>—making
              it effortless to pinpoint extensions that can be transformed into profitable ventures. As these V2 extensions become obsolete,
              you can step in and avoid the effort of starting from scratch, while also becoming a savior to their existing user base by rebuilding them with Manifest V3.
              </p>

              <p className="text-lg text-gray-600 my-4 mb-8">
              By purchasing, you’ll gain access to an exclusive CSV list of over 5,000 V2 Chrome extensions. This ready-to-use resource will allow you to seize the moment,
              escape the competition, and discover your next big opportunity to profit!
              </p>


              <div className="my-16 lg:my-8 hidden lg:block max-w-96 mx-auto">
                <BuySection price={price} discount={discount} showPH={false} url={url} referral={customReferrer} />
              </div>

              {/* <div className="my-4">
                <div className="card bg-base-100 w-96 my-4 mx-auto text-center justify-center flex flex-col items-center rounded-xl border-2 border-gray-100 shadow-2xl">
                  <div className="card-body">
                    <ul className="list-disc list-inside mx-auto text-left space-y-2">
                      <li className='flex items-center space-x-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-[#dc4e41] my-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="21.17" x2="12" y1="8" y2="8" /><line x1="3.95" x2="8.54" y1="6.06" y2="14" /><line x1="10.88" x2="15.46" y1="21.94" y2="14" /></svg>
                        <span className='text-2xl font-semibold'>Install Count</span>
                      </li>
                      <li className='flex items-center space-x-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-[#ffce42] my-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        <span className='text-2xl font-semibold'>Rating</span>
                      </li>
                      <li className='flex items-center space-x-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-[#4988f5] my-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.3V14"/><circle cx="16" cy="16" r="6"/></svg>
                        <span className='text-2xl font-semibold'>Last Update Date</span>
                      </li>
                      <li className='flex items-center space-x-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-[#21a15f] my-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/><path d="m16 16-1.9-1.9"/></svg>
                        <span className='text-2xl font-semibold'>Focused on V2 Extensions</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl text-gray-800 mb-1">
                  <span className='font-bold'>Unlock Profitable Extension Opportunities</span>
                </h2>
                <h3 className="text-gray-600 text-xl mb-4">
                  Leverage Key Metrics like Install Counts, Ratings, and Last Update Date to Spot the Next Big Project!
                </h3>


              </div> */}
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/3 mt-4 lg:mt-0 bg-white lg:max-w-md p-6 shadow-md rounded-lg">
              <div className='hidden lg:block mb-4'>
                <BuySection showPH={true} url={url} price={price} discount={discount} referral={customReferrer} />
              </div>

              <div className='lg:hidden mb-4'>
                <BuySection showPH={false} url={url} price={price} discount={discount} referral={customReferrer} />
              </div>

              <div className="bg-gray-100 p-4 rounded-md mb-6">
                <p className="text-gray-700">
                  A curated list of 5,000+ Chrome extensions still using the deprecated V2 Manifest. Includes ratings, install counts, and last updated dates to help you easily identify high-potential extensions for rebuilding and monetizing.
                </p>
              </div>

              <div className="border-t border-gray-300">
              </div>

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
      <div className="mt-8 text-center block text-sm">
        <p>
          Did you notice the confetti effect?
        </p>
        <p>
          <a href="https://ConfettiSaaS.com" target="_blank" className="text-lg font-semibold text-blue-500 hover:underline">
            Discover more at ConfettiSaaS.com
          </a>
        </p>
      </div>
    </div >
  );
}
