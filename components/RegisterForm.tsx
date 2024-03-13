import { Field, Form, Formik } from "formik";
import { z, ZodError } from "zod";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useFitContext } from "@/context/FitContext";
import { registerUser } from "@/utils/register-user";

const RegisterForm = () => {
  const { push } = useRouter();
  const { setUserToken } = useFitContext();

  const schema = z.object({
    firstName: z.string().min(1, "Firstname is required"),
    lastName: z.string().min(1, "Lastname is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(3, "Password is required"),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      }}
      onSubmit={(values, actions) => {
        registerUser({
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.username,
          password: values.password,
        }).then((response) => {
          actions.setSubmitting(false);
          setUserToken(response);
          push("/");
        });
      }}
      validate={(values) => {
        try {
          schema.parse(values);
        } catch (error) {
          if (error instanceof ZodError) {
            return error.formErrors.fieldErrors;
          }
        }
      }}
      validateOnChange={true}
    >
      {(props) => (
        <Form>
          <Stack gap="2em">
            <Field name="firstName">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  isInvalid={form.errors.firstName && form.touched.firstName}
                >
                  <FormLabel>First name:</FormLabel>
                  <Input {...field} placeholder="firstName" />
                  <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="lastName">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  isInvalid={form.errors.lastName && form.touched.lastName}
                >
                  <FormLabel>Last name:</FormLabel>
                  <Input {...field} placeholder="lastName" />
                  <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="username">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                >
                  <FormLabel>Username:</FormLabel>
                  <Input {...field} placeholder="username" />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel>Password:</FormLabel>
                  <Input {...field} type="password" placeholder="password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Stack>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
