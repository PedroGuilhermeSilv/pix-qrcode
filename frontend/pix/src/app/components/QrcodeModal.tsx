"use client";


import { FormsKeyValue } from "./FormsKeyValue";
import useQrcodeModal from "./hooks/useQrcodeModal";
import Modal from "./Modal";

const QrcodeModal = () => {
  const qrcodeModal = useQrcodeModal();
  const content = (
    <FormsKeyValue styledButton="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" childrenButton="Comprar" />
  );
  return (
    <Modal
      label=""
      content={content}
      isOpen={qrcodeModal.isOpen}
      close={qrcodeModal.close}
    />
  );
};

export default QrcodeModal;
