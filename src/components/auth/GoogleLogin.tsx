'use client';

import { User2 } from 'lucide-react';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const GoogleLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={loginWithGoogle}
      aria-label="Sign in with google"
      variant="outline"
      className="w-full bg-background sm:w-auto"
      isLoading={isLoading}
    >
      <User2 className="mr-2 h-4 w-4" aria-hidden="true" />
      Google
    </Button>
  );
};

export default GoogleLogin;
