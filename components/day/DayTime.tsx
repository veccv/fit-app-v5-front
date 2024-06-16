import { Flex, Stack, Text } from "@chakra-ui/react";
import AddProductToDateModal from "@/components/day/AddProductToDateModal";
import { components } from "@/utils/generated-schema";

interface DayTimeProps {
  date: string;
  userDay: components["schemas"]["UserDay"] | undefined;
  dayTime: "BREAKFAST" | "LUNCH";
}

const DayTime = ({ date, userDay, dayTime }: DayTimeProps) => {
  const products =
    dayTime === "BREAKFAST"
      ? userDay?.breakfastProducts
      : userDay?.lunchProducts;

  return (
    <Stack
      w="100%"
      p="0.5em"
      justifyContent="space-between"
      alignItems="center"
      border="0.5px solid"
      gap="1em"
    >
      <Stack
        direction="row"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>{dayTime === "BREAKFAST" ? "Breakfast" : "Lunch"}</Text>
        <AddProductToDateModal
          date={date}
          userDay={userDay!}
          dayTime={dayTime}
        />
      </Stack>
      <Stack w="100%" gap="0" px="1em" alignItems="center">
        {products?.map((product, i) => (
          <Stack
            key={product.name}
            direction="row"
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            bgColor={i % 2 === 0 ? "gray.100" : "whitesmoke"}
            p="0.5em"
          >
            <Text fontWeight="bold">
              {product.name} ({product.weight}g)
            </Text>
            <Text fontSize="small">C: {product.calories}g</Text>
            <Text fontSize="small">F: {product.fat}g</Text>
            <Text fontSize="small">P: {product.protein}g</Text>
          </Stack>
        ))}
        {products?.length === 0 && (
          <Flex
            w="100%"
            bgColor="gray.100"
            alignItems="center"
            p="1em"
            justifyContent="center"
          >
            <Text>Add some products!</Text>
          </Flex>
        )}
      </Stack>
    </Stack>
  );
};

export default DayTime;
