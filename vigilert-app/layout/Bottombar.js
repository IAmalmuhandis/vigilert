import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import stylesClass, { classes } from '../assets/css/styles';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook


const Bottombar = ({unreadAlerts }) => {
     // Get the navigation object
     const navigation = useNavigation();

  
  return (
    <View style={styles.bottombar}>
      <TouchableOpacity
        style={styles.bottombarItem}
        onPress={() => {
          // Handle navigation to the dashboard or other screens
          // Use navigation.navigate() to navigate to specific screens
          navigation.navigate('Dashboard');
       
        }}
      >
        <FontAwesome name="shield" size={30} color={classes.tertiaryColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottombarItem}
        onPress={() => {
          // Handle navigation to the Chat screen
          navigation.navigate('Chat');
        }}
      >
        <FontAwesome name="comments" size={30} color={classes.tertiaryColor} />
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.bottombarItem}
  onPress={() => {
    // Handle navigation to the Map screen
    navigation.navigate('Map');
  }}
>
  <FontAwesome name="map" size={30} color={classes.tertiaryColor} />
</TouchableOpacity>
      <TouchableOpacity
        style={styles.bottombarItem}
        onPress={() => {
          // Handle navigation to the Alerts screen
          navigation.navigate('Alerts');
          
        }}
      >
        <View>
          <FontAwesome name="bell" size={30} color={classes.tertiaryColor} />
          {unreadAlerts > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadAlerts}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    
      <TouchableOpacity
        style={styles.bottombarItem}
        onPress={() => {
          // Handle navigation to the profile screen
          navigation.navigate('Profile');
        }}
      >
        <FontAwesome name="user" size={30} color={classes.tertiaryColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottombar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: classes.secondaryColor,
  },
  bottombarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Bottombar;
