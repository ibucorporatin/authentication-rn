import { useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { authUseContext } from "../store/authContext";
import { login } from "../util/auth";

function LoginScreen() {
  const [isAuthenticating, setisAuthenticating] = useState(false);
  const { authenticate } = authUseContext();
  const handleSignin = async ({ email, password }) => {
    setisAuthenticating(true);
    try {
      const response = await login(email, password);
      const token = response.data.idToken;
      authenticate(token);
    } catch (error) {
      Alert.alert("authentication faild", "invalid username or password");
      setisAuthenticating(false);
    }
  };
  if (isAuthenticating) {
    return <LoadingOverlay message="logging you in..." />;
  }
  return <AuthContent isLogin onAuthenticate={handleSignin} />;
}

export default LoginScreen;
