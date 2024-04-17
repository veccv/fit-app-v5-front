import { components } from "@/utils/generated-schema";
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
import { round } from "@popperjs/core/lib/utils/math";

interface EditCustomProductProp {
  product: components["schemas"]["Product"];
  products: components["schemas"]["Product"][];
  index: number;
  onClose: () => void;
  setProducts: (products: components["schemas"]["Product"][]) => void;
}

const EditCustomProductModal = ({
  product,
  index,
  onClose,
  setProducts,
  products,
}: EditCustomProductProp) => {
  const schema = z.object({
    weight: z.string().min(1, "Weight is required"),
  });

  const calculate = (weight: number, elementToCalculate: number) => {
    if (weight && elementToCalculate)
      return round((weight / 100) * elementToCalculate);
    return 0;
  };

  return (
    <Formik
      initialValues={
        product ?? {
          name: "",
          protein: "",
          carbs: "",
          fat: "",
          sugar: "",
          weight: "",
          calories: "",
        }
      }
      onSubmit={(values) => {
        if (product) {
          const newProducts = [...products];
          newProducts[index] = values;
          setProducts(newProducts);
        } else {
          setProducts([...products, values]);
        }
        onClose();
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
            <Field name="protein">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  isInvalid={form.errors.protein && form.touched.protein}
                >
                  <FormLabel>Protein:</FormLabel>
                  <Input disabled {...field} placeholder="protein" />
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
                  <Input disabled {...field} placeholder="carbs" />
                  <FormErrorMessage>{form.errors.carbs}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="fat">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl isInvalid={form.errors.fat && form.touched.fat}>
                  <FormLabel>Fat:</FormLabel>
                  <Input disabled {...field} placeholder="fat" />
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
                  <Input disabled {...field} placeholder="sugar" />
                  <FormErrorMessage>{form.errors.sugar}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="weight">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  isInvalid={form.errors.weight && form.touched.weight}
                >
                  <FormLabel>Weight:</FormLabel>
                  <Input
                    {...field}
                    placeholder="weight"
                    onChange={(e) => {
                      const weight = e.target.value;
                      form.setFieldValue("weight", weight);
                      form.setFieldValue(
                        "protein",
                        calculate(parseInt(weight), parseInt(product.protein)),
                      );
                      form.setFieldValue(
                        "carbs",
                        calculate(parseInt(weight), parseInt(product.carbs)),
                      );
                      form.setFieldValue(
                        "fat",
                        calculate(parseInt(weight), parseInt(product.fat)),
                      );
                      form.setFieldValue(
                        "sugar",
                        calculate(parseInt(weight), parseInt(product.sugar)),
                      );
                      form.setFieldValue(
                        "calories",
                        calculate(parseInt(weight), parseInt(product.calories)),
                      );
                    }}
                  />
                  <FormErrorMessage>{form.errors.weight}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="calories">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  isInvalid={form.errors.calories && form.touched.calories}
                >
                  <FormLabel>Calories:</FormLabel>
                  <Input disabled {...field} placeholder="calories" />
                  <FormErrorMessage>{form.errors.calories}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Stack>
          <ModalFooter>
            {product && (
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  // ManageData(
                  //   "DELETE",
                  //   `/api/api/v1/product?id=${product.id}`,
                  // ).then(() => {
                  //   mutate(`/api/api/v1/product/search?query=${query}`).then(
                  //     onClose,
                  //   );
                  // });
                }}
              >
                Delete
              </Button>
            )}
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type="submit">{product ? "Update" : "Create"}</Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};

export default EditCustomProductModal;
