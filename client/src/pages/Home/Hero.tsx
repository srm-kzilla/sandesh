import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Login, Register } from '../../components/Modals';
import { HeroArt } from '../../assets/icons';
// import * as Unicons from '@iconscout/react-unicons';
import { AuthContext } from '../../store/authContext';
import { ActionButton } from '../../components';

const Home = () => {
  const [authModal, setAuthModal] = useState<'HIDDEN' | 'REGISTER' | 'LOGIN'>('HIDDEN');
  const { isAuth, signOut } = useContext(AuthContext);
  return (
    // TODO CHANGE TO FLEX
    <>
      <div className="min-h-screen pt-4 md:pt-0">
        <section className="px-8 max-w-6xl mx-auto flex flex-col md:flex-row justify-start md:justify-between items-center min-h-screen">
          <article className="md:min-w-xs max-w-lg">
            <h1 className="logo text-primary mb-1 xxs:mb-2">Sandesh</h1>
            <h1 className="text-2xl xxs:text-3xl font-extrabold text-darkGray mb-2">
              <div className="h-8 xxs:h-10 w-2 mr-2 -ml-3 -mb-1 bg-tertiary inline-block"></div>
              The One Place to store your mails
            </h1>
            <div className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </div>

            {isAuth ? (
              <div className="flex">
                <Link to="/sends">
                  <button className="actionBtn">Explore Dashboard</button>
                </Link>
                <button className="actionBtn ml-2" onClick={signOut}>
                  Sign Out
                </button>
              </div>
            ) : (
              <ActionButton
                className="actionBtn"
                Title={<div>Let me in</div>}
                Type={authModal === 'REGISTER' ? Register : Login}
                showModal={authModal}
                setShowModal={setAuthModal}
                Heading={authModal === 'REGISTER' ? 'Register' : 'Login'}
              />
            )}
          </article>
          <HeroArt className=" w-72 h-auto md:min-w-xs my-8 md:w-2/5 md:ml-8" />
        </section>
      </div>
    </>
  );
};

export default Home;
