"use client";
// export const runtime = 'edge'; 
import Heading from "@/components/Heading";
import { Image, Loader, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
//import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { cn } from "@/lib/utils";
import Empty from "@/components/empty";
import { Select, SelectContent, SelectItem, SelectTrigger,SelectValue } from "@/components/ui/select";
// import { amountOptions } from "./constants";

const Imagepage = () => {
  const router = useRouter();
  // const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [Images,setImages]= useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount:"1",
      resolution:"512x512"
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      //  const response = await axios.post("api/image", values);
      //  const urls =response.data.map((image:{url:string})=>image.url);
      //console.log(values);
      // console.log(response);
      
      
      
      // setImages(urls);
      form.reset();
    } catch (error:any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={Image}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm
            grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent "
                        disabled={isLoading}
                        placeholder="A picture of a horse in Swiss Alps."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField 
              control={form.control}
              name="amount"
              render={({field})=>(
                <FormItem className="col-span-12 lg:col-span-2 w-full">
                  <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value}/>

                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option)=>(
                        <SelectItem
                        key={option.value}
                        value={option.value}
                        >
                          {option.label}

                        </SelectItem>
                      ))}
                    </SelectContent>

                  </Select>

                </FormItem>
              )}
              />
              <FormField 
              control={form.control}
              name="resolution"
              render={({field})=>(
                <FormItem className="col-span-12 lg:col-span-2 w-full">
                  <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value}/>

                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option)=>(
                        <SelectItem
                        key={option.value}
                        value={option.value}
                        >
                          {option.label}

                        </SelectItem>
                      ))}
                    </SelectContent>

                  </Select>

                </FormItem>
              )}
              />


              <Button
                className="col-span-12 lg:col-span-2 w-full "
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="space-y-4 mt-4">
        {
          isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader/>

            </div>

          )
        }



        {Images.length ===0 && !isLoading &&(
          <div className="">
            <Empty
            label="No conversation Started."/>


          </div>
        )}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
         This is UNDER MANAGEMENT. DO NOT USE .
         

         </div>
      </div>
    </div>
  );
};

export default Imagepage;


// import React, { useState } from 'react';

// const ImageGenerator: React.FC = () => {
//   const [prompt, setPrompt] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const response = await fetch('/api/image', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate image');
//       }

//       const data = await response.json();
//       setImageUrl(data.imageUrl);
//     } catch (err) {
//       setError('Error generating image. Please try again.');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Image Generator</h1>
//       <form onSubmit={handleSubmit} className="mb-4">
//         <input
//           type="text"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Enter your prompt"
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Generating...' : 'Generate Image'}
//         </button>
//       </form>
//       {error && <p className="text-red-500">{error}</p>}
//       {imageUrl && (
//         <div className="mt-4">
//           <img src={imageUrl} alt="Generated image" className="max-w-full h-auto" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageGenerator;