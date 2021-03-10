import { Link, useHistory, useLocation } from 'react-router-dom';

import { MailIcon } from '../assets/icons';
import * as Unicons from '@iconscout/react-unicons';

const Sidebar = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <nav className="ml-4 py-4 fixed top-0 bottom-0 left-0">
      <div className="bg-primary flex flex-col items-center h-full px-4 py-6 rounded-tr-3xl rounded-bl-3xl">
        <Link to="/">
          <MailIcon
            className="w-8 transition-all transform hover:scale-110"
            // onClick={() => history.push('/')}
          />
        </Link>

        <span className="flex-1"></span>
        <Link to="/sends">
          <Unicons.UilDiary
            size={28}
            className={`${
              location.pathname === '/sends' ? 'text-white' : 'text-secondary'
            } mb-4 cursor-pointer transition-all transform hover:-translate-y-1`}
          />
        </Link>
        <Link to="/keys">
          <Unicons.UilLink
            size={28}
            className={`${
              location.pathname === '/keys' ? 'text-white' : 'text-secondary'
            } cursor-pointer transition-all transform hover:-translate-y-1`}
            onClick={() => history.push('/keys')}
          />
        </Link>
        <span className="flex-1"></span>
        <Unicons.UilUserCircle
          size={28}
          className="text-secondary cursor-pointer transition-all transform hover:scale-110"
        />
      </div>
    </nav>
  );
};

export default Sidebar;