import { Flex, IconButton } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  const { push } = useRouter();

  return (
    <Flex w="100%" h="100%" justifyContent="space-between">
      <IconButton
        aria-label="Search database"
        icon={<BiArrowBack />}
        mt="1em"
        ml="1em"
        onClick={() => push("/")}
        w="1%"
      />
      <Flex w="100%" alignItems="center" justifyContent="center">
        <Flex
          w={{ sm: "70%", md: "30%" }}
          border="1px"
          borderRadius="1em"
          p="1em"
          mt="2em"
          alignItems="center"
          justifyContent="center"
        >
          <LoginForm />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
