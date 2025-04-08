import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  useColorScheme,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import { Bluetooth, ChevronLeft, Smartphone, RefreshCw } from 'react-native-feather';
import { BleManager } from 'react-native-ble-plx';

const BluetoothSearchScreen = () => {
  const [devices, setDevices] = useState([]);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const strokeColor = colorScheme === 'dark' ? 'white' : 'black';
  const manager = useRef(new BleManager()).current;

  useEffect(() => {
    startAnimations();
    requestPermissions();

    return () => {
      manager.destroy();
    };
  }, []);

  const startAnimations = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(progressAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
      const isGranted = Object.values(granted).every(p => p === PermissionsAndroid.RESULTS.GRANTED);
      if (isGranted) {
        scanForDevices();
      }
    } else {
      scanForDevices();
    }
  };

  const scanForDevices = () => {
    setDevices([]); // clear previous scan
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Scan error:', error);
        return;
      }

      if (device && device.name) {
        setDevices(prev => {
          const exists = prev.find(d => d.id === device.id);
          return exists ? prev : [...prev, device];
        });
      }
    });

    setTimeout(() => {
      manager.stopDeviceScan();
    }, 10000);
  };

  const progressInterpolate = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className='flex flex-1 bg-white dark:bg-black'>
      <View className='flex flex-row items-center px-4 pt-16 pb-8'>
        <TouchableOpacity className='p-2'>
          <ChevronLeft stroke={strokeColor} width={24} height={24} />
        </TouchableOpacity>
      </View>

      <View className='flex flex-1 items-center px-6'>
        <View className='w-32 h-32 mt-12 mb-8'>
          <View style={styles.progressCircle}>
            <Animated.View
              style={[
                styles.progressLayer,
                {
                  transform: [{ rotateZ: progressInterpolate }],
                },
              ]}
            />
            <View>
              <Bluetooth stroke={strokeColor} width={24} height={24} />
            </View>
          </View>
        </View>

        <Text style={styles.searchingText}>Searching for devices...</Text>
        <Text style={styles.helpText}>
          Make sure your Pepper Spray is unlocked and its Bluetooth is enabled
        </Text>

        <View style={styles.historySection}>
          <View className='flex flex-row justify-between mb-4 items-center'>
            <Text className='text-lg dark:text-white text-black font-semibold'>Nearby Devices</Text>
            <TouchableOpacity onPress={scanForDevices}>
              <RefreshCw stroke={strokeColor} />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ maxHeight: 300 }}>
            {devices.length === 0 ? (
              <Text style={{ color: strokeColor }}>No devices found</Text>
            ) : (
              devices.map(device => (
                <View style={styles.deviceItem} key={device.id}>
                  <Smartphone stroke="#000" width={20} height={20} />
                  <Text style={styles.deviceName}>{device.name || 'Unnamed Device'}</Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressLayer: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#007AFF',
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotateZ: '-45deg' }],
  },
  searchingText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  historySection: {
    width: '100%',
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 10,
  },
  deviceName: {
    marginLeft: 12,
    fontSize: 16,
  },
});

export default BluetoothSearchScreen;