"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

export const ProModal = () =>{
    const proModal =useProModal();

    return (
        <div className="">
            <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
                 <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Upgrade MAN 
                        </DialogTitle>
                        <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">

                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button
                        size="lg"
                        className="w-full">
                            UPGRADE 
                            <Zap className="w-4 h-4 ml-2 fill-white "/>
                        </Button>
                    </DialogFooter>

                 </DialogContent>
            </Dialog>
        </div>
    )
}