import  { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  getTrackingStatus,
  requestTrackingPermission,
} from 'react-native-turbo-tracking-transparency';

const STATUS_COLORS: Record<string, string> = {
  authorized: '#4CAF50',
  denied: '#F44336',
  restricted: '#FF9800',
  'not-determined': '#2196F3',
  unavailable: '#9E9E9E',
};

const STATUS_LABELS: Record<string, string> = {
  authorized: 'Authorized',
  denied: 'Denied',
  restricted: 'Restricted',
  'not-determined': 'Not Determined',
  unavailable: 'Unavailable',
};

export default function App() {
  const [status, setStatus] = useState<string>('checking...');

  const refreshStatus = useCallback(() => {
    const currentStatus = getTrackingStatus();
    setStatus(currentStatus);
  }, []);

  useEffect(() => {
    refreshStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestPermission = async () => {
    try {
      const result = await requestTrackingPermission();
      setStatus(result);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Tracking Transparency</Text>
        <Text style={styles.subtitle}>Turbo Module Example</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.statusContainer}>
          <Text style={styles.label}>Current Status</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: STATUS_COLORS[status] || '#eee' },
            ]}
          >
            <Text style={styles.statusText}>{STATUS_LABELS[status] || status}</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {status === 'not-determined'
              ? 'Permission has not been requested yet. Tap the button below to prompt the user.'
              : status === 'authorized'
              ? 'Tracking permission granted! You can now use the IDFA.'
              : status === 'denied'
              ? 'Tracking permission was denied. You should respect the user’s choice.'
              : 'App Tracking Transparency is only available on iOS 14+.'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleRequestPermission}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Request Permission</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={refreshStatus}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>Refresh Status</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.platformText}>
          Platform: {Platform.OS} {Platform.Version}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    padding: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#1E293B',
    margin: 24,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
  },
  statusText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  infoBox: {
    backgroundColor: '#334155',
    padding: 16,
    borderRadius: 16,
    marginBottom: 32,
  },
  infoText: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  platformText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '600',
  },
});
