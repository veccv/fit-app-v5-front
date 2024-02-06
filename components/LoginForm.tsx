import {Field, Form, Formik} from "formik";
import {z} from "zod";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from "@chakra-ui/react";

const LoginForm = () => {
    const nameSchema = z.string().min(1, {message: "Name is required"});
    return (
        <Formik
            initialValues={{name: "Sasuke"}}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }, 1000);
            }}
            validationSchema={nameSchema}
            validateOnChange={true}
        >
            {(props) => (
                <Form>
                    <Field name="name">
                        {({field, form}: { field: any; form: any }) => (
                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                <FormLabel>First name</FormLabel>
                                <Input {...field} placeholder="name"/>
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
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
