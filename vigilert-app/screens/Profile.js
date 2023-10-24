import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Bottombar from '../layout/Bottombar';
import stylesClass, { classes } from '../assets/css/styles';
import getImageSource from '../helpers/ImageHelper';

const Profile = ({ navigation }) => {
  const [name, setName] = useState('Abubakar Almuhandis');
  const [email, setEmail] = useState('abubakaralmuhandis@gmail.com');
  const [phone, setPhone] = useState('+2348123402377');
  const [address, setAddress] = useState('123 12th streeth, Shagari Quarters, kano state');
  const [profilePicture, setProfilePicture] = useState(true);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [currentSection, setCurrentSection] = useState('profile');
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  const handleSaveProfile = () => {
    // Save the updated profile information
    // You can add your logic here to save the data
    console.log('Profile information saved!');
    // Move to the next section or stage
    if (currentSection === 'profile') {
      setCurrentSection('contacts');
    } else if (currentSection === 'contacts') {
      setCurrentSection('complete');
    }
  };

  const handleAddEmergencyContact = () => {
    // Add the new emergency contact to the list
    if (newContactName && newContactPhone) {
      setEmergencyContacts([
        ...emergencyContacts,
        { name: newContactName, phone: newContactPhone },
      ]);
      // Clear the input fields after adding
      setNewContactName('');
      setNewContactPhone('');
    }
  };

  const renderProfileSection = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
      </View>
    );
  };

  const renderContactsSection = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.label}>Emergency Contacts</Text>
     <ScrollView style={styles.contactsScrollView}>
        {emergencyContacts.map((contact, index) => (
          <View key={index} style={styles.contactContainer}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactPhone}>{contact.phone}</Text>
          </View>
        ))}
      </ScrollView>
        <View style={styles.addContactContainer}>
          <TextInput
            style={styles.addContactInput}
            placeholder="Name"
            value={newContactName}
            onChangeText={setNewContactName}
          />
          <TextInput
            style={styles.addContactInput}
            placeholder="Phone"
            value={newContactPhone}
            onChangeText={setNewContactPhone}
          />
          <TouchableOpacity
            style={styles.addContactButton}
            onPress={handleAddEmergencyContact}
          >
            <Text style={styles.addContactText}>Add Emergency Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCompleteSection = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.label}>Profile Completed</Text>
        <Text>Your profile is complete! You can now use all features of the app.</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <Text style={styles.heading}>Abubakar Almuhandis</Text>
          <TouchableOpacity
            style={styles.profilePictureContainer}
            onPress={() => {
              // Handle uploading or changing profile picture
            }}
          >
            {profilePicture ? (
              <Image
                source={getImageSource('profile')}
                style={styles.profilePicture}
              />
            ) : (
              <FontAwesome name="user" size={80} color={classes.secondaryColor} />
            )}
          </TouchableOpacity>
        </View>
        {currentSection === 'profile' && renderProfileSection()}
        {currentSection === 'contacts' && renderContactsSection()}
        {currentSection === 'complete' && renderCompleteSection()}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveProfile}
        >
          <Text style={styles.saveButtonText}>
            {currentSection === 'profile' ? 'Next' : 'Finish'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Bottombar navigation={navigation} unreadAlerts={11} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: classes.tertiaryColor,
  },
  profileHeader: {
    backgroundColor: classes.tertiaryColor, // Adjusted background color
    alignItems: 'center',
    height: 200,
    marginTop: 100, // Adjusted marginTop
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 140,
    color: classes.secondaryColor,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginTop: -180, // Adjusted vertical alignment
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  section: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: classes.primaryColor,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderColor: classes.secondaryColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactsScrollView: {
    maxHeight: 150, // Set a maximum height for scrolling
    marginBottom: 3,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: classes.secondaryColor,
  },
  contactPhone: {
    fontSize: 16,
    color: classes.primaryColor,
  },
  addContactContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 130,
    marginBottom: 10,
    width: '70%', // Set width to 70% of the screen
    alignSelf: 'center', // Center horizontally
  },
  addContactInput: {
    width: '100%', // Make the input fields take up 100% of the container width
    fontSize: 16,
    borderColor: classes.secondaryColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10, // Add some margin between the input fields
  },
  addContactButton: {
    backgroundColor: classes.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  addContactText: {
    color: classes.tertiaryColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: classes.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20, // Move it above the Bottombar
  },
  saveButtonText: {
    color: classes.tertiaryColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
