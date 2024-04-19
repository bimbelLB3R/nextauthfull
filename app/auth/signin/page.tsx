import SignInForm from '@/app/components/SignInForm';
import Link from 'next/link';

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const page = ({ searchParams }: Props) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <SignInForm callbackUrl={searchParams.callbackUrl} />
      <Link href={'/auth/forgotPass'}>Forgot your password?</Link>
    </div>
  );
};

export default page;
