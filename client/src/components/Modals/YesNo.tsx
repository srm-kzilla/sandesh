const YesNo = ({ toDo, apiCall, payload, setModal, updateData }: any) => {
  return (
    <div className="text-lg my-8 self-center w-full">
      Are You Sure You want to {toDo}?
      <div className="w-full flex justify-center items-center mt-4 ">
        <button
          className="actionBtn mx-4"
          onClick={async () => {
            const result: any = await apiCall(payload);

            if (result.success) {
              await updateData();
              setModal(false);
            }
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

export default YesNo;
