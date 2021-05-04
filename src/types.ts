import type { EmitterSubscription } from 'react-native';

export enum Priority {
  HIGH_ACCURACY = 100,
  BALANCED_POWER_ACCURACY = 102,
  LOW_POWER = 104,
  NO_POWER = 105,
}

export type Priorities = {
  /**
   * Request the most accurate locations available.
   */
  HIGH_ACCURACY: Priority.HIGH_ACCURACY;

  /**
   * Request "block" level accuracy.
   */
  BALANCED_POWER_ACCURACY: Priority.BALANCED_POWER_ACCURACY;

  /**
   * Request "city" level accuracy.
   */
  LOW_POWER: Priority.LOW_POWER;

  /**
   * Request the best accuracy possible with zero additional power consumption.
   */
  NO_POWER: Priority.NO_POWER;
};

export type Config = {
  priority?: Priority;

  /**
   * Whether or not location is required by the calling app in order to continue.
   * Set this to true if location is required to continue and false if having location provides
   * better results, but is not required. This changes the wording/appearance of the dialog accordingly.
   */
  alwaysShow?: boolean;

  /**
   * Sets whether the client wants BLE scan to be enabled.
   * When this flag is set to true, if the platform supports BLE scan mode and Bluetooth is off,
   * the dialog will prompt the user to enable BLE scan. If the platform doesn't support BLE scan mode,
   * the dialog will prompt to enable Bluetooth.
   */
  needBle?: boolean;
};

export type Listener = (args: { locationEnabled: boolean }) => void;

export type LocationStatus = boolean | undefined;

export type LocationSettings = [LocationStatus, () => void];

export interface LocationEnablerType {
  /**
   * Static object contain a list quality of service for location updates.
   * If your application wants high accuracy location it should set prioprity to 'HIGH_ACCURACY'
   * If you want negligible power impact, but to still receive location updates when available,
   * then set priority to 'NO_POWER'.
   */
  PRIORITIES: Priorities;

  /**
   * Hook let you check the user's device location status 'on' / 'off' and method let you display an activity where they can turn location 'on'.
   *
   * @param config -
   * @param initial? -
   * @returns LocationSettings - location status
   */
  useLocationSettings(
    config: Config,
    initial?: LocationStatus
  ): LocationSettings;

  /**
   * Checking if the user's device location is turned off.
   *
   * @param config -
   */
  checkSettings(config: Config): void;

  /**
   * Display an activity where the user's can turn location 'on'.
   *
   * @param config -
   */
  requestResolutionSettings(config: Config): void;

  /**
   * Adds a listener to be invoked when onChangeLocationSettings are emitted.
   * An optional calling context may be provided. The data arguments emitted
   * will be passed to the listener function.
   *
   * @param listener - Function to invoke when the specified event is emitted
   * @param context - Optional context object to use when invoking the listener
   */
  addListener(listener: Listener, context?: any): EmitterSubscription;

  /**
   * Similar to addListener, except that the listener is removed after it is
   * invoked once.
   *
   * @param listener - Function to invoke only once when the specified event is emitted
   * @param context - context object to use when invoking the listener
   */
  once(listener: Listener, context?: any): EmitterSubscription;
}
