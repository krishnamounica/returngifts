import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserData } from './store';
import axios from 'axios';

const Products = ({ selectedCategory, allProducts, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Access user from Redux store
  const [openRequest, setOpenRequest] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); // Control date picker visibility
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relation: 'Select your relation',
    occasion: 'Select occasion',
    date: new Date(),
    flatNumber: '',
    building: '',
    landmark: '',
    district: '',
    state: '',
    pincode: '',
    productId: null, // To store selected product ID
    productName:'',
    productPrice:0.0,
    status: "pending",
    userName:user.userName
  });

  const filteredProducts =
    selectedCategory === 'all'
      ? allProducts
      : allProducts.filter((product) => product.category.id === selectedCategory);

  const handleSendGift = async () => {
    if (!user) {
      Alert.alert('Error', 'User not found. Please log in.');
      return;
    }

    const { id, token, requests,userName } = user;

    // Serialize date before storing it in Redux or sending via API
    const serializedFormData = {
      ...formData,
      date: formData.date.toISOString(), // Convert Date to string
    };

    const updatedRequests = [...(requests || []), serializedFormData];

    try {
      const apiUrl = `${baseURL}/users/${id}`;
      const payload = { requests: updatedRequests };

      await axios.put(apiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          secret: 'my-dog-is-nice',
        },
      });

      // Dispatch updated requests to Redux store
      dispatch(saveUserData({ ...user, requests: updatedRequests }));

      Alert.alert('Success', 'Gift sent successfully!');
      setOpenRequest(false);

      // Navigate to Requests and pass serialized requests
      console.log(updatedRequests,"=====updatedRequests====")
      navigation.navigate('Requests', { updatedRequests });
    } catch (error) {
      console.error('Error updating requests:', error);
      Alert.alert('Error', 'Failed to send the gift. Please try again.');
    }
  };

  const handleOpenRequest = (productId,productName,productPrice,status,userName) => {
    // Open the modal and set product ID only if the product ID changes
    setFormData((prevData) => ({ ...prevData, productId,productName,productPrice,status,userName }));
    setOpenRequest(true); // Open the modal with the form
  };

  useEffect(() => {
    if (openRequest) {
      // Reset the form when the modal opens, if needed
      setFormData((prevData) => ({
        ...prevData,
        productId: prevData.productId || null, 
        productName:prevData.productName || null,
        productPrice: prevData.productPrice || 0.00,
        status:prevData.status || "pending" ,
        userName : prevData.userName
      }));
    }
  }, [openRequest]);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate && formData.date !== selectedDate) {
      setFormData({ ...formData, date: selectedDate });
    }
    setShowDatePicker(false); // Close the date picker after selection
  };

  return (
    <>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetails', { productId: item.id ,productName:item.name,productPrice:item.price,status:"pending",userName:user.userName })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addToCartBtn}
              onPress={() => handleOpenRequest(item.id,item.name,item.price,"pending",user.userName)} // Pass productId to the modal
            >
              <Text style={styles.addToCartText}>Send Gift</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal for the gift form */}
      <Modal
        visible={openRequest}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setOpenRequest(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Send a Gift</Text>

            {/* Name Input */}
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />

            {/* Phone Input */}
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={formData.phone}
              keyboardType="numeric"
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
            />

            {/* Relation Picker */}
            <Picker
              selectedValue={formData.relation}
              style={styles.picker}
              onValueChange={(itemValue) => setFormData({ ...formData, relation: itemValue })}
            >
              <Picker.Item label="Select Relation" value="Select your relation" />
              <Picker.Item label="Father" value="father" />
              <Picker.Item label="Mother" value="mother" />
              <Picker.Item label="Husband" value="husband" />
              <Picker.Item label="Wife" value="wife" />
              <Picker.Item label="Cousin" value="cousin" />
              <Picker.Item label="Uncle" value="uncle" />
              <Picker.Item label="Aunty" value="aunty" />
              <Picker.Item label="Other" value="other" />
            </Picker>

            {/* Occasion Picker */}
            <Picker
              selectedValue={formData.occasion}
              style={styles.picker}
              onValueChange={(itemValue) => setFormData({ ...formData, occasion: itemValue })}
            >
              <Picker.Item label="Select Occasion" value="Select occasion" />
              <Picker.Item label="Birthday" value="birthday" />
              <Picker.Item label="Marriage Day" value="marriage day" />
              <Picker.Item label="Other" value="other" />
            </Picker>

            {/* Date Picker */}
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.datePickerText}>
                {`Selected Date: ${formData.date.toLocaleDateString()}`}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={formData.date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            {/* Address Fields */}
            <TextInput
              style={styles.input}
              placeholder="Flat Number"
              value={formData.flatNumber}
              onChangeText={(text) => setFormData({ ...formData, flatNumber: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Apartment/Building Name"
              value={formData.building}
              onChangeText={(text) => setFormData({ ...formData, building: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Landmark (optional)"
              value={formData.landmark}
              onChangeText={(text) => setFormData({ ...formData, landmark: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="District"
              value={formData.district}
              onChangeText={(text) => setFormData({ ...formData, district: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="State"
              value={formData.state}
              onChangeText={(text) => setFormData({ ...formData, state: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Pincode"
              value={formData.pincode}
              keyboardType="numeric"
              onChangeText={(text) => setFormData({ ...formData, pincode: text })}
            />

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSendGift}>
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setOpenRequest(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Products;




// Styles remain the same
const styles = StyleSheet.create({
  // Styles remain unchanged
 


  grid: {
    paddingBottom: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  productCard: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#6200ea',
    marginBottom: 10,
  },
  addToCartBtn: {
    backgroundColor: '#6200ea',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
  },
  noProducts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsText: {
    fontSize: 16,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 24, // Larger font size
    fontWeight: 'bold', // Bold text
    marginBottom: 20, // Space below the title
    textAlign: 'center', // Center alignment
    color: '#007bff', // Highlighted color
    textTransform: 'uppercase', // Uppercase letters
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Subtle text shadow
    textShadowOffset: { width: 1, height: 1 }, // Shadow position
    textShadowRadius: 2, // Blurred shadow
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  datePickerText: {
    fontSize: 16,
    color: '#555',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});