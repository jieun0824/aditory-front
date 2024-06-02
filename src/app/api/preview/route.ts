import { NextResponse } from 'next/server';

import urlMetadata from 'url-metadata';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url') || '';

    const result: urlMetadata.Result = await urlMetadata(url, {
      cache: 'force-cache',
    });

    const ogData = {
      ogTitle: result['og:title'],
      ogUrl: result['og:url'],
      ogImage: result['og:image'] || result['image'],
    };

    return NextResponse.json(ogData, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
