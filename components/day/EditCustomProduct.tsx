import { components } from "@/utils/generated-schema";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import EditCustomProductModal from "@/components/day/EditCustomProductModal";

interface EditCustomProductProp {
  product: components["schemas"]["Product"];
  products: components["schemas"]["Product"][];
  setProducts: (products: components["schemas"]["Product"][]) => void;
  index: number;
}

const EditCustomProduct = ({
  product,
  index,
  setProducts,
  products,
}: EditCustomProductProp) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        {...flexStyle}
        key={product.id}
        _hover={{
          cursor: "pointer",
        }}
        onClick={onOpen}
      >
        <Stack w="100%">
          <Text fontWeight="bolder">{product.name}</Text>
          <Stack direction="row" w="100%">
            <Stack alignItems="center">
              <Text {...textDescriptionStyle}>Calories</Text>
              <Text {...textDescriptionStyle}>{product.calories} kcal</Text>
            </Stack>
            <Stack alignItems="center">
              <Text {...textDescriptionStyle}>Proteins</Text>
              <Text {...textDescriptionStyle}>{product.protein} g</Text>
            </Stack>
            <Stack alignItems="center">
              <Text {...textDescriptionStyle}>Fat</Text>
              <Text {...textDescriptionStyle}>{product.fat} g</Text>
            </Stack>
            <Stack alignItems="center">
              <Text {...textDescriptionStyle}>Sugar</Text>
              <Text {...textDescriptionStyle}>{product.sugar} g</Text>
            </Stack>
          </Stack>
        </Stack>
        <Text>{product.weight}g</Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit: {product.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditCustomProductModal
              product={product}
              index={index}
              onClose={onClose}
              setProducts={setProducts}
              products={products}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCustomProduct;

const flexStyle = {
  w: "100%",
  border: "1px solid",
  p: "1em",
  justifyContent: "space-between",
  alignItems: "center",
};

const textDescriptionStyle = {
  fontSize: "0.8em",
  color: "gray.500",
};
