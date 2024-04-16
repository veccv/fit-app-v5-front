import { Stack, Text } from "@chakra-ui/react";
import { components } from "@/utils/generated-schema";
import ProductModal from "@/components/product/ProductModal";

interface ProductProps {
  product: components["schemas"]["Product"];
  addProduct?: (product: components["schemas"]["Product"]) => void;
}

const Product = ({ product, addProduct }: ProductProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Text>{product.name}</Text>
      <ProductModal product={product} addProduct={addProduct} />
    </Stack>
  );
};

export default Product;
