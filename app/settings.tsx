import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Settings() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Knowurcraft Storekeeper 1.0</Text>
      <Text>Manage products locally with SQLite.</Text>
    </View>
  );
}
