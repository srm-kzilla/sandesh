import { useState, useEffect } from 'react';
import { ActionButton, Layout, TableHeading, TableRow } from '../components';
import { fetchKeys } from '../utils/api';
import { CreateKey } from '../components/Modals';
import * as Unicons from '@iconscout/react-unicons';

const Keys = () => {
  const [apiResponse, setApiResponse] = useState<any>([]);
  const headings = ['key', 'enabled', 'user'];
  const fields = ['key', 'isEnabled', 'user'];

  const updateData = async () => {
    const result: any = await fetchKeys();
    if (result) setApiResponse(result.data);
  };

  useEffect(() => {
    (async function () {
      await updateData();
    })();
  }, []);
  return (
    <Layout>
      <div className="flex items-center lg:flex-row flex-col max-w-full justify-between">
        <header className="text-title my-4">Keys</header>
        <ActionButton
          className="actionBtn ml-4 mb-4 md:mb-8 lg:mb-0 md:mr-10"
          Title={
            <div className="flex items-center">
              <Unicons.UilKeySkeleton size={20} /> &nbsp;
              <span>Create Key</span>
            </div>
          }
          Type={CreateKey}
          Heading="Create Key"
          updateData={updateData}
        />
      </div>
      <table className="w-full table-fixed">
        <thead>
          <TableHeading headings={headings} />
        </thead>
        <tbody>
          <TableRow elements={apiResponse} fields={fields} headings={headings} from="keys" updateData={updateData} />
        </tbody>
      </table>
    </Layout>
  );
};

export default Keys;
