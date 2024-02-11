import Link from 'next/link';
import { Button } from '../ui/button';

const AuthenticationButton = () => {
  return (
    <div className="flex items-center gap-2">
      <Link aria-label="Masuk" href={'/sign-in'}>
        <Button>Masuk</Button>
      </Link>
      <Link aria-label="Daftar" href={'/sign-up'}>
        <Button variant={'outline'}>Daftar</Button>
      </Link>
    </div>
  );
};

export default AuthenticationButton;
