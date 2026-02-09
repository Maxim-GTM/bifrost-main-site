import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  const url = new URL('/gcp-marketplace/welcome/success', request.url)
  return NextResponse.redirect(url, { status: 302 })
}

export async function GET(request: NextRequest) {
  const url = new URL('/gcp-marketplace/welcome/success', request.url)
  return NextResponse.redirect(url, { status: 302 })
}
