import Page from "@/components/Page";
import ProductsList from "@/components/ProductsList";
import { Flex, Stack } from "@chakra-ui/react";
import ProductModal from "@/components/ProductModal";

const Products = () => {
  return (
    <Page>
      <Stack w={{ md: "40%", sm: "70%" }}>
        <ProductModal />
        <Flex border="1px solid" borderRadius="md" p="1em">
          <ProductsList />
        </Flex>
      </Stack>
    </Page>
  );
};

export default Products;
