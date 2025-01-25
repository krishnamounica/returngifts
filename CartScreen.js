import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from './store'; // Adjust the path

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear the cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: () => dispatch(clearCart()) },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.details}>Price: ${item.price}</Text>
      <Text style={styles.details}>Quantity: {item.quantity}</Text>
      <Button
        title="Remove"
        color="red"
        onPress={() => handleRemoveItem(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <Text style={styles.total}>Total Items: {totalQuantity}</Text>
          <Button title="Clear Cart" color="red" onPress={handleClearCart} />
        </>
      ) : (
        <Text style={styles.emptyMessage}>Your cart is empty!</Text>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
    marginVertical: 5,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  emptyMessage: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 50,
  },
});
