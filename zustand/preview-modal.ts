import { create } from "zustand";
import { ProductData } from "@/types";

interface PreviewStoreModal {
  isOpen: boolean;
  data?: ProductData | null;
  onOpen: (data: ProductData) => void;
  onClose: () => void;
}

export const usePreviewStoreModal = create<PreviewStoreModal>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));
