import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useRouter } from "next/router";

interface NavBarProps {
  children: ReactNode;
}

const NavBar = ({ children }: NavBarProps) => {
  const { push, pathname } = useRouter();
  return (
    <>
      {pathname !== "/register" && pathname !== "/login" && (
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
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => push("/login")}
            >
              Log in
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => push("/register")}
            >
              Sign up
            </Button>
          </Stack>
        </Flex>
      )}
      <Box w="100%" h="100%">
        {children}
      </Box>
    </>
  );
};

export default NavBar;
