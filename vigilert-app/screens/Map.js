import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker, Heatmap } from 'react-native-maps';
import Bottombar from '../layout/Bottombar';
import * as Location from 'expo-location';
import * as LocationGeocoding from 'expo-location';
import stylesClass, { classes } from '../assets/css/styles';

const MapScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [heatmapData, setHeatmapData] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [activeLogIndex, setActiveLogIndex] = useState(null); // State to track active log index
  const [logs, setLogs] = useState([
    { type: 'Theft', color: classes.secondaryColor, details: 'Details about theft heatmap', location: 'Location A', time: '10:00 AM', date: '2024-04-18', severity: 'High', occurrences: [
      { time: '10:00 AM', date: '2024-04-18', severity: 'High', description: 'Stolen items: Wallet, Phone' },
      { time: '12:30 PM', date: '2024-04-18', severity: 'Moderate', description: 'Attempted theft, no loss' },
      // Add more occurrences as needed
    ] },
    { type: 'Fire', color : classes.secondaryColor, details: 'Details about fire heatmap', location: 'Location B', time: '11:30 AM', date: '2024-04-18', severity: 'Moderate', occurrences: [
      { time: '11:30 AM', date: '2024-04-18', severity: 'Moderate', description: 'Small fire extinguished quickly' },
      { time: '03:00 PM', date: '2024-04-18', severity: 'Low', description: 'Smoke reported, no fire' },
      // Add more occurrences as needed
    ] },
    { type: 'Traffic', color : classes.secondaryColor, details: 'Details about traffic heatmap', location: 'Location C', time: '01:00 PM', date: '2024-04-18', severity: 'Low', occurrences: [
      { time: '01:00 PM', date: '2024-04-18', severity: 'Low', description: 'Heavy traffic due to accident' },
      { time: '04:30 PM', date: '2024-04-18', severity: 'Low', description: 'Road cleared, traffic flow normal' },
      // Add more occurrences as needed
    ] },
    { 
        type: 'Assault', 
        color: classes.secondaryColor, 
        details: 'Details about assault incidents heatmap', 
        location: 'Location D', 
        time: '02:30 PM', 
        date: '2024-04-18', 
        severity: 'High', 
        occurrences: [
          { time: '02:30 PM', date: '2024-04-18', severity: 'High', description: 'Physical assault reported' },
          { time: '04:45 PM', date: '2024-04-18', severity: 'Moderate', description: 'Verbal assault incident' },
          // Add more occurrences as needed
        ] 
      },
      { 
        type: 'Medical Emergency', 
        color: classes.secondaryColor, 
        details: 'Details about medical emergencies heatmap', 
        location: 'Location E', 
        time: '03:45 PM', 
        date: '2024-04-18', 
        severity: 'High', 
        occurrences: [
          { time: '03:45 PM', date: '2024-04-18', severity: 'High', description: 'Heart attack reported' },
          { time: '05:15 PM', date: '2024-04-18', severity: 'Moderate', description: 'Injury from accident' },
          // Add more occurrences as needed
        ] 
      },
      { 
        type: 'Natural Disaster', 
        color: classes.secondaryColor, 
        details: 'Details about natural disasters heatmap', 
        location: 'Location F', 
        time: '05:00 PM', 
        date: '2024-04-18', 
        severity: 'Extreme', 
        occurrences: [
          { time: '05:00 PM', date: '2024-04-18', severity: 'Extreme', description: 'Earthquake reported' },
          { time: '06:30 PM', date: '2024-04-18', severity: 'High', description: 'Flooding in the area' },
          // Add more occurrences as needed
        ] 
      }      
  ]);
  
  // Function to get the address from coordinates using reverse geocoding
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const location = await LocationGeocoding.reverseGeocodeAsync({ latitude, longitude });
      if (location && location[0]) {
        const { name } = location[0];
        return name;
      }
    } catch (error) {
      console.error('Error getting address from coordinates:', error);
    }
    return 'Unknown Location';
  };

  const generateHeatmapData = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const simulatedData = [];
    for (let i = 0; i < 10; i++) {
      const randomLatOffset = Math.random() * 0.005;
      const randomLngOffset = Math.random() * 0.005;
      const category = Math.random() > 0.5 ? 'theft' : (Math.random() > 0.3 ? 'fire' : 'traffic');
      simulatedData.push({
        latitude: location.coords.latitude + randomLatOffset,
        longitude: location.coords.longitude + randomLngOffset,
        weight: Math.floor(Math.random() * 10) + 1,
        category,
      });
    }
    setHeatmapData(simulatedData);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });

      generateHeatmapData();
    })();
  }, []);

  const handleSelectLog = async (log, index) => {
    // Get the address from coordinates and update the selected log's location
    const locationName = await getAddressFromCoordinates(region.latitude, region.longitude);
    setSelectedLog({ ...log, location: locationName });
    setActiveLogIndex(index); // Update active log index
    generateHeatmapData();
  };

  const LogDetailsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={selectedLog !== null}
      onRequestClose={() => setSelectedLog(null)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeading}>{selectedLog?.type} Details</Text>
          <View style={styles.detailsTable}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Location:</Text>
              <Text style={styles.tableData}>{selectedLog?.location}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Occurrences:</Text>
            </View>
            {selectedLog?.occurrences.map((occurrence, occurrenceIndex) => (
              <View key={occurrenceIndex} style={styles.tableRow}>
                <Text style={styles.tableData}>Time: {occurrence.time}</Text>
                <Text style={styles.tableData}>Date: {occurrence.date}</Text>
                <Text style={styles.tableData}>Severity: {occurrence.severity}</Text>
                <Text style={styles.tableData}>Description: {occurrence.description}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedLog(null)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
  
  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={region}
          region={region}
          showsUserLocation={true}
          zoomEnabled={true}
          scrollEnabled={true}
        >
          <Marker coordinate={region} title="My Location" />
          {heatmapData.length > 0 && (
            <Heatmap
              points={heatmapData}
              radius={40}
              opacity={0.7}
            />
          )}
        </MapView>
      </View>
      <ScrollView style={styles.logContainer}>
        {logs.map((log, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.logCard, { backgroundColor: activeLogIndex === index ? 'green' : log.color }]}
            onPress={() => handleSelectLog(log, index)}
          >
            <Text style={styles.logText}>{log.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <LogDetailsModal />
      <Bottombar navigation={navigation} unreadAlerts={11} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  logContainer: {
    maxHeight: 300,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom : 20,
  },
  logCard: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  logText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%', // Adjust width as needed
    maxHeight: '80%', // Adjust height as needed
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsTable: {
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  tableData: {
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MapScreen;