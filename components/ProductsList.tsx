import { CircularProgress, Stack, Text } from "@chakra-ui/react";
import Product from "@/components/Product";
import { components } from "@/utils/generated-schema";
import useSWR from "swr";
import { useFitContext } from "@/context/FitContext";

const ProductsList = () => {
  const { fetcher } = useFitContext();
  const { data: products, error } = useSWR<components["schemas"]["Product"][]>(
    "/api/api/v1/product/all",
    fetcher,
  );

  if (error) return <Text>Failed to load</Text>;
  if (!products) return <CircularProgress isIndeterminate color="green.300" />;

  return (
    <Stack w="100%">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </Stack>
  );
};

export default ProductsList;
