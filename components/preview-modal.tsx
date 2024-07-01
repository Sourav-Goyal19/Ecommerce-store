"use client";

import { usePreviewStoreModal } from "@/zustand/preview-modal";
import Modal from "./ui/modal";
import Gallery from "./gallery";
import { ProductImageData } from "@/types";
import PreviewInfo from "./preview-info";

const PreviewModal = () => {
  const previewModal = usePreviewStoreModal();
  const product = usePreviewStoreModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="w-full grid grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery
            productImage={product.productImages[0] as ProductImageData}
          />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <PreviewInfo data={product} />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
