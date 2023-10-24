import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import Bottombar from '../layout/Bottombar'; // Import your BottomBar component
import stylesClass, { classes } from '../assets/css/styles';

const Alerts = ({ navigation }) => {
  // Sample list of alerts
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      message: 'Alert from Vigilante Group: A theft was reported in your neighborhood. Please be cautious and report any suspicious activity to local authorities.',
      timestamp: 'August 10, 2023 08:30 AM',
      type: 'Theft',
      dangerLevel: 'Moderate',
    },
    {
      id: '2',
      message: 'Important Announcement: The vigilante group has successfully apprehended a group of thieves operating in the area. Your cooperation is appreciated.',
      timestamp: 'August 9, 2023 05:15 PM',
      type: 'News',
      dangerLevel: 'Low',
    },
    {
      id: '3',
      message: 'Community Update: There have been no reported thefts in the past week. Stay vigilant and report any unusual activity to ensure the safety of our neighborhood.',
      timestamp: 'August 8, 2023 02:45 PM',
      type: 'Update',
      dangerLevel: 'None',
    },
    {
        id: '4',
        message: 'Emergency Alert: A severe weather warning has been issued for your area. Take necessary precautions and stay safe.',
        timestamp: 'August 7, 2023 11:00 AM',
        type: 'Weather Alert',
        dangerLevel: 'High',
      },
      {
        id: '5',
        message: 'Traffic Alert: Due to an accident, there are significant traffic delays on Main Street. Please plan your route accordingly.',
        timestamp: 'August 6, 2023 08:45 AM',
        type: 'Traffic',
        dangerLevel: 'Moderate',
      },
      {
        id: '6',
        message: 'Community Event: Join us for a neighborhood cleanup event this Saturday at the park. Let\'s keep our community clean!',
        timestamp: 'August 5, 2023 03:30 PM',
        type: 'Event',
        dangerLevel: 'Low',
      },
      {
        id: '7',
        message: 'Public Safety Advisory: The local police department has issued a safety advisory regarding recent break-ins. Secure your homes.',
        timestamp: 'August 4, 2023 09:20 PM',
        type: 'Safety',
        dangerLevel: 'High',
      },
     
  ]);

  // State to manage the popup/modal
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Function to open the popup/modal and set the selected alert
  const openPopup = (alert) => {
    setSelectedAlert(alert);
    setPopupVisible(true);
  };

  // Function to close the popup/modal
  const closePopup = () => {
    setSelectedAlert(null);
    setPopupVisible(false);
  };

  // Function to delete an alert
  const deleteAlert = (alertId) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== alertId));
    closePopup(); // Close the modal after deleting
  };

  // Popup/modal component
  const AlertPopup = ({ alert }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isPopupVisible}
      onRequestClose={closePopup}
    >
      <View style={styles.overlayContainer}>
        <View style={styles.popupContainer}>
          <View style={[styles.popupContent, { backgroundColor: classes.tertiaryColor }]}>
            <Text style={styles.popupAlertType}>Type: {alert.type}</Text>
            <Text style={styles.popupAlertTime}>Time: {alert.timestamp}</Text>
            <Text style={styles.popupAlertDanger}>Danger Level: {alert.dangerLevel}</Text>
            <Text style={styles.popupAlertText}>{alert.message}</Text>
            <TouchableOpacity
              style={[styles.popupButton, { backgroundColor: classes.secondaryColor }]}
              onPress={closePopup}
            >
              <Text style={[styles.popupButtonText, { color: classes.primaryColor }]}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.popupButton, { backgroundColor: classes.primaryColor }]}
              onPress={() => deleteAlert(alert.id)}
            >
              <Text style={[styles.popupButtonText, { color: classes.tertiaryColor }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Alerts</Text>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.alertItem}
            onPress={() => openPopup(item)} // Open the popup/modal when an alert is pressed
          >
            <Text style={styles.alertText}>{item.message}</Text>
          </TouchableOpacity>
        )}
      />
      {/* Include the BottomBar component */}
      <Bottombar navigation={navigation} unreadAlerts={11} />

      {/* Render the popup/modal */}
      {selectedAlert && <AlertPopup alert={selectedAlert} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: classes.secondaryColor,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 55,
    color: classes.tertiaryColor,
  },
  alertItem: {
    marginBottom: 16,
    backgroundColor: classes.tertiaryColor,
    padding: 16,
    borderRadius: 8,
  },
  alertText: {
    fontSize: 16,
  },
  popupButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 8, // Add margin between buttons
  },
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
    top: '25%', // Adjust this value to position the modal vertically
    left: '10%', // Adjust this value to position the modal horizontally
    width: '80%', // Adjust this value to set the modal width
    height: 'auto', // Set the height to 'auto' to adjust based on content
    borderRadius: 10, // Adjust the border radius as needed
    zIndex: 999, // Adjust the z-index as needed to control its layering
  },
  popupContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  popupAlertType: {
    color: classes.secondaryColor,
    fontSize: 18,
    marginBottom: 10,
  },
  popupAlertTime: {
    color: classes.secondaryColor,
    fontSize: 18,
    marginBottom: 10,
  },
  popupAlertDanger: {
    color: classes.secondaryColor,
    fontSize: 18,
    marginBottom: 10,
  },
  popupAlertText: {
    color: classes.secondaryColor,
    fontSize: 18,
    marginBottom: 15,
  },
  popupButtonText: {
    color: classes.primaryColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Alerts;
