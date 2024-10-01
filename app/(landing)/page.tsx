
import Link from "next/link";
import React from "react";
import { Button } from "../../components/ui/button";
export const runtime = 'edge'; 

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
