import CustomAlert from "@/common/components/elements/alert/Alert";
import AuthHeader from "@/modules/auth/components/elements/AuthHeader";
import SignInForm from "@/modules/auth/components/forms/SignInForm";
import SignUpForm from "@/modules/auth/components/forms/SignUpForm";
import { Box, Container, Flex, Stack, useBoolean } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import AuthImg from "public/images/Auth.png";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile
} from "react-firebase-hooks/auth";

function Auth() {
  const auth = getAuth();
  const [flag, setFlag] = useBoolean();

  const [createUserWithEmailAndPassword,,, authSignUpError] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword,,, authSignInError] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle,,, googleAuthError] =
    useSignInWithGoogle(auth);
  const [updateProfile,, updateError] = useUpdateProfile(auth);
  const authError =
    authSignUpError || authSignInError || googleAuthError || updateError;
  
  return (
    <Container
      maxW={"7xl"}
      p={{ base: "50px 40px", md: "60px 100px" }}
      h="100vh"
    >
      <Stack
        h="100%"
        align="center"
        direction={["column", "row"]}
        justify={["start", "center", "center", "space-between"]}
      >
        <Flex maxW="400px" w="100%" mb="auto" h="100%" direction="column">
          <AuthHeader setFlag={setFlag} flag={flag} />
          <Box w="100%">
            <CustomAlert status="error" error={authError} />
            {flag ? (
              <SignUpForm
                createUserWithEmailAndPassword={createUserWithEmailAndPassword}
                signInWithGoogle={signInWithGoogle}
                updateProfile={updateProfile}
              />
            ) : (
              <SignInForm
                signInWithEmailAndPassword={signInWithEmailAndPassword}
                signInWithGoogle={signInWithGoogle}
              />
            )}
          </Box>
        </Flex>

        <Box w="50%" display={{ base: "none", lg: "block" }}>
          <Image
            priority
            layout="responsive"
            objectFit="contain"
            src={AuthImg}
            alt="Auth page image"
          />
        </Box>
      </Stack>
    </Container>
  );
}

export default Auth;
