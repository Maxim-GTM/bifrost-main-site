'use client'

import Image from 'next/image'

interface OSSFriend {
  id: string
  name: string
  description: string
  url: string
  githubUrl: string
  logo: string
  category: string
  stars?: number
  language?: string
}

interface OSSFriendsClientProps {
  friends: OSSFriend[]
}

export default function OSSFriendsClient({ friends }: OSSFriendsClientProps) {
  return (
    <>
      {/* Friends Grid */}
      <section className="py-4">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="group border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-green-300 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden bg-gray-100">
                    {friend.logo ? (
                      <Image
                        src={friend.logo}
                        alt={friend.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-400 to-green-600 text-lg font-bold text-white">
                        {friend.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="group-hover:text-accent text-lg font-semibold text-gray-900 transition-colors">
                      {friend.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 text-xs">{friend.category}</span>
                      {friend.language && <span className="text-xs">{friend.language}</span>}
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-gray-600">{friend.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <a
                      href={friend.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent text-sm font-medium hover:text-green-700"
                    >
                      Visit Site
                    </a>
                  </div>
                  {friend.stars && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span>{friend.stars.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
