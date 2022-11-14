import { NextResponse } from 'next/server';

const CHANCE_OF_FAILURE = 0.1;

export const config = {
  matcher: ['/api/:path*'],
};

export function middleware() {
  console.info('Middleware hit!');

  if (Math.random() < CHANCE_OF_FAILURE) {
    console.error('Oh no! The send failed!');
    return new NextResponse(JSON.stringify({ error: 'Server blew up 💥' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  return NextResponse.next();
}
