import { useDisclosure } from "@chakra-ui/hooks";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import ProductModalForm from "@/components/ProductModalForm";
import { components } from "@/utils/generated-schema";
import { IoDisc } from "react-icons/io5";

interface ProductModalProps {
  product?: components["schemas"]["Product"];
}

const ProductModal = ({ product }: ProductModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {product ? (
        <IconButton
          aria-label="Edit product"
          icon={<IoDisc />}
          onClick={onOpen}
        />
      ) : (
        <Button w={{ md: "40%" }} onClick={onOpen}>
          Add product
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Product information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProductModalForm onClose={onClose} product={product} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;
