import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have `expo/vector-icons` installed

const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
    onSearch(''); // Clear the search results
  };

  const handleChange = (text) => {
    setSearchText(text);
    onSearch(text); // Update filtered products based on the text
  };

  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#aaa" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search products"
        value={searchText}
        onChangeText={handleChange}
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color="#aaa" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
    flex: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  clearButton: {
    marginLeft: 10,
  },
});
