import { GoogleLoginButton } from '@/components/buttons/GoogleLoginButton/GoogleLoginButton';
import { Header } from '@/components/Header';
import { NavMenu } from '@/components/NavMenu';

export function Profile() {
  return (
    <>
      <Header title="Profile" />
      <div className="max-w-160 w-full mx-auto text-center my-6 pb-20 px-4">

        <GoogleLoginButton method={true} />
      </div>
      <NavMenu />
    </>
  );
}