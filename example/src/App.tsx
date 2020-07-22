import * as React from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import LocationSettingsEnabler from "react-native-location-settings-enabler"

const { HIGH_ACCURACY } = LocationSettingsEnabler.PRIORITIES

const LocationStatus = (props: { enabled: boolean | null }) => (
  <Text style={styles.status}>
    Location : [{" "}
    {props.enabled !== null && props.enabled ? (
      <Text style={styles.enabled}>Enabled</Text>
    ) : props.enabled !== null && !props.enabled ? (
      <Text style={styles.disabled}>Disabled</Text>
    ) : (
      <Text style={styles.undefined}>Undefined</Text>
    )}{" "}
    ]
  </Text>
)

const CheckSettingsBtn = (props: { onPress: any }) => (
  <Button color="green" title="Check Location Settings" onPress={props.onPress} />
)

const RequestResolutionSettingsBtn = (props: { onPress: any }) => (
  <Button color="red" title="Request Resolution Location Settings" onPress={props.onPress} />
)

const checkSettings = () =>
  LocationSettingsEnabler.checkSettings({
    priority: HIGH_ACCURACY,
    alwaysShow: true,
    needBle: true,
  })

const requestResolutionSettings = () =>
  LocationSettingsEnabler.requestResolutionSettings({
    priority: HIGH_ACCURACY,
    alwaysShow: true,
    needBle: true,
  })

const App: React.FunctionComponent<unknown> = () => {
  const [enabled, setEnabled] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    // componentDidMount : Start listner subscription
    const listner = LocationSettingsEnabler.addListener(({ locationEnabled }) =>
      setEnabled(locationEnabled),
    )

    // When user enable location then remove listner subscription
    enabled && listner.remove()

    // componentWillUnmount : Remove listner subscription
    return () => listner.remove()
  }, [enabled])

  return (
    <View style={styles.container}>
      <LocationStatus enabled={enabled} />
      {enabled === null && <CheckSettingsBtn onPress={checkSettings} />}
      {!enabled && enabled !== null && (
        <RequestResolutionSettingsBtn onPress={requestResolutionSettings} />
      )}
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
