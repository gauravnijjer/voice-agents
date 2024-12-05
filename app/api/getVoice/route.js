// app/api/getVoice/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const API_URL = 'https://api.play.ht/api/v2/tts/stream';
  const body = await req.json();

  const options = {
    method: 'POST',
    headers: {
      accept: 'audio/mpeg',
      'content-type': 'application/json',
      AUTHORIZATION: 'd0794af339b34eb1818e19c9537089a9',
      'X-USER-ID': '8yHCnbQ234ge0HriuCUujjvqNwE3',
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(API_URL, options);

    if (!response.ok) {
      throw new Error('Error fetching voice');
    }

    // Return the MP3 content directly
    const audioBuffer = await response.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename="voice.mp3"',
      },
    });
  } catch (error) {
    console.error('Error fetching voice:', error);
    return NextResponse.json({ error: 'Error fetching voice' }, { status: 500 });
  }
}
