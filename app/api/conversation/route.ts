import updateUserApiLimit from '@/lib/updatecount';
import { checkUserApiLimit } from '@/lib/valid';
import { currentUser } from '@clerk/nextjs/server';
import { Router } from 'next/router';

import { NextResponse } from 'next/server';
const apiKey = process.env.PERPLEXITY_KEY;
const apiUrl = 'https://api.perplexity.ai/chat/completions';

//export const runtime = 'edge' 
interface ChatRequest {
  model: string;
  messages: any[]; // Consider using a more specific type for messages
}
// import {increseApiLimit , checkApiLimit} from "@/lib/counter"

export async function POST(req: Request) {

  const userID=await currentUser();
  const user1=userID?.id
  try {
    const { model, messages } = await req.json() as ChatRequest;
    const {isAllowed,currentCount} = await checkUserApiLimit(user1);

    

    if (!model || !messages) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    if(!isAllowed) {
      return new NextResponse("Free trial has Expired .",{status:403});

    }

    // const freeTrial =await checkApiLimit();

    // if(!freeTrial){
    //   return NextResponse.json({ error: "Free trial has expired." }, { status: 403 });
    // }

    if (!process.env.OPENROUTER_API_KEY ) {
      throw new Error('Missing required environment variables');
    }


    // const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    //     //'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL,
    //     //'X-Title': 'Your App Name',
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


    // await increseApiLimit();
   
    

    




    if (!response.ok) {
      throw new Error(`OpenRouter API responded with status ${response.status}`);
    }

    const data = await response.json();
    //console.log(data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Unexpected response format from OpenRouter API');
    }
    updateUserApiLimit(user1);
    return NextResponse.json(data.choices[0].message);
  } catch (error:any) {
    console.error('Error in /api/conversation:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
  
}
// const apiKey = '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';
// const apiUrl = 'https://api.perplexity.ai/chat/completions';

// const requestData = {
//   model: 'llama-3.1-sonar-small-128k-online',
//   messages: [
//     { role: 'system', content: 'Be precise and concise.' },
//     { role: 'user', content: 'How many stars are there in our galaxy?' }
//   ],
//   temperature: 0.2,
//   max_tokens: 150
// };

// async function getPerplexityResponse() {
//   try {
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(requestData)
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data.choices[0].message.content);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// getPerplexityResponse();


