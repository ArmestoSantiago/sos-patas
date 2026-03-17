import { useUserStore } from '@/stores/users';
import { HeartIcon, LogOutIcon } from './Icons';
import { PetsInformation } from '@/types/petsTypes';
import { signOutFn } from '@/services/login';

export function UserProfile({ posts }: UserProfileProps) {
  const { userInfo } = useUserStore();
  const { userLogOut } = useUserStore();
  const numberOfPost = posts.length;

  const handleLogOut = () => {
    signOutFn();
    userLogOut();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 ">
      <div className="bg-white rounded-3xl shadow-sm border border-stone-100 mb-6 p-4">
        <div className="flex items-start gap-4 mb-4">
          <img alt={`${userInfo?.name} photo`} src={userInfo?.photoURL} className="w-24 h-24 rounded-full object-cover border-4 border-black"></img>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">{userInfo?.name}</h2>
          </div>
          <div className="">
            <button onClick={handleLogOut} className='w-10 h-10 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer'>
              <LogOutIcon />
            </button>
          </div>
        </div>
        <div className='grid grid-cols-3 pt-4 border-t border-stone-200'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-main'>{numberOfPost}</div>
            <div className='text-xs font-semibold text-stone-500'>Publicaciones</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-main'>...</div>
            <div className='text-xs font-semibold text-stone-500'>Rescate</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-main'>...</div>
            <div className='text-xs font-semibold text-stone-500'>Adopciones</div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-3 mb-6'>
        <button className="bg-main text-white py-3 rounded-full font-semibold hover:bg-[#1B5E20] cursor-pointer transition-colors">Editar Perfil</button>
        <button className='bg-white cursor-pointer border-2 border-main text-main py-3 rounded-full font-semibold hover:bg-[#E8F5E9] transition-colors'>
          <HeartIcon />
          Guardados
        </button>
      </div>
      <div>
        <h3 className='text-lg font-bold text-[#1A1A1A] mb-4'>Mis publicaciones</h3>
        <span>
          <div className='grid grid-cols-3 gap-2'>
            {posts.map(post => {
              return (
                <span key={post.id}>
                  <div className='aspect-square rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity'>
                    <img alt={`${post.name} image`} src={post.imgSrc} className='w-full h-full object-cover' />
                  </div>
                </span>
              );
            })}
          </div>
        </span>
      </div>
    </div>
  );
}

interface UserProfileProps {
  posts: PetsInformation[];
}