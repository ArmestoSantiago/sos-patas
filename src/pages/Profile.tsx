import { Header } from '@/components/Header';
import { LogInComponent } from '@/components/LogInComponent';
import { NavMenu } from '@/components/NavMenu';
import { UserProfile } from '@/components/UserProfile';
import { getPostedByUser } from '@/services/getPostedByUser';
import { useUserStore } from '@/stores/users';
import { useEffect, useState } from 'react';

export function Profile() {
  const { userInfo } = useUserStore();
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    if (!userInfo) return;
    const getPosts = async () => {
      const id = userInfo.id;
      const posts = await getPostedByUser(id);
      setPosts(posts);
    };

    getPosts();
  }, []);
  return (
    <>
      <Header title="Profile" />
      {!userInfo && <LogInComponent />}
      {userInfo && <UserProfile posts={posts} />}
      <NavMenu />
    </>
  );
}