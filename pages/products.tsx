import Page from "@/components/Page";
import ProductsList from "@/components/ProductsList";
import { Flex, Input, Stack } from "@chakra-ui/react";
import ProductModal from "@/components/ProductModal";
import { useState } from "react";

const Products = () => {
  const [query, setQuery] = useState("");
  return (
    <Page>
      <Stack w={{ md: "40%", sm: "70%" }}>
        <ProductModal />
        <Input
          placeholder="Search products"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Flex border="1px solid" borderRadius="md" p="1em">
          <ProductsList query={query} />
        </Flex>
      </Stack>
    </Page>
  );
};

export default Products;
