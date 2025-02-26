import { signIn, signOutFn } from '@services/login';
import { useTextsStore } from '@stores/texts';
import { useUserStore } from '@stores/users';
import './GoogleLoginButton.css';

interface GoogleLoginButtonProps {
  extraAction?: () => void;
  method: boolean;
}

export function GoogleLoginButton({ extraAction, method }: GoogleLoginButtonProps) {
  const texts = useTextsStore(state => state.texts.googleButtons);
  const userLogIn = useUserStore(state => state.userLogIn);
  const userLogOut = useUserStore(state => state.userLogOut);

  const handleLogin = async () => {
    if (extraAction) extraAction();
    const user = await signIn();
    if (user) userLogIn(user);
  };

  const handleLogOut = async () => {
    signOutFn();
    userLogOut();
  };

  //When type is false the component will render a logout button
  //When type is true the component will render a login button
  return (
    <button type="button" onClick={method ? handleLogin : handleLogOut} className="login-with-google-btn" >
      {method ? texts.login : texts.logout}
    </button>
  );

}