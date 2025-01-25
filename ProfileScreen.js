// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button, Share } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  const appLink = 'exp://192.168.1.4:8081'; // Replace with your app's actual link

  const handleLogout = () => {
    navigation.replace('LoginScreen');
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this awesome app! Download it here: ${appLink}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Ionicons
        name="share-social-outline"
        size={30}
        color="blue"
        style={styles.shareIcon}
        onPress={handleShare}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  shareIcon: {
    marginTop: 20,
  },
});
