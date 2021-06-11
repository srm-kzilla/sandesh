import { useState, useEffect } from 'react';
import { ActionButton, Layout } from '../../components';
import { MailingList } from '../../components/Modals';
import { fetchMailingLists } from '../../utils/api';
import MailingListCard from '../../components/MailingListCard';

/*const emails = [
  penna@icloud.com,
  loscar@icloud.com,
  rhialto@outlook.com,
  scotfl@outlook.com,
  sinkou@optonline.net,
  jsmith@mac.com,
  jonadab@verizon.net,
  geekoid@hotmail.com,
  dinther@yahoo.com,
  majordick@yahoo.ca,
  solomon@outlook.com,
  marcs@gmail.com,
  jramio@verizon.net,
  monopole@sbcglobal.net,
  ehood@aol.com,
  augusto@msn.com,
  shang@aol.com,
  tubesteak@att.net,
  camenisch@comcast.net,
  tattooman@hotmail.com,
  dkeeler@sbcglobal.net,
  danneng@live.com,
  delpino@gmail.com,
  north@att.net,
  breegster@aol.com,
  pthomsen@sbcglobal.net,
  hager@hotmail.com,
  dmath@att.net,
  torgox@sbcglobal.net,
  pthomsen@live.com,
  uqmcolyv@comcast.net,
  bahwi@optonline.net,
  squirrel@icloud.com,
  tkrotchko@me.com,
  conteb@live.com,
  facet@icloud.com,
  hyper@yahoo.ca,
  jimmichie@mac.com,
  maikelnai@icloud.com,
  mglee@icloud.com,
  kmself@att.net,
  wetter@mac.com,
  rgiersig@outlook.com,
  hamilton@optonline.net,
  stellaau@msn.com,
  mhassel@mac.com,
  rhialto@yahoo.ca,
  horrocks@verizon.net,
  crypt@gmail.com,
  yfreund@optonline.net,
];*/

const MailingLists = () => {
  const [apiResponse, setApiResponse] = useState({ success: false, data: [] });

  useEffect(() => {
    const getAllLists = async () => {
      const result: any = await fetchMailingLists();
      if (result) setApiResponse(result);
    };
    getAllLists();
  }, []);
  return (
    <Layout>
      <div className="flex justify-between items-center lg:flex-row flex-col w-full">
        <header className="my-4">
          <span className="text-title">Mailing Lists</span>
        </header>
        <ActionButton className="actionBtn" Title={<div> Add mailing List </div>} Type={MailingList} />
      </div>
      <>
        {apiResponse.data.map((list: any) => {
          return (
            <MailingListCard
              key={list._id}
              id={list._id}
              name={list.name}
              description={list.desc}
              emails={list.emails}
            />
          );
        })}
      </>
    </Layout>
  );
};
export default MailingLists;
