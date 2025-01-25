import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import config from './config';
export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    isAdmin: false,
    street: '',
    apartment: '',
    zip: '',
    city: '',
    country: '',
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const baseURL = config.BASE_URL;


  const handleRegister = async () => {
    // const url = 'http://localhost:3000/api/v1/users/register';
    const url = `${baseURL}/users/register`;

    // const headers = {
    //   'X-IBM-Client-Id': '4b539056-6a36-4987-8d68-7b80b1cabe58',
    //   'X-IBM-Client-Secret': 'lY3iB0iU4kR6lS3uV3yN1iD7lQ4aX0tF0uQ8dJ7bI2fN2eJ2qK',
    //   'Content-Type': 'application/json',
    //   Authorization:
    //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzc2YTQzOTk1OTQwZDJjNDgxY2I1MGUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MzU4ODExMzMsImV4cCI6MTczNTk2NzUzM30.Zyb9Yi902raaEmE6YMmS00j1fjBHA112Bzi9s8h1dpk',
    // };

    try {
      const response = await axios.post(url, formData, {});
      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'User registered successfully!');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register User</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={formData.phone}
        onChangeText={(text) => handleChange('phone', text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={formData.street}
        onChangeText={(text) => handleChange('street', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apartment"
        value={formData.apartment}
        onChangeText={(text) => handleChange('apartment', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ZIP Code"
        value={formData.zip}
        onChangeText={(text) => handleChange('zip', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={formData.city}
        onChangeText={(text) => handleChange('city', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={formData.country}
        onChangeText={(text) => handleChange('country', text)}
      />
      <Button title="Register" onPress={handleRegister} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
