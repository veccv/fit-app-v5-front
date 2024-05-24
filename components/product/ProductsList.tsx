import { CircularProgress, Stack, Text } from "@chakra-ui/react";
import { components } from "@/utils/generated-schema";
import useSWR from "swr";
import { useFitContext } from "@/context/FitContext";
import Product from "@/components/product/Product";

interface ProductsListProps {
  query: string;
  addProduct?: (product: components["schemas"]["Product"]) => void;
}

const ProductsList = ({ query, addProduct }: ProductsListProps) => {
  const { fetcher } = useFitContext();
  const { data: products, error } = useSWR<
    components["schemas"]["PageProduct"]
  >(`/api/api/v1/product/search?query=${query}&size=5`, fetcher);

  if (error) return <Text>Failed to load</Text>;
  if (!products) return <CircularProgress isIndeterminate color="green.300" />;

  return (
    <Stack w="100%">
      {products.content.map((product) => (
        <Product key={product.id} product={product} addProduct={addProduct} />
      ))}
    </Stack>
  );
};

export default ProductsList;
