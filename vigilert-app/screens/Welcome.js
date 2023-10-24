// TODO: Refactor image paths to use dynamic imports or create a helper function
// TODO: Personalize onboarding screen titles and images to align with my app's branding
// TODO: Implement logic to navigate to the next screen when the "Get Started" button is tapped
// TODO: Style the onboarding screens to match my app's design and theme
// TODO: Incorporate additional animations or transitions to enhance the user experience
// TODO: Integrate localization for text content to ensure support for multiple languages
// TODO: Handle potential errors, such as missing images or failed animations, gracefully
// TODO: Conduct thorough testing of the Welcome screen across various devices and orientations to ensure responsiveness
// TODO: Enhance accessibility features, including screen reader compatibility and effective focus management
// TODO: Optimize image sizes and loading processes to boost performance and minimize load times
// TODO: Integrate analytics or event tracking to monitor user interactions on the onboarding screens


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import Swiper from 'react-native-swiper';
import getImageSource from '../helpers/ImageHelper';
import stylesClass, {classes} from '../assets/css/styles';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const { width, height } = Dimensions.get('window');

const Welcome = () => {
  const [showButton, setShowButton] = useState(false);
  const fadeAnim = new Animated.Value(0);

  // Get the navigation object
  const navigation = useNavigation();
  const onboardingScreens = [
    { title: 'Welcome to Vigilert', image: 'vigilert' },
    { title: 'Emergency Response', image:'emergency_response' },
    { title: 'Community Safety', image: 'community_safety' },
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
  const handleGetStarted = () => {
    // Navigate to the Registration screen
    navigation.navigate('Register');
  };
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        loop={false}
        onIndexChanged={handleSlideChange}
      >
        {onboardingScreens.map((screen, index) => (
          <View key={index} style={styles.slide}>
            <Image source={getImageSource(screen.image)} style={styles.image} />
            <Text style={styles.text}>{screen.title}</Text>
          </View>
        ))}
      </Swiper>
      <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: classes.tertiaryColor,
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
    color: classes.secondaryColor,
  },
  buttonContainer: {
    position: 'absolute',
    top: 650, // Adjust the distance from the top as needed
    right: 100, // Adjust the distance from the right as needed
  },

  getStartedButton: {
    backgroundColor: classes.secondaryColor, // A deep blue color
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: 'rgba(74, 144, 226, 0.5)', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4, // Shadow elevation for Android
  },
  getStartedButtonText: {
    color: classes.tertiaryColor,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase', // Uppercase text
  },
  
});

export default Welcome;