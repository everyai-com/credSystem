// import { auth } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export  async function POST(req:Request)
//   {
//     try{
//       const {userId} =auth();
//       const body =await req.json();
//       const {prompt , amount=1 , resolution="512x512"}=body;
//       if(!userId) {
//         return new NextResponse("Unauthorized",{status:401});
//       }
//       if(!openai){
//         return new NextResponse("OpenAI API KEY Not configured",{status:500});

//       }
//       if(!prompt) {
//         return new NextResponse("Prompt are Required ",{status:400});
//       }
//       if(!resolution) {
//         return new NextResponse("Prompt are Required ",{status:400});
//       }
//       if(!amount) {
//         return new NextResponse("Prompt are Required ",{status:400});
//       }

//       // const response =await openai.images.generate({
//       //   prompt:prompt,
//       //   n:parseInt(amount,10),
//       //   size:resolution,
//       // })
//       const imageUrls = [];
//     for (let i = 0; i < amount; i++) {
//       const response = await openai.images.generate({
//         //model: "dall-e-3",
//         prompt: prompt,
//         n: 1,
//         size: resolution,
//       });
//       imageUrls.push(response.data[0].url);
//     }
//       return NextResponse.json({images:imageUrls});

//     }




  

 

 
  

//    catch (error) {
//     console.error('Error generating images:', error);
//     // NextResponse.status(500).json({ error: 'Error generating images' });
//     return new NextResponse("'Error generating images'",{status:500});
//   }
// }

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await openai.images.generate({
      // model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    

    const imageUrl = response.data[0].url;
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Error generating image' }, { status: 500 });
  }
}