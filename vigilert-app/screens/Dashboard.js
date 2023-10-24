import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Bottombar from '../layout/Bottombar';
import stylesClass, { classes } from '../assets/css/styles';

const Dashboard = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    // Request audio recording permissions when the component mounts
    requestAudioPermission();
  }, []);

  const requestAudioPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Audio Permission',
            message: 'App needs access to your microphone to record audio.',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Audio permission granted');
        } else {
          console.log('Audio permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);

    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      // Play the recorded audio
      const { sound } = await recording.createNewLoadedSoundAsync();
      setSound(sound);
      await sound.playAsync();

      console.log('Recording stopped and playing the sound...');
    } catch (error) {
      console.error('Error stopping audio recording: ', error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Call for Help Instantly</Text>
        <TouchableOpacity
          style={styles.panicButton}
          onPressIn={startRecording}
          onPressOut={stopRecording}
        >
          {isRecording ? (
            <FontAwesome name="microphone" size={80} color={classes.errorColor} />
          ) : (
            <FontAwesome name="exclamation-triangle" size={80} color={classes.errorColor} />
          )}
        </TouchableOpacity>
        <Text style={styles.subHeading}>Press and hold the panic button to record</Text>
      </View>
      <Bottombar unreadAlerts={11} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: classes.tertiaryColor,
  },
  content: {
    flex: 4,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: classes.secondaryColor,
  },
  subHeading: {
    fontSize: 18,
    color: classes.secondaryColor,
    marginTop: 10,
    textAlign: 'center',
  },
  panicButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: classes.errorColor,
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
  },
});

export default Dashboard;
