import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Login, Register } from '../components/Modals';
import { HeroAnimation } from '../assets/icons';
import { AuthContext } from '../store/authContext';
import { ActionButton } from '../components';

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
              <div className="h-8 xxs:h-10 w-2 mr-2  -mb-1 bg-tertiary inline-block"></div>
              The One Place to store your mails
            </h1>
            <div className="mb-4">
              <p>
                Say sayonara to all those tedious nights spent in mailing. You can now send your "sandesh" at the click
                of a button. Presenting to you, the coolest mailing bud that helps you select, sort and schedule mails
                in a trice! And that's not even the best part yet! Sandesh helps you personalize your mailing lists and
                get your mails sent in a jiffy.
              </p>
              <br />
              <p>
                This is your one-stop solution that makes mass mailing 100x easier. Get your sandesh home and wait for
                things to get 100x sweeter!
              </p>
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
          <HeroAnimation className="animated w-72 h-auto md:min-w-xs my-8 md:w-2/5 md:ml-8" />
        </section>
      </div>
    </>
  );
};

export default Home;
