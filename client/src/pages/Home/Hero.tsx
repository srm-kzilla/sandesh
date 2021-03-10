import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Register, Login } from './Modal';
import { HeroArt, FooterGraphic } from '../../assets/icons';
import * as Unicons from '@iconscout/react-unicons';
import { AuthContext } from '../../store/authContext';

const Home = () => {
  const [registerModal, setRegisterModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const { isAuth, signOut } = useContext(AuthContext);
  return (
    // TODO CHANGE TO FLEX
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
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
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
            <button
              className="actionBtn"
              onClick={() => {
                setLoginModal(true);
              }}
            >
              Let Me in
            </button>
          )}
          {registerModal ? (
            <Register showModal={registerModal} setShowModal={setRegisterModal} otherToggle={setLoginModal} />
          ) : null}
          {loginModal ? (
            <Login showModal={loginModal} setShowModal={setLoginModal} otherToggle={setRegisterModal} />
          ) : null}
        </article>
        <HeroArt className=" w-72 h-auto md:min-w-xs my-8 md:w-2/5 md:ml-8" />
      </section>
      <section className="px-8 max-w-6xl mx-auto flex flex-col md:flex-row justify-start md:justify-between items-center mb-14">
        <article className="max-w-lg mb-8 md:mb-0 flex-1">
          <h1 className="text-2xl xxs:text-3xl font-extrabold text-darkGray mb-2">
            <div className="h-8 xxs:h-10 w-2 mr-2 -ml-3 -mb-1 bg-tertiary inline-block"></div>
            Let's Connect
          </h1>
          <form action="#">
            <input
              placeholder="YOUR NAME"
              type="text"
              name="name"
              className="bg-lightGray text-sm w-full rounded-xl mb-3 placeholder-secondary p-4 outline-none"
            />
            <input
              placeholder="YOUR EMAIL"
              type="email"
              name="email"
              className="bg-lightGray text-sm w-full rounded-xl mb-3 placeholder-secondary p-4 outline-none"
            />
            <textarea
              placeholder="YOUR MESSAGE"
              name="message"
              className="bg-lightGray text-sm w-full rounded-xl placeholder-secondary resize-none h-36 p-4 outline-none"
            />
            <button className="actionBtn mt-2" type="submit">
              Submit
            </button>
          </form>
        </article>
        <article className="shadow-lg md:ml-8 rounded-2xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.316627885776!2d80.04128446445314!3d12.822804718556725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x397c41fcb9ee02f6!2sUniversity%20Building!5e0!3m2!1sen!2sin!4v1612985715682!5m2!1sen!2sin"
            // frameborder="0"
            className="border-0 xs:w-96 xs:h-64"
            // allowfullscreen=""
            aria-hidden="false"
            // tabindex="0"
            title="srm map"
          ></iframe>
          <footer className="flex items-center text-xs xs:text-sm font-normal px-4 py-2">
            <Unicons.UilMapMarker className="mr-2 w-7 h-7 xs:w-8 xs:h-8 text-primary" />
            <span>
              SRMKZILLA - Mozilla Campus Club,
              <br />
              SRM Institute of Science and Technology,
              <br />
              Kattankulathur, Chennai - 603203
            </span>
          </footer>
        </article>
      </section>
      <footer className="relative text-white">
        <FooterGraphic className="w-full" />
        <Unicons.UilLinkedinAlt
          className="cursor-pointer absolute top-10 transform -translate-x-1/2 transition-transform hover:-translate-y-1"
          style={{ left: 'calc(50% - 3.75rem)' }}
        />
        <Unicons.UilFacebookF className="cursor-pointer absolute top-6 left-2/4 transform -translate-x-1/2 transition-transform hover:-translate-y-1" />
        <Unicons.UilInstagram
          className="cursor-pointer absolute top-10 transform -translate-x-1/2 transition-transform hover:-translate-y-1"
          style={{ left: 'calc(50% + 3.75rem)' }}
        />
        <section className="bg-primary pt-16 xxs:pt-10 xs:8 px-8">
          <div className="max-w-5xl mx-auto flex flex-wrap">
            <article className="flex flex-col flex-1  mr-4 mb-4">
              <h2 className="text-tertiary font-extrabold whitespace-nowrap">More About Us</h2>
              <a className="cursor-pointer text-sm">Everything</a>
              <a className="cursor-pointer text-sm">SRMKZILLA</a>
              <a className="cursor-pointer text-sm">Events</a>
              <a className="cursor-pointer text-sm">Blog</a>
              <a className="cursor-pointer text-sm">Us from last year</a>
            </article>
            <article className="flex flex-col flex-1 mr-4 mb-4">
              <h2 className="text-tertiary font-extrabold whitespace-nowrap">Related Information</h2>
              <a className="cursor-pointer text-sm">Privacy</a>
              <a className="cursor-pointer text-sm">Helpdesk</a>
            </article>
            <article className="flex flex-col flex-1 mr-4 mb-4">
              <h2 className="text-tertiary font-extrabold whitespace-nowrap">Workshops</h2>
              <a className="cursor-pointer text-sm">Hacktoberfest’20</a>
              <a className="cursor-pointer text-sm">Recruitments’20</a>
              <a className="cursor-pointer text-sm">Unlocking Linkedin</a>
            </article>
            <article className="flex flex-col md:max-w-xs mr-4 mb-4">
              <h2 className="text-tertiary font-extrabold whitespace-nowrap">Community</h2>
              <span className="text-sm">
                SRMKZILLA is proud to be an equal opportunity workplace. We are committed to equal volunteering
                opportunity regardless of race, color, ancestry, religion, sex, national origin, sexual orientation,
                age, citizenship, disability or gender identity.
              </span>
            </article>
          </div>
        </section>
        <section className="bg-primary px-4 text-center py-1">With your crazy friends on the SRMKZILLA team</section>
      </footer>
    </div>
  );
};

export default Home;
