import { CiEdit } from "react-icons/ci";
import {
  Button,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useState } from "react";
import ProductsList from "@/components/product/ProductsList";
import { components } from "@/utils/generated-schema";
import { AiOutlineDelete } from "react-icons/ai";

const AddProductToDateModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<components["schemas"]["Product"][]>(
    [],
  );

  const addProduct = (product: components["schemas"]["Product"]) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const removeProduct = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id),
    );
  };

  return (
    <>
      <IconButton aria-label="Add product" icon={<CiEdit />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add product</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="2em">
            <Stack gap="2em">
              <Stack gap="0.5em">
                <Text>Selected products:</Text>
                {products.length === 0 && (
                  <Flex {...flexStyle}>
                    <Text>Add something below</Text>
                  </Flex>
                )}
                {products.map((product) => (
                  <Flex
                    {...flexStyle}
                    key={product.id}
                    _hover={{
                      cursor: "pointer",
                    }}
                  >
                    <Text>{product.name}</Text>
                    <Text>{product.weight}g</Text>
                    <IconButton
                      aria-label="Delete product"
                      icon={<AiOutlineDelete />}
                      onClick={() => removeProduct(product.id)}
                    />
                  </Flex>
                ))}
              </Stack>
              <Stack gap="0.5em">
                <Input
                  w="100%"
                  placeholder="Search product"
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Flex {...flexStyle}>
                  <ProductsList query={query} addProduct={addProduct} />
                </Flex>
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Add selected products
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProductToDateModal;

const flexStyle = {
  w: "100%",
  border: "1px solid",
  p: "1em",
  justifyContent: "space-between",
  alignItems: "center",
};
