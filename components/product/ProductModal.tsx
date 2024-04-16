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
import ProductModalForm from "@/components/product/ProductModalForm";
import { components } from "@/utils/generated-schema";
import { IoDisc } from "react-icons/io5";
import { BiPlus } from "react-icons/bi";

interface ProductModalProps {
  product?: components["schemas"]["Product"];
  addProduct?: (product: components["schemas"]["Product"]) => void;
}

const ProductModal = ({ product, addProduct }: ProductModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {product && addProduct && (
        <IconButton
          aria-label="Add product"
          icon={<BiPlus />}
          onClick={() => addProduct(product)}
        />
      )}
      {product && !addProduct && (
        <IconButton
          aria-label="Edit product"
          icon={<IoDisc />}
          onClick={onOpen}
        />
      )}

      {!product && (
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
