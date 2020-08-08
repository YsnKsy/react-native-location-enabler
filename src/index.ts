import { useState, useEffect } from "react"
import { NativeModules, NativeEventEmitter } from "react-native"
import type {
  LocationEnablerType,
  Listener,
  Config,
  LocationStatus,
  LocationSettings,
} from "./types"

const { LocationEnabler } = NativeModules
const EVENT_NAME = "onChangeLocationSettings"

// Override
const locationEnabler = new NativeEventEmitter(LocationEnabler)

LocationEnabler.addListener = (listener: Listener, context?: any) =>
  locationEnabler.addListener(EVENT_NAME, listener, context)

LocationEnabler.once = (listener: Listener, context?: any) =>
  locationEnabler.once(EVENT_NAME, listener, context)

LocationEnabler.PRIORITIES = LocationEnabler.getConstants()

LocationEnabler.useLocationSettings = (
  settings: Config,
  initial?: LocationStatus,
): LocationSettings => {
  const [enabled, setEnabled] = useState<LocationStatus>(initial || undefined)
  useEffect(() => {
    const listner = LocationEnabler.addListener(({ locationEnabled }) =>
      setEnabled(locationEnabled),
    )
    LocationEnabler.checkSettings(settings)
    if (enabled) listner.remove()
    return () => listner.remove()
  }, [enabled])
  return [enabled, () => LocationEnabler.requestResolutionSettings(settings)]
}

export default LocationEnabler as LocationEnablerType
