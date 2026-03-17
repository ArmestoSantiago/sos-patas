import { useUserStore } from '@/stores/users';
import { GoogleLogoIcon, Profile2Icon } from './Icons';
import { signIn } from '@/services/login';

export function LogInComponent() {
  const { setUser } = useUserStore();

  const handleLogIn = async () => {
    const user = await signIn();
    if (user) setUser(user);
  };

  return (
    <div className='max-w-2xl mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-160px)]'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <div className='w-32 h-32 mx-auto mb-6 bg-linear-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-full flex items-center justify-center'>
            <Profile2Icon />
          </div>
          <h2 className='text-3xl'>¡Únite a SOSPatas!</h2>
          <p className='text-stone-600'>Inicia sesión para ver tu perfil, publicaciones y ayudar a más animalitos</p>
        </div>
        <button onClick={handleLogIn} className='w-full bg-white border-2 border-stone-300 hover:border-main py-4 rounded-full font-semibold text-stone-700 hover:text-main transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 cursor-pointer'>
          <GoogleLogoIcon />
          <span>Continuar con Google</span>
        </button>
      </div>
    </div>
  );
}