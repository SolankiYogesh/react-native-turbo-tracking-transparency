import { TurboModuleRegistry, type TurboModule } from 'react-native';
export enum TrackingStatusEnum {
  Authorized = 'authorized',
  Denied = 'denied',
  Restricted = 'restricted',
  NotDetermined = 'not-determined',
  Unavailable = 'unavailable',
}
export interface Spec extends TurboModule {
  getTrackingStatus(): TrackingStatusEnum;
  requestTrackingPermission(): Promise<TrackingStatusEnum>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'TurboTrackingTransparency'
);
