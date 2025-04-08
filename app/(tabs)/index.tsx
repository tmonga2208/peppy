import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Bluetooth, Navigation, Bell, Phone } from 'lucide-react-native';
import { useState } from 'react';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

export default function HomeScreen() {
  const router = useRouter();
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [isGPSEnabled, setIsGPSEnabled] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const handleBluetoothToggle = async (value: boolean) => {
    // Simulate permission for Bluetooth (depends on your lib/hardware)
    if (value) {
      Alert.alert('Bluetooth', 'Make sure Bluetooth is enabled from system settings.');
    }
    setIsBluetoothEnabled(value);
  };

  const handleGPSToggle = async (value: boolean) => {
    if (value) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required for GPS tracking.');
        return;
      }
    }
    setIsGPSEnabled(value);
  };

  const handleNotificationToggle = async (value: boolean) => {
    if (value) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Notification access is required.');
        return;
      }
    }
    setIsNotificationEnabled(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.togglesContainer}>
        <View style={styles.toggleRow}>
          <View style={styles.toggleLeft}>
            <Bluetooth size={24} color="#007AFF" />
            <Text style={styles.toggleText}>Bluetooth</Text>
          </View>
          <Switch
            value={isBluetoothEnabled}
            onValueChange={handleBluetoothToggle}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isBluetoothEnabled ? '#007AFF' : '#f4f3f4'}
          />
        </View>

        <View style={styles.toggleRow}>
          <View style={styles.toggleLeft}>
            <Navigation size={24} color="#007AFF" />
            <Text style={styles.toggleText}>GPS</Text>
          </View>
          <Switch
            value={isGPSEnabled}
            onValueChange={handleGPSToggle}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isGPSEnabled ? '#007AFF' : '#f4f3f4'}
          />
        </View>

        <View style={styles.toggleRow}>
          <View style={styles.toggleLeft}>
            <Bell size={24} color="#007AFF" />
            <Text style={styles.toggleText}>Notifications</Text>
          </View>
          <Switch
            value={isNotificationEnabled}
            onValueChange={handleNotificationToggle}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isNotificationEnabled ? '#007AFF' : '#f4f3f4'}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => router.push('/emergency-contacts')}>
        <Phone size={24} color="#fff" />
        <Text style={styles.emergencyButtonText}>Set Up Emergency Contacts</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  togglesContainer: {
    padding: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    marginLeft: 12,
    fontSize: 16,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
