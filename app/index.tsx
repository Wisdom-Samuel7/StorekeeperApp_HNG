import React, { useState, useCallback } from "react";
import { View, FlatList, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useRouter, useFocusEffect } from "expo-router";
import { initDB, getProducts, deleteProduct } from "../database";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  // 🔁 Load all products from SQLite
  const loadProducts = async () => {
    try {
      await initDB();
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  // 🔥 Auto reload when screen is focused (after add/edit/delete)
  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  // 🗑️ Handle delete
  const handleDelete = async (id: number) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this product?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteProduct(id);
          loadProducts();
        },
      },
    ]);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>Qty: {item.quantity}</Text>
        <Text style={styles.details}>Price: ₦{item.price}</Text>
      </View>

      <View style={styles.actions}>
        <Button
          mode="contained"
          onPress={() => router.push(`/edit?id=${item.id}`)}
          style={styles.editBtn}
        >
          Edit
        </Button>
        <Button
          mode="contained"
          onPress={() => handleDelete(item.id)}
          style={styles.deleteBtn}
        >
          Delete
        </Button>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => router.push("/add")} style={styles.addBtn}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  addBtn: {
    marginBottom: 20,
    backgroundColor: "#007bff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  editBtn: {
    backgroundColor: "#28a745",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
  },
});
