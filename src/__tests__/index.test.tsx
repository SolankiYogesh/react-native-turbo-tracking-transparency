import { getTrackingStatus, requestTrackingPermission } from '../index';
import { TrackingStatusEnum } from '../NativeTurboTrackingTransparency';

const mockGetTrackingStatus = jest.fn();
const mockRequestTrackingPermission = jest.fn();

jest.mock('../NativeTurboTrackingTransparency', () => ({
  __esModule: true,
  default: {
    getTrackingStatus: () => mockGetTrackingStatus(),
    requestTrackingPermission: () => mockRequestTrackingPermission(),
  },
  TrackingStatusEnum: {
    Authorized: 'authorized',
    Denied: 'denied',
    Restricted: 'restricted',
    NotDetermined: 'not-determined',
    Unavailable: 'unavailable',
  },
}));

jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
  },
  TurboModuleRegistry: {
    getEnforcing: jest.fn(),
  },
}));

describe('TurboTrackingTransparency', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return tracking status when on iOS', () => {
    mockGetTrackingStatus.mockReturnValue(TrackingStatusEnum.Authorized);
    const status = getTrackingStatus();
    expect(status).toBe(TrackingStatusEnum.Authorized);
  });

  it('should request tracking permission when on iOS', async () => {
    mockRequestTrackingPermission.mockResolvedValue(
      TrackingStatusEnum.Authorized
    );
    const status = await requestTrackingPermission();
    expect(status).toBe(TrackingStatusEnum.Authorized);
  });

  it('should return Authorized when not on iOS', () => {
    const { Platform } = require('react-native');
    Platform.OS = 'android';

    const status = getTrackingStatus();
    expect(status).toBe(TrackingStatusEnum.Authorized);

    // Reset for other tests
    Platform.OS = 'ios';
  });
});
