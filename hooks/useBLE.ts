import { PermissionsAndroid, Platform } from 'react-native';
import * as ExpoDevice from 'expo-device';

const requestAndroid31Permissions = async () => {
  const bluetoothScanPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    {
      title: "Bluetooth Scan Permission",
      message: "Bluetooth Low Energy requires Bluetooth Scan permission",
      buttonPositive: "OK",
    }
  );
  const bluetoothConnectPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    {
      title: "Bluetooth Connect Permission",
      message: "Bluetooth Low Energy requires Bluetooth Connect permission",
      buttonPositive: "OK",
    }
  );
  const fineLocationPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "Location Permission",
      message: "Bluetooth Low Energy requires Location permission",
      buttonPositive: "OK",
    }
  );

  return (
    bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED &&
    bluetoothConnectPermission === PermissionsAndroid.RESULTS.GRANTED &&
    fineLocationPermission === PermissionsAndroid.RESULTS.GRANTED
  );
};

const requestPermissions = async () => {
  if (Platform.OS === "android") {
    if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Bluetooth Low Energy requires Location permission",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const isAndroid31PermissionsGranted = await requestAndroid31Permissions();
      return isAndroid31PermissionsGranted;
    }
  } else {
    // For iOS, permissions are handled differently and should be requested using react-native-permissions
    return true;
  }
};

export { requestPermissions };