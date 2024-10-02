import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, View, SafeAreaView, Text } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function HomeScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateY.value = event.translationY;
      // Unable to archieve the curvy(bow) text with the gesture
      translateX.value = -Math.pow(event.translationY / 100, 2);
    },
    onEnd: () => {
      translateX.value = 0;
      translateY.value = 0;
    },
  });
  const rstyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));
  return (
    <Animated.View>
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
        </PanGestureHandler>
      </SafeAreaView>
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
