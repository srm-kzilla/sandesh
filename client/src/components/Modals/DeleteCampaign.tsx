import { deleteCampaign } from '../../utils/api';

const DeleteCampaign = ({ element, setModal }: any) => {
  return (
    <div className="text-lg my-8 self-center w-full">
      Are You Sure You want to delete Campaign "{element ? element.title : ''}"?
      <div className="w-full flex justify-center items-center mt-4 ">
        <button
          className="actionBtn mx-4"
          onClick={async () => {
            const result: any = deleteCampaign({ data: { property: element._id } });
            if (result.success) setModal(false);
          }}
        >
          Yes
        </button>
        <button
          className="actionBtn mx-4"
          onClick={() => {
            setModal(false);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteCampaign;
