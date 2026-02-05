import { Metadata } from 'next'
import Link from 'next/link'
import { getOSSFriends } from './actions'
import OSSFriendsClient from './ossFriendsPage'

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
  metadataBase: new URL("https://www.getmaxim.ai"),
      alternates: {
        canonical: `/bifrost/oss-friends`,
      },
}

export default async function OSSFriendsPage() {
  const friends = await getOSSFriends()
  const headerOverlayClassName = `fixed top-0 left-0 right-0 z-50 hidden md:block 'bg-white/80 md:backdrop-blur-md border-b border-green-200/20'`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={headerOverlayClassName}>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link className="flex items-center" href="/bifrost">
                <img src={'https://bifrost.getmaxim.ai/logo-full.svg'} alt="Bifrost logo" />
              </Link>
            </div>
            <nav className="hidden items-center space-x-8 md:flex">
              <a
                href="https://getmaxim.ai/bifrost#features"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-accent"
              >
                Features
              </a>
              <a
                href="https://getmaxim.ai/bifrost#performance"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-accent"
              >
                Performance
              </a>
              <a
                href="https://getmaxim.ai/bifrost#oss-friends"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-accent"
              >
                OSS Friends
              </a>
              <a
                href="https://docs.getbifrost.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-accent"
              >
                Docs
              </a>
              <a
                href="https://getmax.im/bifrost-discord"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
              >
                Join Discord
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-50/50 pt-36 pb-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">Our OSS Friends</h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 lg:text-xl">
            Amazing open source projects that share our mission of making AI development more
            accessible and efficient.
          </p>
        </div>
      </section>
      {/* Client component for interactivity */}
      <OSSFriendsClient friends={friends} />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white">Want to be featured?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-green-100">
            If you&apos;re building something amazing in the open source AI space, we&apos;d love to
            feature your project!
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://app.formbricks.com/s/clhys1p9r001cpr0hu65rwh17"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-8 py-3 font-medium text-accent transition-colors hover:bg-gray-50"
            >
              Submit Your Project
            </a>
            <a
              href="https://getmax.im/bifrost-discord"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border-2 border-white px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-accent"
            >
              Join Our Discord
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-2 text-sm text-gray-400">© {new Date().getFullYear()} H3 Labs Inc</p>
          <p className="text-xs text-gray-500">
            Logos provided by{' '}
            <a
              href="https://logo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 transition-colors hover:text-green-300"
            >
              Logo.dev
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
