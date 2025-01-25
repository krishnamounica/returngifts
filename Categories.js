import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import config from './config';

const Categories = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all'); // Track the active category
  const baseURL = config.BASE_URL;
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/categories`, {
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
        });
        setCategories([{ id: 'all', name: 'All' }, ...response.data]); // Add "All" as a default category
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (id) => {
    setActiveCategory(id); // Set the active category
    onCategorySelect(id); // Notify parent component
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Categories</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ea" />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                activeCategory === category.id ? styles.activeCategory : styles.inactiveCategory,
              ]}
              onPress={() => handleCategorySelect(category.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category.id ? styles.activeText : styles.inactiveText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategory: {
    backgroundColor: '#6200ea', // Active category background color
    borderWidth: 2,
    borderColor: '#4500b5',
  },
  inactiveCategory: {
    backgroundColor: '#e0e0e0', // Inactive category background color
    borderWidth: 1,
    borderColor: '#bdbdbd',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#fff', // Text color for active category
  },
  inactiveText: {
    color: '#000', // Text color for inactive category
  },
});
