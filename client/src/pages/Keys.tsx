import * as Unicons from '@iconscout/react-unicons';
import { useEffect, useState } from 'react';
import { KeyAnimation } from '../assets/icons';
import { ActionButton, Layout, TableLayout } from '../components';
import { CreateKey } from '../components/Modals';
import { fetchKeys } from '../utils/api';

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
    <Layout background={KeyAnimation}>
      <div className="flex items-center lg:flex-row flex-col max-w-full justify-between">
        <header className="text-title my-4">Keys</header>
        <ActionButton
          className="actionBtn ml-4 mb-4 md:mb-8 lg:mb-0"
          Title={
            <div className="flex items-center">
              <Unicons.UilKeySkeleton size={20} /> &nbsp;
              <span>Create Key</span>
            </div>
          }
          Type={CreateKey}
          Heading="Create"
          updateData={updateData}
        />
      </div>
      <TableLayout headings={headings} elements={apiResponse} fields={fields} from="keys" updateData={updateData} />
    </Layout>
  );
};

export default Keys;
