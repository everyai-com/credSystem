"use client";
export const runtime = 'edge';
import Heading from "@/components/Heading";
import { Code, Loader, MessageSquare } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown'

import { cn } from "@/lib/utils";


import React, { useState } from 'react';
import axios from 'axios';
import Empty from "@/components/empty";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Codepage = () => {
  const proModal = useProModal();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const instruction = {
      role: "system",
      content: "You are a code generator and code explainer. You must answer in markdown code snippets and with explanation. Use Code Comments for Explanations of the given Code."
    }

    try {
      const response = await axios.post('/api/code', {
        model: 'llama-3.1-sonar-small-128k-online',
        // messages: [{ role: 'user', content: input }, instruction],
        messages: [{ role: 'user', content: input }],
      });

      // console.log('API response:', response.data);

      const content = response.data.content || 'Unexpected response format';

      setMessages((current) => [
        ...current,
        { role: 'user', content: input },
        { role: 'assistant', content },
      ]);
      setInput('');
    } catch (error: any) {
      if(error?.response?.status===403){
        proModal.onOpen();

      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
     <div className="px-4 lg:px-8">
     <form onSubmit={handleSubmit}
     className="m-4 pb"
     >
      
        <input
        placeholder="Simple Submit Button using react hooks."
        // className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent "
        className="m-4 border-0 outline-none focus-visible:ring-0 w-full h-fit"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
         
          required
        />
        
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
              <ReactMarkdown components={{
                pre:({node,...props})=>(
                  <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg ">
                    <pre {...props}/>

                  </div>

                ),
                code: ({node , ...props})=>(
                  <code className="bg-black/10 rounded-lg p-1 "{...props}/>

                )
              }}
              className="text-sm overflow-hidden leading-7">
              {message.content || ""}
                
              </ReactMarkdown>
              
              
              
            </p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Codepage;
