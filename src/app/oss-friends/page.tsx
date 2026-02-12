import { Metadata } from 'next'
import Link from 'next/link'
import { getOSSFriends } from './actions'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/sections/Footer'
import OSSFriendsClient from './ossFriendsPage'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'OSS Friends | Bifrost',
  description:
    'Amazing open source projects that share our mission of making AI development more accessible and efficient.',
  openGraph: {
    title: 'OSS Friends | Bifrost',
    description:
      'Amazing open source projects that share our mission of making AI development more accessible and efficient.',
    type: 'website',
  },
  twitter: {
    title: 'OSS Friends | Bifrost',
    description:
      'Amazing open source projects that share our mission of making AI development more accessible and efficient.',
  },
  metadataBase: new URL('https://www.getmaxim.ai'),
  alternates: {
    canonical: `/bifrost/oss-friends`,
  },
}

export default async function OSSFriendsPage() {
  const friends = await getOSSFriends()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content with Decorations */}
      <div className="relative flex w-full justify-center">
        {/* Left Side Decoration - Box Style */}
        <div className="hidden w-20 flex-none flex-col items-end gap-4 border-r border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>

        {/* Center Content - Max 1100px */}
        <div className="w-full max-w-[1100px] px-4 pb-16">
          {/* Hero Section */}
          <div className="mx-auto mb-12 max-w-4xl py-12 text-center">
            <span className="font-mono text-[12px] leading-[15px] font-medium tracking-[0.04em] text-emerald-500 uppercase">
              [&ensp;COMMUNITY&ensp;]
            </span>
            <h1 className="mx-auto mt-2 mb-4 max-w-3xl text-[42px] leading-[120%] font-medium tracking-[-0.02em] text-black">
              Our OSS Friends
            </h1>
            <p className="mx-auto max-w-2xl text-[16px] leading-[140%] tracking-[0em] text-[#525252]">
              Amazing open source projects that share our mission of making AI development more
              accessible and efficient.
            </p>
          </div>

          <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

          <div>
            {/* Client component for interactivity */}
            <OSSFriendsClient friends={friends} />

            <div className="absolute right-0 left-0 h-px w-full bg-black/10" />

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <h2 className="mb-4 text-[32px] leading-[120%] font-medium tracking-[-0.02em] text-black">
                Want to be featured?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-[16px] leading-[140%] text-[#525252]">
                If you&apos;re building something amazing in the open source AI space, we&apos;d
                love to feature your project!
              </p>
              <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild variant="primary">
                  <a
                    href="https://app.formbricks.com/s/clhys1p9r001cpr0hu65rwh17"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Submit Your Project
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href="https://getmax.im/bifrost-discord"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Our Discord
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Decoration */}
        <div className="hidden w-20 flex-none flex-col items-start gap-4 border-l border-black/10 xl:flex">
          <div
            className="h-full w-full bg-[#F6F6F6] opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='4' width='4' height='4' fill='black'/%3E%3Crect y='8' width='4' height='4' fill='black'/%3E%3Crect x='8' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: '4px 4px',
            }}
          ></div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
