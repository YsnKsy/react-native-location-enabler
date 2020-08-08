import LocationEnabler from "react-native-location-enabler"
jest.mock("react-native-location-enabler")

describe("Test native module 'react-native-location-enabler'", () => {
  function listner() {
    // do nothing
  }

  const options = {
    priority: 100,
    alwaysShow: false,
    needBle: false,
  }

  test("[ LocationEnabler.useLocationSettings ] is a valid hook method", () => {
    const useLocationSettings = LocationEnabler.useLocationSettings
    expect(useLocationSettings).toBeTruthy()
    const [enabled, requestResolution] = useLocationSettings(options)
    expect(enabled).toBe(Boolean)
    expect(requestResolution).toBeTruthy()
    expect(requestResolution()).toBeUndefined()
  })

  test("[ LocationEnabler.addListener ] is a valid function subscriber", () => {
    const addListener = LocationEnabler.addListener
    expect(addListener).toBeTruthy()
    expect(addListener(listner).remove).toBeTruthy()
  })

  test("[ LocationEnabler.once ] is a valid function subscriber", () => {
    const once = LocationEnabler.once
    expect(once).toBeTruthy()
    expect(once(listner).remove).toBeTruthy()
  })

  test("[ LocationEnabler.checkSettings ] is a valid function ", () => {
    const checkSettings = LocationEnabler.checkSettings
    expect(checkSettings).toBeTruthy()
    expect(checkSettings(options)).toBeUndefined()
  })

  test("[ LocationEnabler.requestResolutionSettings ] is a valid function", () => {
    const requestResolutionSettings = LocationEnabler.requestResolutionSettings
    expect(requestResolutionSettings).toBeTruthy()
    expect(requestResolutionSettings(options)).toBeUndefined()
  })

  test("[ LocationEnabler.PRIORITIES ] is a valid priorities object", () => {
    const PRIORITIES = LocationEnabler.PRIORITIES
    expect(PRIORITIES).toBeTruthy()
    expect(PRIORITIES).toEqual({
      HIGH_ACCURACY: 100,
      BALANCED_POWER_ACCURACY: 102,
      LOW_POWER: 104,
      NO_POWER: 105,
    })
  })
})
