import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={{ backgroundColor: "orange" }}
      >
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </LinearGradient>
    </GestureHandlerRootView>
  );
}
