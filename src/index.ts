import { useState, useEffect } from "react"
import { NativeModules, NativeEventEmitter } from "react-native"
import type { LocationSettingsEnablerType, Listener, Config, LocationStatus } from "./types"

const { LocationSettingsEnabler } = NativeModules
const EVENT_NAME = "onChangeLocationSettings"

// Override
const locationSettingsEnabler = new NativeEventEmitter(LocationSettingsEnabler)

LocationSettingsEnabler.addListener = (listener: Listener, context?: any) =>
  locationSettingsEnabler.addListener(EVENT_NAME, listener, context)

LocationSettingsEnabler.once = (listener: Listener, context?: any) =>
  locationSettingsEnabler.once(EVENT_NAME, listener, context)

LocationSettingsEnabler.PRIORITIES = LocationSettingsEnabler.getConstants()

LocationSettingsEnabler.useCheckSettings = (
  settings: Config,
  initial?: LocationStatus,
): LocationStatus => {
  const [enabled, setEnabled] = useState<LocationStatus>(initial || undefined)
  useEffect(() => {
    const listner = LocationSettingsEnabler.addListener(({ locationEnabled }) =>
      setEnabled(locationEnabled),
    )
    LocationSettingsEnabler.checkSettings(settings)
    if (enabled) listner.remove()
    return () => listner.remove()
  }, [enabled])
  return enabled
}

LocationSettingsEnabler.useRequestResolutionSettings = (
  settings: Config,
  initial?: LocationStatus,
): LocationStatus => {
  const [enabled, setEnabled] = useState<LocationStatus>(initial || undefined)
  useEffect(() => {
    const listner = LocationSettingsEnabler.addListener(({ locationEnabled }) =>
      setEnabled(locationEnabled),
    )
    LocationSettingsEnabler.requestResolutionSettings(settings)
    if (enabled) listner.remove()
    return () => listner.remove()
  }, [enabled])
  return enabled
}

export default LocationSettingsEnabler as LocationSettingsEnablerType
