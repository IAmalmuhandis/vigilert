import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [showButton, setShowButton] = useState(false);
  const fadeAnim = new Animated.Value(0);

  const onboardingScreens = [
    { title: 'Welcome to Vigilert', image: require('./assets/vigilert.png') },
    { title: 'Emergency Response', image: require('./assets/emergency_response.png') },
    { title: 'Community Safety', image: require('./assets/community_safety.png') },
  ];

  const handleSlideChange = (index) => {
    setShowButton(index === onboardingScreens.length - 1);
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showButton ? 1 : 0,
      duration: showButton ? 50 : 300,
      useNativeDriver: true,
    }).start();
  }, [showButton]);

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        loop={false}
        onIndexChanged={handleSlideChange}
      >
        {onboardingScreens.map((screen, index) => (
          <View key={index} style={styles.slide}>
            <Image source={screen.image} style={styles.image} />
            <Text style={styles.text}>{screen.title}</Text>
          </View>
        ))}
      </Swiper>
      <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.getStartedButton}>
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9eaec'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.4,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  buttonContainer: {
    position: 'absolute',
    top: 90, // Adjust the distance from the top as needed
    right: 20, // Adjust the distance from the right as needed
  },

  getStartedButton: {
    backgroundColor: '#333652',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  getStartedButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
