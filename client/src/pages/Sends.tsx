import * as Unicons from '@iconscout/react-unicons';
import { useEffect, useState } from 'react';
import { ActionButton, Layout, TableLayout } from '../components';
import { CreateCampaign } from '../components/Modals';
import { fetchCampaigns } from '../utils/api';
import { CampaignAnimation } from '../assets/icons';

const Sends = () => {
  const headings = [
    'title',
    'mailing List',
    'start Time',
    'scheduled',
    'subject',
    'sender Mail',
    'launch Status',
    'dynamic',
    // 'file Name',
  ];
  const fields = [
    'title',
    'mailingList',
    'startTime',
    'scheduled',
    'subject',
    'senderMail',
    'launchStatus',
    'dynamic',
    // 'fileName',
  ];
  const [apiResponse, setApiResponse] = useState<any>([]);

  const updateData = async () => {
    const result: any = await fetchCampaigns();
    if (result) setApiResponse(result);
  };

  useEffect(() => {
    (async function () {
      await updateData();
    })();
  }, []);
  return (
    <Layout background={CampaignAnimation}>
      <div className="flex items-center lg:flex-row flex-col max-w-full justify-between">
        <header className="text-title my-4">Sends</header>
        <ActionButton
          className="actionBtn"
          Title={
            <div className="flex">
              <Unicons.UilMegaphone />
              <span> &nbsp; Create Campaign</span>
            </div>
          }
          Type={CreateCampaign}
          Heading="Create Campaign"
          updateData={updateData}
          createOrUpdate="create"
        />
      </div>
      <TableLayout headings={headings} elements={apiResponse} fields={fields} from="sends" updateData={updateData} />
    </Layout>
  );
};

export default Sends;
