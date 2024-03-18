import { IconButton, Stack, Text } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { components } from "@/utils/generated-schema";

interface ProductProps {
  product: components["schemas"]["Product"];
}

const Product = ({ product }: ProductProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Text>{product.name}</Text>
      <IconButton aria-label="Search database" icon={<CiEdit />} />
    </Stack>
  );
};

export default Product;
