import Page from "@/components/Page";
import ProductsList from "@/components/ProductsList";
import { Button, Flex, Stack } from "@chakra-ui/react";

const Products = () => {
  return (
    <Page>
      <Stack w={{ md: "40%", sm: "70%" }}>
        <Button w={{ md: "40%" }}>Add product</Button>
        <Flex border="1px solid" borderRadius="md" p="1em">
          <ProductsList />
        </Flex>
      </Stack>
    </Page>
  );
};

export default Products;
