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
import { useEffect, useState } from "react";
import ProductsList from "@/components/product/ProductsList";
import { components } from "@/utils/generated-schema";
import EditCustomProduct from "@/components/day/EditCustomProduct";
import { ManageData } from "@/utils/manageData";
import { mutate } from "swr";

interface AddProductToDateModalProps {
  userDay: components["schemas"]["UserDay"];
  dayTime: "BREAKFAST" | "LUNCH";
  date: string;
}

const AddProductToDateModal = ({
  userDay,
  dayTime,
  date,
}: AddProductToDateModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<
    components["schemas"]["CustomProduct"][]
  >([]);

  const addProduct = (product: components["schemas"]["CustomProduct"]) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const updateDay = async () => {
    if (dayTime === "BREAKFAST") {
      userDay = {
        ...userDay,
        breakfastProducts: products,
      };
    } else {
      userDay = {
        ...userDay,
        lunchProducts: products,
      };
    }

    ManageData("PUT", `api/api/v1/users/day`, userDay).then(() => {
      mutate(`api/api/v1/users/day/date?date=${date}`);
      onClose();
    });
  };

  useEffect(() => {
    if (dayTime === "BREAKFAST") {
      setProducts(userDay.breakfastProducts);
    } else {
      setProducts(userDay.lunchProducts);
    }
  }, [dayTime, userDay.breakfastProducts, userDay.lunchProducts]);

  const onCloseAction = () => {
    if (dayTime === "BREAKFAST") {
      setProducts(userDay.breakfastProducts);
    } else {
      setProducts(userDay.lunchProducts);
    }
    onClose();
  };

  return (
    <>
      <IconButton aria-label="Add product" icon={<CiEdit />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onCloseAction}>
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
                {products.map((product, index) => (
                  <EditCustomProduct
                    key={product.originProductId}
                    product={product}
                    index={index}
                    setProducts={setProducts}
                    products={products}
                  />
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
            <Button colorScheme="blue" onClick={updateDay}>
              Update daytime
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
