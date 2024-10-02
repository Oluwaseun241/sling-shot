import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, StyleSheet, View, SafeAreaView, Text } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SentScreen from "./sent";

export default function HomeScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const TRANSLATE_Y_THRESHOLD = SCREEN_HEIGHT * 0.3;
  const [sent, setSent] = useState(false);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateY.value = event.translationY;
      // Unable to archieve the curvy(bezier curve) text with the gesture
      translateX.value = event.translationY / 2;
    },
    onEnd: () => {
      const slingFired = translateY.value > TRANSLATE_Y_THRESHOLD;
      if (slingFired) {
        // Trigger the "sent" animation when the threshold is reached
        translateY.value = withTiming(-SCREEN_HEIGHT, { duration: 500 }, () => {
          runOnJS(setSent)(true);
        });
      } else {
        translateY.value = withTiming(0);
        translateX.value = withTiming(0);
      }
    },
  });

  const rstyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  return (
    <Animated.View style={{ flex: 1 }}>
      {!sent ? (
        <SafeAreaView>
          <View style={styles.header}>
            <Ionicons name="person-circle" size={54} color="black" />
          </View>
          <PanGestureHandler onGestureEvent={panGesture}>
            <Animated.View style={[styles.body, rstyle]}>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>$4.50</Text>
              <Text
                style={{
                  marginTop: "10%",
                  fontSize: 24,
                  fontWeight: "600",
                  letterSpacing: 8,
                }}
              >
                SWIPE DOWN
              </Text>
            </Animated.View>
            <Animated.View>
              // here
              <MaterialIcons name="cancel" size={24} color="black" />
            </Animated.View>
          </PanGestureHandler>
        </SafeAreaView>
      ) : (
        <SentScreen />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
  },
  body: {
    alignItems: "center",
    marginTop: "55%",
  },
});
