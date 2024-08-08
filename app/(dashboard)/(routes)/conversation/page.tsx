"use client";
import Heading from "@/components/Heading";
import { Loader, MessageSquare } from "lucide-react";
// import React, { useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { formSchema } from "./constants";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { cn } from "@/lib/utils";

// const Conversation = () => {
//   const router = useRouter();
//   // const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
//   const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       prompt: "",
//     },
//   });

//   const isLoading = form.formState.isSubmitting;
//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const userMessage: ChatCompletionMessageParam = {
//         role: "user",
//         content: values.prompt,
//       };
      
//       const NewMessages = [...messages, userMessage];
//       const response = await axios.post("api/conversation", {
//         model: 'openai/gpt-3.5-turbo',
        
//         messages:  [{ role: 'user', content: prompt }],
//       });
//       // const response = await axios.post('/api/conversation', {
        
//       //   messages: [{ role: 'user', content: input }],
//       // });
//       console.log(response.data);
//       const content = response.data.content || 'Unexpected response format';
//       // const userMessage = response.data.content || 'Unexpected response format';

//       // setMessages((current) => [...current, userMessage, response.data]);
//       setMessages((current) => [
//                 ...current,
//                 { role: 'user', content: prompt },
//                 { role: 'assistant', content },
//               ]);
//       // const response = await axios.post('/api/conversation', {
//         //         model: 'openai/gpt-3.5-turbo',
//         //         messages: [{ role: 'user', content: prompt(input) }],
//         //       });
        
//         //       console.log('API response:', response.data);
        
//         //       const content = response.data.content || 'Unexpected response format';
        
//         //       setMessages((current) => [
//         //         ...current,
//         //         { role: 'user', content: prompt(input) },
//         //         { role: 'assistant', content },
//         //       ]);
//         //       setMessage('');
      
//       form.reset();
//     } catch (error:any) {
//       console.log(error);
//     } finally {
//       router.refresh();
//     }
//   };

//   return (
//     <div>
//       <Heading
//         title="Conversation"
//         description="Our most advanced conversation model."
//         icon={MessageSquare}
//         iconColor="text-violet-500"
//         bgColor="bg-violet-500/10"
//       />
//       <div className="px-4 lg:px-8">
//         <div className="">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm
//             grid grid-cols-12 gap-2"
//             >
//               <FormField
//                 name="prompt"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-10">
//                     <FormControl className="m-0 p-0">
//                       <Input
//                         className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent "
//                         disabled={isLoading}
//                         placeholder="How do I calculate the radius of circle"
//                         {...field}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 className="col-span-12 lg:col-span-2 w-full "
//                 disabled={isLoading}
//               >
//                 Generate
//               </Button>
//             </form>
//           </Form>
//         </div>
//       </div>
//       <div className="space-y-4 mt-4">
//         <div className="flex flex-col-reverse gap-y-4">
//           {messages.map((message, index) => (
//           <div key={index}>
//             <strong>{message.role}:</strong> {message.content}
//           </div>
//         ))}


//         </div>
//         </div>
//     </div>
//   );
// };

// export default Conversation;
// "use client";
import React, { useState } from 'react';
import axios from 'axios';
import Empty from "@/components/empty";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Page = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/conversation', {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }],
      });

      console.log('API response:', response.data);

      const content = response.data.content || 'Unexpected response format';

      setMessages((current) => [
        ...current,
        { role: 'user', content: input },
        { role: 'assistant', content },
      ]);
      setInput('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
     <div className="px-4 lg:px-8">
     <form onSubmit={handleSubmit}
     className="m-4 pb"
     >
      
        <input
        placeholder="How do I calculate the radius of circle"
        // className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent "
        className="m-4 border-0 outline-none focus-visible:ring-0 w-full h-fit"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
         
          required
        />
        {/* <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Send'}
        </button> */}
        <Button
        type="submit"
                 className="col-span-12 lg:col-span-2 w-full "
                
              >
                Generate
        </Button>
      </form>
     </div>
      <div className="space-y-4 mt-4">
        {
          isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader/>

            </div>

          )
        }



        {messages.length ===0 && !isLoading &&(
          <div className="">
            <Empty
            label="No conversation Started."/>


          </div>
        )}
         <div  className="flex flex-col-reverse gap-y-4">
        {messages.map((message, index) => (
          <div  
          key={index}>
            <p className={cn(
              "p-8 w-full flex items-start gap-x-8 rounded-lg",
              message.role==="user"?"bg-white border border-black/10":"bg-muted"
            )}>
              
              {message.role ==="user"?<UserAvatar/>: <BotAvatar/>}
              
              <p className="text-sm">
              {message.content}
              </p>
            </p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Page;



