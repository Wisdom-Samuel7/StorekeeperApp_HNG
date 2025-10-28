import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Alert } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { getProducts, deleteProduct, initDB } from "../database";

export default function HomeScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  // 🔄 Load products from DB
  const loadProducts = async () => {
    await initDB();
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    const unsubscribe = router.addListener?.("focus", loadProducts);
    loadProducts();
    return unsubscribe;
  }, []);

  // 🗑️ Handle delete
  const handleDelete = async (id: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteProduct(id);
            await loadProducts();
            Alert.alert("Deleted!", "Product has been removed.");
          },
        },
      ]
    );
  };

  // 🧱 Render product card
  const renderItem = ({ item }) => (
    <Card style={{ marginBottom: 15, padding: 10 }}>
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: 150, borderRadius: 8 }}
          resizeMode="cover"
        />
      ) : null}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
        {item.name}
      </Text>
      <Text>Qty: {item.quantity}</Text>
      <Text>₦{item.price}</Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
        <Button
          mode="contained-tonal"
          onPress={() => router.push(`/edit?id=${item.id}`)}
        >
          Edit
        </Button>
        <Button
          mode="contained"
          buttonColor="red"
          textColor="white"
          onPress={() => handleDelete(item.id)}
        >
          Delete
        </Button>
      </View>
    </Card>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        icon="plus"
        mode="contained"
        style={{ marginBottom: 20 }}
        onPress={() => router.push("/add")}
      >
        Add Product
      </Button>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
