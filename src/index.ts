import { NativeModules, NativeEventEmitter } from "react-native"
import type { LocationSettingsEnablerType, Listener } from "./types"

const { LocationSettingsEnabler } = NativeModules
const EVENT_NAME = "onChangeLocationSettings"

// Override
const locationSettingsEnabler = new NativeEventEmitter(LocationSettingsEnabler)

LocationSettingsEnabler.addListener = (listener: Listener, context?: any) =>
  locationSettingsEnabler.addListener(EVENT_NAME, listener, context)

LocationSettingsEnabler.once = (listener: Listener, context?: any) =>
  locationSettingsEnabler.once(EVENT_NAME, listener, context)

LocationSettingsEnabler.PRIORITIES = LocationSettingsEnabler.getConstants()

export default LocationSettingsEnabler as LocationSettingsEnablerType
