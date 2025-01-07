import { signOutFn } from '../../../services/login';
import { useUserStore } from '../../../stores/users';
import './GoogleLoginButton.css';

export function GoogleLogoutButton() {
  const userLogOut = useUserStore(state => state.userLogOut);

  const handleLogOut = () => {
    signOutFn();
    userLogOut();
  };

  return (
    <button type="button" onClick={handleLogOut} className="login-with-google-btn" >
      LogOut
    </button>
  );
}