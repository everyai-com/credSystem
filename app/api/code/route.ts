import { NextResponse } from 'next/server';

interface ChatRequest {
  model: string;
  messages: any[]; // Consider using a more specific type for messages
}

export async function POST(req: Request) {
  try {
    const { model, messages } = await req.json() as ChatRequest;

    if (!model || !messages) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    if (!process.env.OPENROUTER_API_KEY ) {
      throw new Error('Missing required environment variables');
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        
      },
      body: JSON.stringify({ model, messages }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API responded with status ${response.status}`);
    }

    const data = await response.json();
    //console.log(data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Unexpected response format from OpenRouter API');
    }

    return NextResponse.json(data.choices[0].message);
  } catch (error) {
    //console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error communicating with OpenRouter', },
      { status: 500 }
    );
  }
}

