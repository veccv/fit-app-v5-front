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
import DayTime from "@/components/day/DayTime";

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
                <DayTime date={date} userDay={userDay} dayTime="BREAKFAST" />
                <DayTime date={date} userDay={userDay} dayTime="LUNCH" />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Page>
  );
};

export default HomePage;
