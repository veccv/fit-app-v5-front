import Page from "@/components/Page";
import {
  Button,
  CircularProgress,
  Divider,
  Flex,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { components } from "@/utils/generated-schema";
import useSWR, { mutate } from "swr";
import { ManageData } from "@/utils/manageData";
import { useFitContext } from "@/context/FitContext";
import AddProductToDateModal from "@/components/day/AddProductToDateModal";

const HomePage = () => {
  const { fetcher } = useFitContext();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const { data: userDay, error } = useSWR<components["schemas"]["UserDay"]>(
    `api/api/v1/users/day/date?date=${date}`,
    fetcher,
  );

  console.log(userDay);

  if (error && error.code === "ERR_BAD_RESPONSE")
    return (
      <Flex w="100%" alignItems="center" justifyContent="center" py="5em">
        <CircularProgress isIndeterminate color="green.300" />
      </Flex>
    );

  return (
    <Page>
      <Stack w="40%">
        <Stack border="1px solid" p="1em">
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <Divider />
          <Stack w="100%">
            {error ? (
              <Stack
                w="100%"
                h="100%"
                justifyContent="center"
                alignItems="center"
                p="2em"
              >
                <Text>
                  This day is not created yet. Would you like to create one?
                </Text>
                <Button
                  onClick={() =>
                    ManageData("POST", "api/api/v1/users/day", date).then(() =>
                      mutate(`api/api/v1/users/day/date?date=${date}`),
                    )
                  }
                >
                  Create a day
                </Button>
              </Stack>
            ) : (
              <Stack>
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
                    <Text>Breakfast</Text>
                    <AddProductToDateModal
                      date={date}
                      userDay={userDay!}
                      dayTime="BREAKFAST"
                    />
                  </Stack>
                  <Stack w="100%" gap="0" px="1em" alignItems="center">
                    {userDay?.breakfastProducts.map((product, i) => (
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
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  w="100%"
                  px="1em"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>Lunch</Text>
                  <AddProductToDateModal
                    date={date}
                    userDay={userDay!}
                    dayTime="LUNCH"
                  />
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Page>
  );
};

export default HomePage;
