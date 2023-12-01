'use client';

import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import { useState } from 'react';

import { Button } from './button';
import { ModeToggle } from './mode-toggle';
import Spinner from './Spinner';
import { Loader } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const cookies = new Cookies();
  const auth = useAuth();
  const router = useRouter();

  return (
    <nav className="w-full flex justify-between">
      <Link href={'/'}>
        <h1 className=" font-semibold text-xl tracking-wide">UInstruktor</h1>
      </Link>
      <div className="flex items-center gap-2">
        {auth?.token && (
          <>
            {!isLoading && (
              <Button
                onClick={() => {
                  setIsLoading(true);
                  cookies.remove('token');
                  router.refresh();
                  setIsLoading(false);
                }}
              >
                Sign out
              </Button>
            )}
            {isLoading && <Loader className="animate-spin" size={12} />}
          </>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
