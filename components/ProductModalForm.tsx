import { z, ZodError } from "zod";
import { Field, Form, Formik } from "formik";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalFooter,
  Stack,
} from "@chakra-ui/react";
import { mutate } from "swr";
import { UpdateData } from "@/utils/updateData";
import { components } from "@/utils/generated-schema";

interface ProductModalFormProps {
  onClose: () => void;
}

const ProductModalForm = ({ onClose }: ProductModalFormProps) => {
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    protein: z.string().min(1, "Protein is required"),
    carbs: z.string().min(1, "Carbs is required"),
    fat: z.string().min(1, "Fat is required"),
    sugar: z.string().min(1, "Sugar is required"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        protein: "",
        carbs: "",
        fat: "",
        sugar: "",
      }}
      onSubmit={(values) => {
        UpdateData<components["schemas"]["Product"]>(
          "POST",
          "/api/api/v1/product",
          values as components["schemas"]["Product"],
        ).then(() => {
          mutate("/api/api/v1/product/all").then(() => {
            onClose();
          });
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
      {() => (
        <Form>
          <Stack gap="2em">
            <Field name="name">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>Product name:</FormLabel>
                  <Input {...field} placeholder="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="protein">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  isInvalid={form.errors.protein && form.touched.protein}
                >
                  <FormLabel>Protein:</FormLabel>
                  <Input {...field} placeholder="protein" />
                  <FormErrorMessage>{form.errors.protein}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="carbs">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  isInvalid={form.errors.carbs && form.touched.carbs}
                >
                  <FormLabel>Carbs:</FormLabel>
                  <Input {...field} placeholder="carbs" />
                  <FormErrorMessage>{form.errors.carbs}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="fat">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl isInvalid={form.errors.fat && form.touched.fat}>
                  <FormLabel>Fat:</FormLabel>
                  <Input {...field} placeholder="fat" />
                  <FormErrorMessage>{form.errors.fat}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="sugar">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  isInvalid={form.errors.sugar && form.touched.sugar}
                >
                  <FormLabel>Sugar:</FormLabel>
                  <Input {...field} placeholder="sugar" />
                  <FormErrorMessage>{form.errors.sugar}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Stack>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type="submit">Add product</Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};

export default ProductModalForm;
