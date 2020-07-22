jest.mock("react-native-location-settings-enabler")

export default {
  priorities: {
    HIGH_ACCURACY: 100,
    BALANCED_POWER_ACCURACY: 102,
    LOW_POWER: 104,
    NO_POWER: 105,
  },
  checkSettings: jest.fn(),
  requestResolutionSettings: jest.fn(),
  addListener: jest.fn(() => {
    return { remove: jest.fn() }
  }),
  once: jest.fn(() => {
    return { remove: jest.fn() }
  }),
}
