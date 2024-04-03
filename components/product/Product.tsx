import { Stack, Text } from "@chakra-ui/react";
import { components } from "@/utils/generated-schema";
import ProductModal from "@/components/product/ProductModal";

interface ProductProps {
  product: components["schemas"]["Product"];
}

const Product = ({ product }: ProductProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Text>{product.name}</Text>
      <ProductModal product={product} />
    </Stack>
  );
};

export default Product;
