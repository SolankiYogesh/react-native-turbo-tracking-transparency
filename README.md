# react-native-turbo-tracking-transparency 🛡️

A high-performance **React Native Turbo Module** for handling iOS App Tracking Transparency (ATT). Built with the new React Native architecture for maximum efficiency and seamless Type-Safety.

[![npm version](https://img.shields.io/npm/v/react-native-turbo-tracking-transparency.svg?style=flat-square)](https://www.npmjs.com/package/react-native-turbo-tracking-transparency)
[![license](https://img.shields.io/npm/l/react-native-turbo-tracking-transparency.svg?style=flat-square)](https://github.com/SolankiYogesh/react-native-turbo-tracking-transparency/blob/main/LICENSE)

## ✨ Features

- 🏎️ **Turbo Module Support**: Utilizes the New Architecture (JSI) for near-instant native calls.
- 📐 **Type-Safe**: Full TypeScript support with explicit Enums for tracking status.
- 📱 **iOS 14+ Ready**: Implements `ATTrackingManager` following Apple's privacy guidelines.
- 🛡️ **Safe Fallbacks**: Gracefully handles non-iOS platforms.

## 📦 Installation

```sh
npm install react-native-turbo-tracking-transparency
# or
yarn add react-native-turbo-tracking-transparency
```

Don't forget to install pods:

```sh
npx pod-install
```

## 🛠️ iOS Setup

You **must** add the `NSUserTrackingUsageDescription` key to your `Info.plist` file. This message will be displayed in the permission prompt.

```xml
<key>NSUserTrackingUsageDescription</key>
<string>We use your data to provide a personalized experience and show relevant ads.</string>
```

## 🚀 Usage

```tsx
import { 
  getTrackingStatus, 
  requestTrackingPermission,
  TrackingStatusEnum 
} from 'react-native-turbo-tracking-transparency';

// 1. Get current status
const status = getTrackingStatus();
console.log('Current tracking status:', status);

// 2. Request permission
const requestStatus = await requestTrackingPermission();
if (requestStatus === TrackingStatusEnum.Authorized) {
  // Safe to use IDFA
}
```

### Tracking Status Values

| Value | Description |
| :--- | :--- |
| `authorized` | Permission granted. |
| `denied` | Permission denied by user. |
| `restricted` | Permission restricted (e.g., parental controls). |
| `not-determined` | Permission not yet requested. |
| `unavailable` | ATT is not available on this device/platform. |

## 🧪 Testing

The library includes comprehensive tests using Jest.

```sh
yarn test
```

## 🤝 Contributing

Contributions are welcome! See the [Contributing Guide](CONTRIBUTING.md) to learn how to get started.

## 📄 License

MIT

---

Made with ❤️ by [Solanki Yogesh](https://github.com/SolankiYogesh)
