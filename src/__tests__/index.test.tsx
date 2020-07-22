import LocationSettingsEnabler from "react-native-location-settings-enabler"
jest.mock("react-native-location-settings-enabler")

describe("Test native module 'react-native-location-settings-enabler'", () => {
  function listner() {
    // do nothing
  }

  const options = {
    priority: 100,
    alwaysShow: false,
    needBle: false,
  }

  test("[ LocationSettingsEnabler.addListener ] is a valid function subscriber", () => {
    const addListener = LocationSettingsEnabler.addListener
    expect(addListener).toBeTruthy()
    expect(addListener(listner).remove).toBeTruthy()
    // done()
  })

  test("[ LocationSettingsEnabler.once ] is a valid function subscriber", () => {
    const once = LocationSettingsEnabler.once
    expect(once).toBeTruthy()
    expect(once(listner).remove).toBeTruthy()
  })

  test("[ LocationSettingsEnabler.checkSettings ] is a valid function ", () => {
    const checkSettings = LocationSettingsEnabler.checkSettings
    expect(checkSettings).toBeTruthy()
    expect(checkSettings(options)).toBeUndefined()
  })

  test("[ LocationSettingsEnabler.requestResolutionSettings ] is a valid function", () => {
    const requestResolutionSettings = LocationSettingsEnabler.requestResolutionSettings
    expect(requestResolutionSettings).toBeTruthy()
    expect(requestResolutionSettings(options)).toBeUndefined()
  })

  test("[ LocationSettingsEnabler.priorities ] is a valid priorities object", () => {
    const priorities = LocationSettingsEnabler.priorities
    expect(priorities).toBeTruthy()
    expect(priorities).toEqual({
      HIGH_ACCURACY: 100,
      BALANCED_POWER_ACCURACY: 102,
      LOW_POWER: 104,
      NO_POWER: 105,
    })
  })
})
