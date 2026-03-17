import { HomeIcon, MapIcon, AddIcon, ChatIcon, ProfileIcon } from './Icons';
import { useNavigate, useLocation } from 'react-router-dom';

export function NavMenu() {
  const navItems: NavItemProps[] = [
    { icon: HomeIcon, label: 'Inicio', path: '/', testId: 'nav-home' },
    { icon: MapIcon, label: 'Mapa', path: '/map', testId: 'nav-map' },
    { icon: AddIcon, label: 'Publicar', path: '/add', testId: 'nav-add' },
    { icon: ChatIcon, label: 'Chats', path: '/chats', testId: 'nav-chats' },
    { icon: ProfileIcon, label: 'Perfil', path: '/profile', testId: 'nav-profile' },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 border-t border-stone-200 h-20 w-full bg-white safe-area-bottom">
      <div className="flex items-center max-w-2xl mx-auto justify-center h-full">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              data-testid={item.testId}
              onClick={() => navigate(item.path)}
              className={`flex-1 flex flex-col items-center cursor-pointer justify-center gap-2 py-2 pointer ${isActive ? 'stroke-main' : 'stroke-[#a8a29e]'}`}
            >
              <item.icon color={isActive ? '#2e7d32' : '#a8a29e'} />
              <span className={`text-sm font-bold  ${isActive ? 'text-main' : 'text-[#a8a29e]'} `}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  path: string;
  testId: string;
}