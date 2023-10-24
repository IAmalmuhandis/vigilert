import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Image,Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import stylesClass, { classes } from '../assets/css/styles';
import getImageSource from '../helpers/ImageHelper';
const { width, height } = Dimensions.get('window');

const PopupHelper = ({ isVisible, message, type, onClose, screen }) => {
  const [popupVisible, setPopupVisible] = useState(isVisible);

  useEffect(() => {
    setPopupVisible(isVisible);
  }, [isVisible]);

  const getPopupBackgroundColor = () => {
    return classes.tertiaryColor;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={popupVisible}
      onRequestClose={() => {
        setPopupVisible(false);
        if (onClose) {
          onClose();
        }
      }}
    >
       <View style={styles.overlayContainer}>
      <View style={styles.popupContainer}>
        <View style={[styles.popupContent, { backgroundColor: getPopupBackgroundColor() }]}>
        <Image
  source={type === 'success' ? getImageSource('success') : getImageSource('error')}
  style={styles.image}
/>
          <Text style={styles.popupMessage}>{message}</Text>
          <TouchableOpacity
            style={styles.popupButton}
            onPress={() => {
              setPopupVisible(false);
              if (onClose) {
                onClose();
              }
            }}
          >
            <Text style={styles.popupButtonText}>{screen === 'Login' ? 'Proceed' : 'Ok'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background to cover the screen
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '40%', // Adjust this value to position the modal vertically
    left: '10%', // Adjust this value to position the modal horizontally
    width: '80%', // Adjust this value to set the modal width
    height: 'auto', // Set the height to 'auto' to adjust based on content
    // backgroundColor: classes.primaryColor, // Background color of the modal
    borderRadius: 10, // Adjust the border radius as needed
  
    zIndex: 999, // Adjust the z-index as needed to control its layering
  },
  popupContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.1,
    resizeMode: 'contain',
  },
  popupMessage: {
    color: classes.secondaryColor,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  popupButton: {
    backgroundColor: classes.secondaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: 'center',
  },
  popupButtonText: {
    color: classes.primaryColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PopupHelper;
