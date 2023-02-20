import { useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { authUseContext } from "../store/authContext";
import { createUser } from "../util/auth";

function SignupScreen() {
  const [isAuthenticating, setisAuthenticating] = useState(false);
  const { authenticate } = authUseContext();

  const handleSignUp = async ({ email, password }) => {
    setisAuthenticating(true);
    try {
      const response = await createUser(email, password);
      const token = response.data.idToken;
      authenticate(token);
    } catch (error) {
      Alert.alert("authentication faild", "please ty again later");
      setisAuthenticating(false);
    }
  };
  if (isAuthenticating) {
    return <LoadingOverlay message="signup  you in..." />;
  }
  return <AuthContent onAuthenticate={handleSignUp} />;
}

export default SignupScreen;
