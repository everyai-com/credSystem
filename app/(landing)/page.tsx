import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
export const runtime = 'edge' // 'nodejs' (default) | 'edge'

const LandingPage = () => {
  return (
    <div>
      LandingPage (UNprotected)
      <div>
        <Link href="/sign-in">
          <Button>Log IN</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
