import React, { useState, useEffect } from "react";
import { View, Image, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { getProducts, updateProduct } from "../database";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function EditProduct() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const all = await getProducts();
      const selected = all.find((p) => p.id == id);
      if (selected) {
        setProduct(selected);
        setImage(selected.image);
      } else {
        Alert.alert("Error", "Product not found");
        router.back();
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    if (!product) return;

    await updateProduct(product.id, product.name, product.quantity, product.price, image || "");
    Alert.alert("Success", "Product updated!");
    router.back();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (!product) return null;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        label="Product Name"
        value={product.name}
        onChangeText={(text) => setProduct({ ...product, name: text })}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Quantity"
        keyboardType="numeric"
        value={String(product.quantity)}
        onChangeText={(text) => setProduct({ ...product, quantity: Number(text) })}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Price"
        keyboardType="numeric"
        value={String(product.price)}
        onChangeText={(text) => setProduct({ ...product, price: Number(text) })}
        style={{ marginBottom: 10 }}
      />

      {image && (
        <Image source={{ uri: image }} style={{ width: 150, height: 150, marginBottom: 10 }} />
      )}

      <Button mode="contained" onPress={pickImage} style={{ marginBottom: 10 }}>
        Change Image
      </Button>
      <Button mode="contained" onPress={handleUpdate}>
        Update Product
      </Button>
    </View>
  );
}
