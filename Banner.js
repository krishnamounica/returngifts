// Banner.js
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Swiper from 'react-native-swiper';

const Banner = () => {
  const bannerImages = [
    { id: '1', image: require('./assets/icon.png') },
    { id: '2', image: require('./assets/icon.png') },
    { id: '3', image: require('./assets/icon.png') },
    // Ensure the images are correct
  ];

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}  // Hide navigation buttons
        autoplay={true}       // Auto-scroll the images
        autoplayTimeout={2.5} // Time between automatic image switches
        dotColor="#fff"       // Style for inactive dots
        activeDotColor="#00f" // Style for active dot
        loop={true}           // Loop the slider infinitely
      >
        {bannerImages.map((item) => (
          <View key={item.id} style={styles.slide}>
            {item.image ? (
              <Image source={item.image} style={styles.image} />
            ) : (
              <Text>No image available</Text>
            )}
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Space after search bar
  },
  wrapper: {
    height: 200, // Adjust height of the swiper
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 10,
  },
});

export default Banner;
