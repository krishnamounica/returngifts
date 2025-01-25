import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const RequestsScreen = (route) => {
  const { updatedRequests } = route.params || {}; // Retrieve passed requests
  const reduxRequests = useSelector((state) => state.user.user?.requests || []); // Fallback to Redux state

  // Use the updated requests or fallback to Redux state
  const displayRequests = updatedRequests || reduxRequests;

  return (
    <FlatList
      data={displayRequests}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.requestItem}>
          <Text style={styles.descriptionText}>
            {item.userName} has created a request for {item.name} to send a surprise gift "{item.productName}" costing ₹{item.productPrice} for his {item.relation}'s birthday. The request is currently pending approval. The delivery is planned for Pincode {item.pincode}, {item.state}, and the contact phone number provided is {item.phone}. The celebration is planned for {new Date(item.date).toLocaleDateString()}.
          </Text>
          <Text style={styles.noteText}>
            Note: The payment link will be available once the request is approved.
          </Text> 
        </View>
      )}
    />
  );
};

export default RequestsScreen;

const styles = StyleSheet.create({
  requestItem: {
    backgroundColor: '#f9f9f9', // Subtle off-white for better contrast
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 10, // Slightly more rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, // Enhanced shadow for Android
    borderWidth: 1,
    borderColor: '#dcdcdc', // Softer border color
  },
  descriptionText: {
    fontSize: 16,
    color: '#4a4a4a', // Neutral dark gray for readability
    lineHeight: 22, // Better line spacing for long text
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    color: '#d9534f', // Slightly bold red for note emphasis
    marginTop: 12,
    fontStyle: 'italic',
  },
});
 