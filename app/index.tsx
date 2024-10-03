import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SentScreen from "./sent";
import { BlurView } from "@react-native-community/blur";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const TRANSLATE_Y_THRESHOLD = SCREEN_HEIGHT * 0.27;
  const [text, setText] = useState("SWIPE DOWN");
  const [button, setButton] = useState(false);
  const [sent, setSent] = useState(false);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateY.value = event.translationY;
      // Unable to archieve the curvy(bezier curve) text with the gesture
      translateX.value = event.translationY / 2;
      if (event.translationY > TRANSLATE_Y_THRESHOLD) {
        runOnJS(setButton)(true);
        runOnJS(setText)("RELEASE TO SEND");
      } else {
        runOnJS(setButton)(false);
        runOnJS(setText)("SWIPE DOWN");
      }
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

  const gradientStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, TRANSLATE_Y_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity: withTiming(opacity),
    };
  });

  return (
    <Animated.View style={{ flex: 1, backgroundColor: "#525354" }}>
      {!sent ? (
        <SafeAreaView>
          <Animated.View style={[styles.header, gradientStyle]}>
            <Ionicons name="person-circle" size={54} color="white" />
          </Animated.View>
          <PanGestureHandler onGestureEvent={panGesture}>
            <Animated.View style={[styles.body, rstyle]}>
              <Text
                style={{ fontSize: 30, fontWeight: "bold", color: "white" }}
              >
                $4.50
              </Text>
              <Text
                style={{
                  color: "white",
                  marginTop: "10%",
                  fontSize: 24,
                  fontWeight: "600",
                  letterSpacing: 8,
                }}
              >
                {text}
              </Text>
            </Animated.View>
          </PanGestureHandler>
          {!button ? (
            <Animated.View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: "10%",
                marginTop: "80%",
              }}
            >
              <TouchableOpacity style={styles.button}>
                <Entypo name="edit" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <MaterialIcons name="cancel" size={24} color="white" />
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <View />
          )}
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
  button: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: "grey",
  },
});
