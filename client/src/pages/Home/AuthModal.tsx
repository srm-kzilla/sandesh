import * as Unicons from "@iconscout/react-unicons";

export interface AuthModalProps {
  hideModal: () => void;
}

const AuthModal = ({ hideModal }: AuthModalProps) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 grid place-items-center px-6 bg-backdrop">
      <div className="relative bg-sandesh-white w-full max-w-3xl rounded-lg p-6 pt-12">
        <Unicons.UilTimes
          size={28}
          className="absolute right-4 top-4 transition-colors text-secondary hover:text-darkGray cursor-pointer"
          onClick={hideModal}
        />
        Minim nostrud excepteur cupidatat fugiat. Proident dolor pariatur duis
        eiusmod ullamco esse laboris non incididunt ut fugiat cillum duis sunt.
        Exercitation consequat nulla laboris ad dolore officia est excepteur
        est. Anim ad Lorem sunt laboris nulla magna qui in nisi laborum ea. Elit
        cillum aute aliquip consequat eiusmod nulla duis sit. Aute magna irure
        sit consequat amet magna proident. Occaecat labore fugiat labore
        consectetur irure ad id qui veniam. Officia fugiat dolore eu sunt
        officia. Anim quis magna amet exercitation sunt aliqua. Exercitation ut
        est labore eu nostrud duis laboris. Lorem enim id anim qui non occaecat
        commodo excepteur do eiusmod occaecat ex occaecat. Ea dolore duis anim
        nisi incididunt in commodo. Et commodo non non laboris est pariatur
        velit ea eu quis voluptate eu. Laborum laboris excepteur eu officia
        esse. Consectetur commodo sunt aliquip veniam sit exercitation aute
        Lorem laborum. Eiusmod proident tempor exercitation ad adipisicing
        proident irure nostrud amet laboris. Aliquip magna consequat ullamco do
        nisi qui.
      </div>
    </div>
  );
};

export default AuthModal;
