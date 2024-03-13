import { useDisclosure } from "@chakra-ui/hooks";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import ProductModalForm from "@/components/ProductModalForm";

const ProductModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button w={{ md: "40%" }} onClick={onOpen}>
        Add product
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Product information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProductModalForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;
