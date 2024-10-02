import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function SentScreen() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <View style={{ marginTop: "70%", alignItems: "center" }}>
        <Ionicons name="checkmark-done-circle" size={90} color="green" />
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Sent</Text>
      </View>
      <TouchableOpacity
        style={{
          marginTop: "80%",
          backgroundColor: "grey",
          padding: 14,
          borderRadius: 20,
          alignItems: "center",
          width: "55%",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
          Done
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
