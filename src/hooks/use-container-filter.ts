import { create } from 'zustand';

type ContainerFilterStore = {
  isOpen: boolean;
  isLoading: boolean;
  onToggle: () => void;
};

export const useContainerFilter = create<ContainerFilterStore>((set) => ({
  isOpen: false,
  isLoading: false,
  onToggle: () => set((state) => ({ isOpen: !state.isOpen }))
}));
