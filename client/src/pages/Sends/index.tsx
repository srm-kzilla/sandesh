import { useEffect, useState } from 'react';
import { Layout, TableHeading, TableRow } from '../../components';
import { fetchCampaigns } from '../../utils/api';
import * as Unicons from '@iconscout/react-unicons';

const Sends = () => {
  const headings = ['title', 'mailing List', 'start From', 'end At'];
  const fields = ['title', 'mailingList', 'startFrom', 'endAt'];
  const [type, setType] = useState<'all' | 'multiple' | 'single'>('multiple');
  const [apiResponse, setApiResponse] = useState([]);
  useEffect(() => {
    const f = async () => {
      const result: any = await fetchCampaigns();
      if (result) setApiResponse(result);
    };
    f();
  }, []);
  return (
    <Layout>
      <div className="flex items-center lg:flex-row flex-col max-w-full">
        <header className="my-4">
          <span className="text-title">Sends</span>
        </header>
        <div className="flex max-w-screen-md flex-wrap justify-center">
          <button
            className={`toggleBtn md:m-4 mx-1 my-2 ` + (type === 'all' ? 'bg-primary text-white' : `text-primary`)}
            onClick={() => setType('all')}
          >
            All
          </button>
          <button
            className={`toggleBtn md:m-4 mx-1 my-2 ` + (type === 'multiple' ? 'bg-primary text-white' : `text-primary`)}
            onClick={() => setType('multiple')}
          >
            Campaigns
          </button>
          <button
            className={`toggleBtn md:m-4 mx-1 my-2 ` + (type === 'single' ? 'bg-primary text-white' : `text-primary`)}
            onClick={() => setType('single')}
          >
            Singles
          </button>
        </div>
        <div className="flex flex-wrap max-w-screen-md justify-center">
          <button className="actionBtn m-4 md:mx-16">
            <Unicons.UilFilter className={`transition-all transform hover:-translate-y-1`} />
          </button>
          <button className="actionBtn m-4">CMD+Shift+P</button>
        </div>
      </div>
      <table className="w-full table-fixed">
        <thead>
          <TableHeading headings={headings} />
        </thead>
        <tbody>
          <TableRow elements={apiResponse} fields={fields} headings={headings} type={type} />
        </tbody>
      </table>
    </Layout>
  );
};

export default Sends;
