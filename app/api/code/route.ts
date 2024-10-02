import { NextResponse } from 'next/server';
import { checkUserApiLimit } from '@/lib/valid';
import { currentUser } from '@clerk/nextjs/server';
import updateUserApiLimit from '@/lib/updatecount';
 
interface ChatRequest {
  model: string;
  messages: any[]; // Consider using a more specific type for messages
}
const apiKey = process.env.PERPLEXITY_KEY;
const apiUrl = 'https://api.perplexity.ai/chat/completions';
//import { incrementCounter } from "@/lib/counter";

export async function POST(req: Request) {
  try {
    const userID=await currentUser();
    const user1=userID?.id
    const {isAllowed,currentCount} = await checkUserApiLimit(user1);
    
    const { model, messages } = await req.json() as ChatRequest;
    //incrementCounter();

    if (!model || !messages) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    if(!isAllowed) {
      return new NextResponse("Free trial has Expired .",{status:403});

    }

    if (!process.env.OPENROUTER_API_KEY ) {
      throw new Error('Missing required environment variables');
    }

    // const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        
    //   },
    //   body: JSON.stringify({ model, messages }),
    // });
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({model,messages})
    });

    updateUserApiLimit(user1);
    

    if (!response.ok) {
      throw new Error(`OpenRouter API responded with status ${response.status}`);
    }

    const data = await response.json();
    //console.log(data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Unexpected response format from LLM API');
    }

    return NextResponse.json(data.choices[0].message);
  } catch (error) {
    //console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error communicating with LLM', },
      { status: 500 }
    );
  }
}
