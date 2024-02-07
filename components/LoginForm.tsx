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

const LoginForm = () => {
  const schema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password is required"),
  });

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
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

export default LoginForm;
