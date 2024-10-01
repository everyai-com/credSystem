import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(request: Request) {
  
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error(
        'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
      );
    }
    const { prompt1 } = await request.json();
    console.log("BEFORE MUSIC");

    // const output1 = await replicate.run(
    //   //"meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
    //    "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
    //   {
    //     input: {
    //       prompt: prompt1,
    //       duration: 8,
    //     }
    //   }
      
    // );
    const output1 = await replicate.run("meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb", { input: {
      prompt: "Edo25 major g melodies that sound triumphant and cinematic. Leading up to a crescendo that resolves in a 9th harmonic",
      model_version: "stereo-large",
      output_format: "mp3",
      normalization_strategy: "peak"
  } });
    console.log(output1);
    console.log("AFTER MUSIC");
    

    // Check if output is an array and contains a string
    // if (Array.isArray(output) && typeof output[0] === 'string') {
      console.log(output1);

    return NextResponse.json({output:output1});
  //  } else {
  //     console.error('Unexpected output format from Replicate API:', output);
  //     return NextResponse.json({ error: 'Unexpected output format from Replicate API' }, { status: 500 });
    
  // }
}
catch (error) {
    //console.error('Error generating music:', error);
    return NextResponse.json({ error: 'Error generating music' }, { status: 500 });
  }
}
