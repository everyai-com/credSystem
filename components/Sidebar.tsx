"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { auth } from '@clerk/nextjs/server';
import { Montserrat } from "next/font/google";

import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Music2Icon, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils"; 
import { FreeCounter } from "./free-counter";
// import { checkApiLimit } from "@/lib/counter";
import { checkUserApiLimit } from "@/lib/valid";
// import { useUser } from "@clerk/nextjs";
// import { Getcurrentcount } from "@/lib/Getcount";
import { get } from "http";

const montserrat=Montserrat({weight:"600",subsets:["latin"]});
import { supabase } from '../utils/supabase-client';
import { useUser } from "@clerk/nextjs";

const routes=[
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",

    },{
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500",

    },{
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",

    },{
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",

    },{
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500",

    },{
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-700",

    },{
        label: "Settings",
        icon: Settings,
        href: "/settings",
        

    },
]

const Sidebar = () => {
  const {user} = useUser();
  // var count1=0;

   
  
  
  

  


  
  
  

  const pathname=usePathname();
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchCount = async () => {
      const response = await checkUserApiLimit(user?.id);
      setCount(response.currentCount);

      //console.log("response")
    };

    fetchCount();
    
  });
  
  

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[rgb(17,24,39)] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="felx items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image
            fill
            alt="Logo"
            src="/logo.png"
            />
          </div>
          <h1 className={cn("text-2xl font-bold",montserrat.className)}>
            Genius
          </h1>
        </Link>
        <div className="space-y-1">
            {routes.map((route)=>(
                <Link 
                href={route.href}
                key={route.href}
                className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg:-white/10 rounded-lg transition",
                  pathname===route.href? "text-white bg-white/10":
                  "text-zinc-400")

                }
                 // Increment count on link click
                >
                    <div className="flex items-center flex-1">
                        <route.icon className={cn ("h-5 w-5 mr-3",route.color)}/>
                        {route.label}
                    </div>

                </Link>

            ))}

        </div>
      </div>
      <div>
        
      <FreeCounter
      apilimit={count}
      
      
      />

      </div>
      
      
    </div>
  );
};

export default Sidebar;