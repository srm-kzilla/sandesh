import { useEffect, useState } from 'react';
import { MailingListAnimation } from '../assets/icons';
import { ActionButton, Layout } from '../components';
import MailingListCard from '../components/MailingListCard';
import { MailingList } from '../components/Modals';
import { fetchMailingLists } from '../utils/api';

const MailingLists = () => {
  const [apiResponse, setApiResponse] = useState({ success: false, data: [] });
  const updateData = async () => {
    const result: any = await fetchMailingLists();
    if (await result) setApiResponse(result);
  };

  useEffect(() => {
    (async function () {
      await updateData();
    })();
  }, []);
  return (
    <Layout background={MailingListAnimation}>
      <div className="flex justify-between items-center lg:flex-row flex-col w-full">
        <header className="my-4">
          <span className="text-title">Mailing Lists</span>
        </header>
        <ActionButton
          className="actionBtn"
          Title={<div> Add mailing List </div>}
          Type={MailingList}
          Heading="Create"
          updateData={updateData}
          createOrUpdate={'create'}
        />
      </div>
      <>
        {apiResponse.data.map((list: any) => {
          return (
            <MailingListCard
              key={list._id}
              id={list._id}
              name={list.name}
              description={list.description}
              emails={list.emails}
              updateData={updateData}
            />
          );
        })}
      </>
    </Layout>
  );
};
export default MailingLists;
