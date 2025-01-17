'use client';

import { MouseEvent, useState } from 'react';

export const useModal = <T>(
  initialState?: T
): [
  isOpen: boolean,
  onToggle: (e: MouseEvent<HTMLButtonElement> | null, state?: T) => void,
  state: T
] => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState<T>(initialState ?? ({} as T));

  const toggleModal = (
    e: MouseEvent<HTMLButtonElement> | null,
    state?: T
  ): void => {
    if (e) {
      e.stopPropagation();
    }
    setIsModalOpen((state) => !state);
    const defaultState = initialState ?? ({} as T);
    setState(isModalOpen ? defaultState : state ?? defaultState);
  };

  return [isModalOpen, toggleModal, state];
};
