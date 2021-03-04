import React, { useState } from 'react';
import Home from './Hero';
import AuthModal from './AuthModal';

const HomePage = (props?: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleHideModal = () => {
    setIsModalVisible(false);
  };

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Home showModal={handleHideModal} />
      <AuthModal hideModal={handleHideModal} />
    </>
  );
};

export default HomePage;
