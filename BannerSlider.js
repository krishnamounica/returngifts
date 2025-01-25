import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Image, FlatList, Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

// Banner Slider Component
const BannerSlider = () => {
  const banners = [
    { id: '1', image: 'https://via.placeholder.com/600x200?text=Banner+1' },
    { id: '2', image: 'https://via.placeholder.com/600x200?text=Banner+2' },
    { id: '3', image: 'https://via.placeholder.com/600x200?text=Banner+3' },
  ];

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.image }} style={styles.bannerImage} />
  );

  return (
    <View style={styles.bannerContainer}>
      <FlatList
        data={banners}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
      />
    </View>
  );
};

// Home Screen Component
// export default function HomeScreen({ navigation }) {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     const getLocation = async () => {
//       try {
//         const permissionGranted = await requestLocationPermission();
//         if (!permissionGranted) {
//           Alert.alert('Permission Denied', 'Location permission is required.');
//           return;
//         }

//         Geolocation.getCurrentPosition(
//           (position) => {
//             setLocation({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             });
//           },
//           (error) => {
//             Alert.alert('Error', error.message);
//           },
//           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//       } catch (error) {
//         console.error(error);
//         Alert.alert('Error', 'Unable to get location.');
//       }
//     };

//     getLocation();
//   }, []);

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await Geolocation.requestAuthorization('whenInUse');
//       return granted === 'granted';
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image
//           source={{ uri: 'https://via.placeholder.com/50x50?text=Logo' }}
//           style={styles.logo}
//         />
//         <Text style={styles.headerTitle}>Return Gifts</Text>
//       </View>
//       {/* <BannerSlider /> */}
//       <Text style={styles.title}>Welcome to the Home Screen!</Text>
//       {location ? (
//         <Text style={styles.locationText}>
//           Your Current Location:
//           {'\n'}Latitude: {location.latitude}
//           {'\n'}Longitude: {location.longitude}
//         </Text>
//       ) : (
//         <Text style={styles.locationText}>Fetching location...</Text>
//       )}
//       <Button title="Logout" onPress={() => navigation.replace('LoginScreen')} />
//     </View>
//   );
// }

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#6200ea',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  bannerContainer: {
    height: 200, // Fixed height for the banner slider
    marginBottom: 20,
  },
  bannerImage: {
    width: Dimensions.get('window').width,
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  locationText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
});
