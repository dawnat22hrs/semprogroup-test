'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '../widgets/Header/Header';
import { Main, SecondScreen } from '@/components/sections';
import { ScrollContainer } from '@/components/ScrollContainer/ScrollContainer';

const Modal = dynamic(() => import('../widgets/Modal/Modal'), { ssr: false });

export const PageWrapper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <Header onOpenModal={openModal} />

      <ScrollContainer>
        <Main />
        <SecondScreen />
      </ScrollContainer>

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};
