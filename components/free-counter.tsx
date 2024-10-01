"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
// import { checkApiLimit } from "@/lib/counter";
import { checkUserApiLimit } from "@/lib/valid";
import { ProModal } from "./pro-modal";
import { useProModal } from "@/hooks/use-pro-modal";
import { useUser } from "@clerk/nextjs";


interface FreeCounterProps{
    apilimit:any;
}

export const FreeCounter =({
    apilimit
    
    // apilimit
}:FreeCounterProps)=> {
    const proModal = useProModal();

    const [mounted, setMounted]=useState(false);
    const {user} = useUser();
    useEffect(()=>{
        setMounted(true);
    },[]);
    const [count, setCount] = useState(0);
    useEffect(() => {
      const fetchCount = async () => {
        const response = await checkUserApiLimit(user?.id);
        setCount(response.currentCount);
  
        //console.log("response")
      };
  
      fetchCount();
      
    });
    


    if(!mounted){
        return null;
    }
    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">


            <CardContent className="py-6">
                <div className="text-center text-sm text-white mb-4 space-y-2">
                    <p>
                        {apilimit} / 5 Free Generation 

                    </p>
                    <Progress
                    className="h-3"
                    value={(apilimit/5)*100}/>



                </div>
                <Button onClick={proModal.onClose}className="w-full">
                    Upgrade
                    <Zap className="w-4 h-4 ml-2 fill-white"/>
                </Button>


                
            </CardContent>
            </Card>
        </div>
    )
}