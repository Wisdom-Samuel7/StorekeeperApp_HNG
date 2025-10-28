import React, { useState } from "react";
import { View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { addProduct } from "../database";
import { useRouter } from "expo-router";

export default function AddProduct() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAdd = async () => {
    if (!name || !price || !quantity) {
      alert("Please fill all fields before adding a product.");
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedQty = parseInt(quantity, 10);

    if (isNaN(parsedPrice) || isNaN(parsedQty)) {
      alert("Price and Quantity must be valid numbers.");
      return;
    }

    try {
      await addProduct(name.trim(), parsedPrice, parsedQty, image);
      alert("✅ Product added successfully!");
      router.back();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Failed to add product. See console for details.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <TextInput label="Product Name" value={name} onChangeText={setName} />

      <TextInput
        label="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TextInput
        label="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <Button mode="outlined" onPress={pickImage}>
        {image ? "Change Image" : "Pick Image"}
      </Button>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 120, height: 120, alignSelf: "center", marginTop: 10 }}
        />
      )}

      <Button mode="contained" onPress={handleAdd}>
        Add Product
      </Button>
    </View>
  );
}
