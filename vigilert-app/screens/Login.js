import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import PopupHelper from '../helpers/PopupHelper';
import stylesClass, {classes} from '../assets/css/styles';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');

  // Get the navigation object
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!email || !password) {
      setPopupMessage('Please fill in all fields');
      setPopupType('error');
      setPopupVisible(true);
      return;
    }



    setIsLoading(true);
    // Simulate registration success
    // Simulate registration success
    setTimeout(() => {
      setIsLoading(false);
      
      // Check if registration was successful
      const loginSuccessful = true; // Replace with your actual registration logic
      
      if (loginSuccessful) {
        setPopupMessage('Login Successful!');
        setPopupType('success');
      } else {
        setPopupMessage('Login failed. Please try again.');
        setPopupType('error');
      }
  
      setPopupVisible(true);
  
      // Navigate to the next screen upon successful registration
      // You can use navigation library like React Navigation
    }, 2000);
  };
  const handleDontHaveAccount = () => {
    navigation.navigate('Register');
  
  };
  const closePopup = () => {
    setPopupVisible(false);
    if(popupType == 'success')
      navigation.navigate('Dashboard');
 
  };
  return (
    <View style={styles.container}>
     <View style={stylesClass.header}>
        <Text style={stylesClass.heading}>Login to your Account</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDontHaveAccount} style={styles.alreadyHaveAccount}>
        <Text style={styles.alreadyHaveAccountText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
      <PopupHelper
        isVisible={popupVisible}
        message={popupMessage}
        type={popupType}
        onClose={closePopup}
        screen={'Login'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor : classes.tertiaryColor
  },
 
   input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  registerButton: {
    backgroundColor: classes.primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: classes.secondaryColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  alreadyHaveAccount: {
    marginTop: 20,
  },
  alreadyHaveAccountText: {
    color: classes.secondaryColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
