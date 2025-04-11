import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "toastify-react-native";

import Login from "./components/Login";
import Register from "./components/Register";
import BottomTabs from "./components/BottomTabs";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Crear cuenta" }}
        />
        <Stack.Screen
          name="Home"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
