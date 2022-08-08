import React from 'react';
import { HeroAnimation } from '../assets/icons';
import { Layout } from '../components';
import { useAuth } from '../store/authContext';

const Profile: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Layout background={HeroAnimation}>
      <div className="flex items-center lg:flex-row flex-col max-w-full justify-between ">
        <header className="text-title my-4">Profile</header>
        <button className="actionBtn  " onClick={signOut}>
          Log Out
        </button>
      </div>
    </Layout>
  );
};

export default Profile;
