import { ReactNode } from "react";
import { useFitContext } from "@/context/FitContext";
import { Flex } from "@chakra-ui/react";

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  const { userToken } = useFitContext();

  if (!userToken)
    return (
      <Flex w="100%" justifyContent="center" alignItems="center" pt="2em">
        <Flex border="1px solid" p="2em" borderRadius="1em">
          Aby móc korzystać z portalu należy się zalogować albo zarejestrować.
        </Flex>
      </Flex>
    );

  return (
    <Flex w="100%" p="2em" justifyContent="center">
      {children}
    </Flex>
  );
};

export default Page;
