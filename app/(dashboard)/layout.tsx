import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
// import { checkApiLimit } from "@/lib/counter";
import { User } from "@clerk/nextjs/server";
export const runtime = 'edge'; 


const DashboardLayout = ({
    children
}:{
    children:React.ReactNode;
}) => {

    
  return (
    <div className="h-full relative ">
        <div className="hidden h-full md:flex md:w-72  md:flex-col md:fixed md:inset-y-0  bg-gray-900">
            <div className="">
                <Sidebar/>
            </div>

        </div>
        <main className="md:pl-72">
             
            <Navbar/>
        
            {children}
        </main>
        </div>
  )
}

export default DashboardLayout
