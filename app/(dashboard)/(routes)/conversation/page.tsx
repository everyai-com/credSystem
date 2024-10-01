"use client";
export const runtime = 'edge'; 
import Heading from "@/components/Heading";
import { Loader, MessageSquare } from "lucide-react";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";


import React, { useState } from 'react';
import axios from 'axios';
import Empty from "@/components/empty";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { useRouter } from "next/router";
import { useProModal } from "@/hooks/use-pro-modal";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Page = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();
  const proModal = useProModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/conversation', {
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [{ role: 'user', content: input }],
      });

      //console.log('API response:', response.data);

      const content = response.data.content || 'Unexpected response format';

      setMessages((current) => [
        ...current,
        { role: 'user', content: input },
        { role: 'assistant', content },
      ]);
      setInput('');
    } catch (error:any) {
      if(error?.response?.status===403){
        proModal.onOpen();

      }
    } finally {
      setIsLoading(false);


      // router.refresh();
      //window.location.reload()
      
       
      
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
     <form 
     onSubmit={handleSubmit}
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



