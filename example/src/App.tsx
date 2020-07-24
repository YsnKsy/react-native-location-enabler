import * as React from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import LocationSettingsEnabler from "react-native-location-settings-enabler"

const { PRIORITIES, useCheckSettings, requestResolutionSettings } = LocationSettingsEnabler
const { HIGH_ACCURACY } = PRIORITIES

const config = {
  priority: HIGH_ACCURACY,
  alwaysShow: true,
  needBle: true,
}

const LocationStatus = (props: { enabled: boolean | undefined }) => (
  <Text style={styles.status}>
    Location : [{" "}
    {props.enabled !== undefined && props.enabled ? (
      <Text style={styles.enabled}>Enabled</Text>
    ) : props.enabled !== undefined && !props.enabled ? (
      <Text style={styles.disabled}>Disabled</Text>
    ) : (
      <Text style={styles.undefined}>Undefined</Text>
    )}{" "}
    ]
  </Text>
)

const RequestResolutionSettingsBtn = (props: { onPress: any }) => (
  <Button color="red" title="Request Resolution Location Settings" onPress={props.onPress} />
)

const requestResolution = () => requestResolutionSettings(config)

const App: React.FunctionComponent<unknown> = () => {
  const enabled = useCheckSettings(config)

  return (
    <View style={styles.container}>
      <LocationStatus enabled={enabled} />
      {!enabled && <RequestResolutionSettingsBtn onPress={requestResolution} />}
    </View>
  )
}

const colors = {
  red: "#b90707",
  green: "#03b503",
  blue: "#0000f7",
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  disabled: {
    color: colors.red,
  },
  enabled: {
    color: colors.green,
  },
  status: {
    fontSize: 20,
    margin: 20,
  },
  undefined: {
    color: colors.blue,
  },
})

export default App
