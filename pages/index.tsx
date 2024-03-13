import Page from "@/components/Page";
import { Button, Divider, IconButton, Stack, Text } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";

const HomePage = () => {
  return (
    <Page>
      <Stack w="60%">
        <Stack w="40% ">
          <Button>Dodaj produkt</Button>
        </Stack>
        <Stack border="1px solid" p="1em">
          <Text>Dzień tygodnia</Text>
          <Divider />
          <Stack>
            <Stack
              direction="row"
              w="100%"
              px="1em"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>Śniadanie</Text>
              <IconButton aria-label="Search database" icon={<CiEdit />} />
            </Stack>
            <Stack
              direction="row"
              w="100%"
              px="1em"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>Obiad</Text>
              <IconButton aria-label="Search database" icon={<CiEdit />} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Page>
  );
};

export default HomePage;
