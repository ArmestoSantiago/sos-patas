import { GoogleLoginButton } from '@/components/buttons/GoogleLoginButton/GoogleLoginButton';
import { Header } from '@/components/Header';
import { NavMenu } from '@/components/NavMenu';

export function Profile() {
  return (
    <>
      <Header title="Profile" />
      <GoogleLoginButton method={true} />
      <NavMenu />
    </>
  );
}