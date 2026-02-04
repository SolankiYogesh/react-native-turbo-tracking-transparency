import { Platform } from 'react-native';
import TurboTrackingTransparency, {
  TrackingStatusEnum,
} from './NativeTurboTrackingTransparency';

export function getTrackingStatus() {
  if (Platform.OS !== 'ios' || !TurboTrackingTransparency) {
    return TrackingStatusEnum.Authorized;
  }
  return TurboTrackingTransparency.getTrackingStatus();
}

export function requestTrackingPermission() {
  if (Platform.OS !== 'ios' || !TurboTrackingTransparency) {
    return Promise.resolve(TrackingStatusEnum.Authorized);
  }
  return TurboTrackingTransparency.requestTrackingPermission();
}
