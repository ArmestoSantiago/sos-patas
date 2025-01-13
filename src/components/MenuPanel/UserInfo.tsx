import { useUserStore } from '../../stores/users';
import { GoogleLoginButton } from '../buttons/GoogleLoginButton/GoogleLoginButton';

export function UserInfo() {
  const userInfo = useUserStore(state => state.userInfo);
  return (
    <>
      {!userInfo && <GoogleLoginButton method={true} />}
      {userInfo &&
        (
          <div className='userinfo-container'>
            <div>
              <p>{userInfo.name}</p>
              <GoogleLoginButton method={false} />
            </div>
            <img
              src={userInfo.photo ? userInfo.photo : 'public/avatar.png'}
              alt={`${userInfo.name} avatar`} />
          </div>
        )}
    </>
  );
}