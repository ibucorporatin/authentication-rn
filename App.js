import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { authUseContext } from "./store/authContext";
import IconButton from "./components/ui/IconButton";
import axios from "axios";
import { useState } from "react";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { logout } = authUseContext();
  console.log(logout);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              size={30}
              color={tintColor}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { token, isAuthenticated } = authUseContext();

  return (
    <NavigationContainer>
      {isAuthenticated && <AuthenticatedStack />}
      {!isAuthenticated && <AuthStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [istryingLoading, setistryingLoading] = useState(true);
  const { setauthToken } = authUseContext();
  useEffect(() => {
    const fetchingToken = async () => {
      const storedtoken = await AsyncStorage.getItem("token");

      if (storedtoken) {
        setauthToken(storedtoken);
      }
      setistryingLoading(false);
    };
    fetchingToken();
  }, []);
  if (istryingLoading) {
    return <AppLoading />;
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
