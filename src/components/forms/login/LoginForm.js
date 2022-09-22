import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../../elements/form-elements/TextInput";
import {
  Button,
  VStack,
  Heading,
  Flex,
  Box,
  Divider,
  Text,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { BsArrow90DegLeft } from "react-icons/bs";
import NextLink from "next/link";

function LoginForm() {
  return (
    <VStack maxW="400px" w="100%" mb="auto">
      <NextLink href="/" passHref>
        <IconButton
          mr="auto"
          as="a"
          aria-label="Return to Home page"
          variant="unstyled"
          icon={<BsArrow90DegLeft />}
        />
      </NextLink>
      <Box p={["20px 0 40px", "50px 0 70px"]} w="100%">
        <Heading size={["xl", "2xl"]} fontWeight="bold" mb={["10px", "20px"]}>
          Let's sign you in.
        </Heading>
        <Text>
          Don't have account?{" "}
          <NextLink href="/register" passHref>
            <Link fontWeight="medium">Register!</Link>
          </NextLink>
        </Text>
      </Box>
      <Box w="100%">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid email adress")
              .required("Required"),
            password: Yup.string()
              .required("Required.")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput type="email" name="email" placeholder="Email" />
              <TextInput
                type="password"
                name="password"
                placeholder="Password"
              />

              <Flex align="center" m="5px 0">
                <Divider />
                <Text p="2" whiteSpace="nowrap">
                  or
                </Text>
                <Divider />
              </Flex>

              <Button leftIcon={<FcGoogle />} w="100%" variant="outline">
                Continue with Google
              </Button>

              <Button
                m={["2em 0 10px", "3em 0 10px"]}
                variant="solid"
                colorScheme="brand"
                w="100%"
                isLoading={isSubmitting}
                type="submit"
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </VStack>
  );
}

export default LoginForm;