import React from 'react'

import { UserButton, useUser } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'
// import { checkUserApiLimit } from '@/lib/valid'

const Navbar = async () => {
  // const {user}= useUser();
  
  // const limit=await checkUserApiLimit(user?.id);
  return (
    <div className='flex items-center p-4'>
        <MobileSidebar />
        <div className="flex w-full justify-end">
            <UserButton />
        </div>
        </div>
  )
}

export default Navbar