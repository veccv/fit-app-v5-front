import Page from "@/components/Page";
import ProductsList from "@/components/product/ProductsList";
import { Flex, Input, Stack } from "@chakra-ui/react";
import ProductModal from "@/components/ProductModal";
import { useEffect, useState } from "react";

const Products = () => {
  let query = "";
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    query = urlParams.get("query") ?? "";
  }
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("query", searchQuery);
      window.history.pushState({}, "", "?" + urlParams.toString());
    }
  }, [searchQuery]);

  return (
    <Page>
      <Stack w={{ md: "40%", sm: "70%" }}>
        <ProductModal />
        <Input
          value={searchQuery}
          placeholder="Search products"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <Flex border="1px solid" borderRadius="md" p="1em">
          <ProductsList query={query} />
        </Flex>
      </Stack>
    </Page>
  );
};

export default Products;
