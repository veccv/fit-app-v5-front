import { CircularProgress, Stack, Text } from "@chakra-ui/react";
import { components } from "@/utils/generated-schema";
import useSWR from "swr";
import { useFitContext } from "@/context/FitContext";
import Product from "@/components/Product";

interface ProductsListProps {
  query: string;
}

const ProductsList = ({ query }: ProductsListProps) => {
  const { fetcher } = useFitContext();
  const { data: products, error } = useSWR<
    components["schemas"]["PageProduct"]
  >(`/api/api/v1/product/search?query=${query}`, fetcher);

  if (error) return <Text>Failed to load</Text>;
  if (!products) return <CircularProgress isIndeterminate color="green.300" />;

  return (
    <Stack w="100%">
      {products.content.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </Stack>
  );
};

export default ProductsList;
