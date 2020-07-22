# react-native-location-settings-enabler

[![GitHub version](https://badge.fury.io/gh/YsnKsy%2Freact-native-location-settings-enabler.svg)](https://github.com/YsnKsy/react-native-location-settings-enabler)
[![npm version](https://badge.fury.io/js/react-native-location-settings-enabler.svg)](https://www.npmjs.com/package/react-native-location-settings-enabler/)
![Last Release](https://github.com/YsnKsy/react-native-location-settings-enabler/workflows/Release/badge.svg)
![Pull Request](https://github.com/YsnKsy/react-native-location-settings-enabler/workflows/Pull%20Request/badge.svg)
[![GitHub issues](https://img.shields.io/github/issues/YsnKsy/react-native-location-settings-enabler)](https://github.com/YsnKsy/react-native-location-settings-enabler/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/YsnKsy/react-native-location-settings-enabler/blob/master/CONTRIBUTING.md)

![Platform - Android](https://img.shields.io/badge/platform-Android-green.svg)
[![styled with Prettier](https://img.shields.io/badge/styled_with-Prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![GitHub license](https://img.shields.io/github/license/YsnKsy/react-native-location-settings-enabler)](https://github.com/YsnKsy/react-native-location-settings-enabler/blob/master/LICENSE)

This package makes it easy for an React Native App to ensure that the Android device&#39;s system settings are properly configured for the app&#39;s location needs. If your app needs to request location, the device needs to enable the appropriate system settings, such as GPS or Wi-Fi scanning. Rather than directly enabling services such as the device&#39;s GPS, your app specifies the required level of accuracy/power consumption, and the device automatically makes the appropriate changes to system settings.

## Installation

```sh
npm install react-native-location-settings-enabler
```

## Usage

```js
import { PRIORITIES, addListener, checkSettings, requestResolutionSettings } from "react-native-location-settings-enabler";

// Adds a listener to be invoked when location settings checked using
// [checkSettings] or changed using [requestResolutionSettings]
const listner = addListener(({ locationEnabled }) =>
    console.log(`Location are ${ locationEnabled ? 'enabled' : 'disabled' }`);
);

// Define configuration
const config = {
    priority: PRIORITIES.HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
    alwaysShow: true, // default false
    needBle: true, // default false
};

// Check if location is enabled or not
checkSettings(config);

// If location is disabled, prompt the user to turn on device location
requestResolutionSettings(config);

// ...
// Removes this subscription
listner.remove()
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Code of Conduct

See the [code of conduct guide](CODE_OF_CONDUCT.md).

## License

See [MIT](LICENSE)
