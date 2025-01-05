import { signIn } from '../../services/login';
import { useUserStore } from '../../stores/user';
import './GoogleLoginButton.css';

interface GoogleLoginButtonProps {
  extraAction?: () => void;
}

export function GoogleLoginButton({ extraAction }: GoogleLoginButtonProps) {
  const userLogIn = useUserStore(state => state.userLogIn);

  const handleLogin = async () => {
    if (extraAction) extraAction();
    const user = await signIn();
    if (user) userLogIn(user);
  };

  return (
    <button type="button" onClick={handleLogin} className="login-with-google-btn" >
      Sign in with Google
    </button>
  );

}