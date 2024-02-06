import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavBarProps {
  children: ReactNode;
}

const NavBar = ({ children }: NavBarProps) => {
  return (
    <>
      <Flex
        border="1px"
        w="100%"
        h="20%"
        p="0.25em"
        px="1em"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>Fit-App</Text>
        <Stack direction="row">
          <Button colorScheme="teal" variant="outline">
            Log in
          </Button>
          <Button colorScheme="teal" variant="outline">
            Sign up
          </Button>
        </Stack>
      </Flex>
      {children}
    </>
  );
};

export default NavBar;
