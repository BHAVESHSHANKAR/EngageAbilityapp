import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import Header from "../components/Header";
import Gobacktohome from "../components/gobacktohome";
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get("window");

// API configuration
const API_CONFIG = {
  baseURL: "https://engage-ability-api.vercel.app",
  endpoint: "/api/sensor-data",
  timeout: 8000,
  retryCount: 3,
  retryDelay: 2000,
};

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
});

function MentalDisability({ route }) {
  const { caretakerName = "Caretaker", instituteName = "Institute" } = route.params || {};

  const [personName, setPersonName] = useState("");
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [monitoringData, setMonitoringData] = useState([]);
  const [liveData, setLiveData] = useState({
    temperature: "N/A",
    heartRate: "N/A",
    spo2: "N/A",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  const fetchWithRetry = async (url, options = {}, retries = API_CONFIG.retryCount) => {
    try {
      const response = await api.get(url, options);
      return response.data;
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay));
        return fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  };

  const startMonitoring = () => {
    setShowPopup(true);
    setNetworkError(false);
  };

  const handlePopupSubmit = () => {
    if (!personName.trim()) {
      Alert.alert("Error", "Please enter a name");
      return;
    }
    setShowPopup(false);
    setIsMonitoring(true);
    setRequestCount(0);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPersonName("");
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    saveMonitoringData();
  };

  const saveMonitoringData = () => {
    if (!personName) return;

    let finalMood = "Unknown";
    const hr = liveData.heartRate === "N/A" ? 0 : parseInt(liveData.heartRate);
    
    if (!isNaN(hr)) {
      if (hr < 70) finalMood = "Relaxed";
      else if (hr <= 90) finalMood = "Stable";
      else finalMood = "Anxious";
    }

    const newEntry = {
      name: personName,
      temperature: liveData.temperature === "N/A" ? 0 : parseFloat(liveData.temperature).toFixed(1),
      heartRate: liveData.heartRate === "N/A" ? 0 : parseInt(liveData.heartRate),
      spo2: liveData.spo2 === "N/A" ? 0 : parseInt(liveData.spo2),
      mood: finalMood,
      timestamp: new Date().toLocaleString(),
    };

    setMonitoringData(prev => [newEntry, ...prev]);
    setPersonName("");
    setLiveData({ temperature: "N/A", heartRate: "N/A", spo2: "N/A" });
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchWithRetry(API_CONFIG.endpoint);
      setLiveData({
        temperature: data.temperature || "N/A",
        heartRate: data.heartRate || "N/A",
        spo2: data.spo2 || "N/A",
      });
      setNetworkError(false);
      setRequestCount(prev => prev + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
      setNetworkError(true);
      if (error.message === "Network Error" && requestCount === 0) {
        Alert.alert(
          "Connection Error",
          "Could not connect to the monitoring service. Please check your internet connection.",
          [{ text: "OK" }]
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (isMonitoring) {
      fetchData(); // Initial fetch
      interval = setInterval(fetchData, 10000); // Then every 10 seconds
    }
    return () => clearInterval(interval);
  }, [isMonitoring]);

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.nameCell]}>{item.name}</Text>
      <Text style={styles.tableCell}>{item.temperature}°C</Text>
      <Text style={styles.tableCell}>{item.heartRate}</Text>
      <Text style={styles.tableCell}>{item.spo2}%</Text>
      <Text style={[styles.tableCell, styles.moodCell, 
                   { color: item.mood === "Anxious" ? "#e74c3c" : 
                           item.mood === "Stable" ? "#2ecc71" : "#3498db" }]}>
        {item.mood}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>
          Welcome, {caretakerName}! ({instituteName})
        </Text>

        {networkError && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>⚠️ Connection unstable. Attempting to reconnect...</Text>
          </View>
        )}

        <View style={styles.monitoringControls}>
          {!isMonitoring ? (
            <TouchableOpacity onPress={startMonitoring} style={styles.startBtn}>
              <Text style={styles.buttonText}>Start New Monitoring Session</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={stopMonitoring} style={styles.stopBtn}>
              <Text style={styles.buttonText}>End Monitoring Session</Text>
            </TouchableOpacity>
          )}
        </View>

        {isLoading && <ActivityIndicator size="large" color="#00b4db" style={styles.loader} />}

        {isMonitoring && (
          <View style={styles.liveDataContainer}>
            <Text style={styles.sectionTitle}>Current Session</Text>
            <View style={styles.liveData}>
              <Text style={styles.monitoringTitle}>Monitoring: {personName}</Text>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Temperature:</Text>
                <Text style={styles.dataValue}>{liveData.temperature}°C</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Heart Rate:</Text>
                <Text style={styles.dataValue}>{liveData.heartRate} BPM</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>SpO2:</Text>
                <Text style={styles.dataValue}>{liveData.spo2}%</Text>
              </View>
            </View>
          </View>
        )}

        {monitoringData.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.sectionTitle}>Monitoring History</Text>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, styles.nameHeader]}>Name</Text>
                <Text style={styles.headerCell}>Temp</Text>
                <Text style={styles.headerCell}>HR</Text>
                <Text style={styles.headerCell}>SpO2</Text>
                <Text style={[styles.headerCell, styles.moodHeader]}>Status</Text>
              </View>
              <FlatList
                data={monitoringData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
              />
            </View>
          </View>
        )}
      </View>

      <Modal visible={showPopup} transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
            
            <Text style={styles.popupTitle}>New Monitoring Session</Text>
            <Text style={styles.popupSubtitle}>Enter the person's name to begin</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Patient Name"
              placeholderTextColor="#999"
              value={personName}
              onChangeText={setPersonName}
              autoFocus={true}
            />
            
            <TouchableOpacity
              onPress={handlePopupSubmit}
              style={[styles.submitButton, !personName.trim() && styles.disabledButton]}
              disabled={!personName.trim()}
            >
              <Text style={styles.buttonText}>Begin Monitoring</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Gobacktohome />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#1a3c5e",
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
    textTransform: "uppercase",
  },
  monitoringControls: {
    alignItems: "center",
    marginBottom: 25,
  },
  startBtn: {
    backgroundColor: "#00b4db",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  stopBtn: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  errorBanner: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontWeight: '500',
  },
  loader: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
    marginTop: 10,
  },
  liveDataContainer: {
    marginBottom: 30,
  },
  liveData: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  monitoringTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a3c5e',
    marginBottom: 15,
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dataLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  dataValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  historyContainer: {
    marginBottom: 20,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    backgroundColor: "white",
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    color: "#34495e",
    fontSize: 14,
  },
  nameHeader: {
    flex: 1.5,
  },
  moodHeader: {
    flex: 1.2,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
    backgroundColor: "white",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    color: "#34495e",
    fontSize: 14,
    paddingVertical: 5,
  },
  nameCell: {
    flex: 1.5,
    textAlign: 'left',
    paddingLeft: 10,
  },
  moodCell: {
    flex: 1.2,
    fontWeight: '500',
  },
  popupOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  popupContent: {
    width: width * 0.85,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  popupTitle: {
    fontSize: 20,
    color: "#1a3c5e",
    fontWeight: "700",
    marginBottom: 5,
    textAlign: "center",
  },
  popupSubtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 14,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#00b4db",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: "center",
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#bdc3c7",
  },
});

export default MentalDisability;