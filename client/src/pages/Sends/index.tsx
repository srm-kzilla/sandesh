import { useEffect, useState } from 'react';
import { ActionButton, Layout, TableHeading, TableRow } from '../../components';
import { CreateCampaign } from '../../components/Modals';
import { fetchCampaigns } from '../../utils/api';
import * as Unicons from '@iconscout/react-unicons';

const Sends = () => {
  const headings = [
    'title',
    'mailing List',
    'start Time',
    'scheduled',
    'subject',
    'sender Mail',
    'launch Status',
    'file Name',
  ];

  const fields = [
    'title',
    'mailingList',
    'startTime',
    'scheduled',
    'subject',
    'senderMail',
    'launchStatus',
    'fileName',
  ];
  const [apiResponse, setApiResponse] = useState<any>([]);
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
        <header className="text-title my-4">Sends</header>
        {/* <button className="max-w-screen-md justify-center actionBtn m-4">CMD+Shift+P</button> */}
        <ActionButton
          className="actionBtn ml-4 mb-4 md:mb-8 lg:mb-0"
          Title={
            <div className="flex">
              <Unicons.UilMegaphone />
              <span> &nbsp; Create Campaign</span>
            </div>
          }
          Type={CreateCampaign}
          Heading="Create Campaign"
        />
      </div>
      <table className="w-full table-fixed">
        <thead>
          <TableHeading headings={headings} />
        </thead>
        <tbody>
          <TableRow elements={apiResponse} fields={fields} headings={headings} />
        </tbody>
      </table>
    </Layout>
  );
};

export default Sends;
