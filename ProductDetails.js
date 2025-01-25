import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  Button,
} from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItem } from './store'; // Ensure this is the correct path to your Redux store

const ProductDetails = ({ route }) => {
  const { productId } = route.params; // Get productId from route params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://192.168.1.4:3000/api/v1/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        Alert.alert('Error', 'Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addItem({
          id: product.id,
          title: product.name,
          price: product.price,
        })
      );
      Alert.alert('Success', `${product.name} has been added to your cart!`);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.noProduct}>
        <Text style={styles.noProductText}>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.brand}>Brand: {product.brand}</Text>
      <Text style={styles.category}>Category: {product.category.name}</Text>
      {product.category.icon && (
        <Image
          source={{ uri: `http://192.168.1.4:3000/icons/${product.category.icon}` }}
          style={styles.icon}
        />
      )}
      <Text style={styles.price}>${product.price}</Text>

      <Text style={styles.stock}>In Stock: {product.countInStock}</Text>
      <Text style={styles.rating}>
        Rating: {product.rating} ({product.numReviews} reviews)
      </Text>

      <Text style={styles.descriptionTitle}>Description:</Text>
      <Text style={styles.description}>{product.description}</Text>

      <Text style={styles.richDescriptionTitle}>Rich Description:</Text>
      <Text style={styles.richDescription}>{product.richDescription}</Text>

      {product.images && product.images.length > 0 && (
        <View style={styles.imagesContainer}>
          {product.images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.additionalImage} />
          ))}
        </View>
      )}

      {/* Add to Cart Button */}
      <Button title="send Gift" color="#6200ea" onPress={handleAddToCart} />
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  brand: {
    fontSize: 18,
    marginBottom: 10,
    color: '#6200ea',
  },
  category: {
    fontSize: 18,
    marginBottom: 10,
    color: '#6200ea',
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200ea',
  },
  stock: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  rating: {
    fontSize: 18,
    marginBottom: 10,
    color: '#ff9800',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  richDescriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  richDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  imagesContainer: {
    marginTop: 20,
  },
  additionalImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProduct: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductText: {
    fontSize: 16,
    color: '#888',
  },
});
