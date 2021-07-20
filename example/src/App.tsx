import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import LocationEnabler from 'react-native-location-enabler';

const {
  PRIORITIES: { HIGH_ACCURACY },
  checkSettings,
  requestResolutionSettings,
  useLocationSettings,
} = LocationEnabler;

const LocationStatus = (props: { enabled: boolean | undefined }) => (
  <Text style={styles.status}>
    Location : [{' '}
    {props.enabled !== undefined && props.enabled ? (
      <Text style={styles.enabled}>Enabled</Text>
    ) : props.enabled !== undefined && !props.enabled ? (
      <Text style={styles.disabled}>Disabled</Text>
    ) : (
      <Text style={styles.undefined}>Undefined</Text>
    )}{' '}
    ]
  </Text>
);

const App: React.FunctionComponent = () => {
  const LocationSettings = {
    priority: HIGH_ACCURACY,
    alwaysShow: true,
    needBle: true,
  };
  const [debugging, setDebugging] = React.useState(false);
  const [enabled, requestResolution] = useLocationSettings(LocationSettings);

  if (debugging) {
    return (
      <View style={styles.container}>
        <Text style={styles.status}>{"Debugging"}</Text>
        <Button onPress={() => checkSettings(LocationSettings)} color="red"
          title="checkSettings()"
        />
        <Button onPress={() => requestResolutionSettings(LocationSettings)}
          color="red" title="requestResolutionSettings()"
        />
        <View style={styles.spacing}></View>
        <Button onPress={() => setDebugging(!debugging)} color="orange"
          title="Stop debugging"
        />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <LocationStatus enabled={enabled} />
      {!enabled && <Button onPress={requestResolution} color="red"
        title="Request Resolution Location Settings"
      />
      }
      <View style={styles.spacing}></View>
      <Button onPress={() => setDebugging(!debugging)} color="orange"
        title="Debug methods"
      />
    </View>
  );
};

const colors = {
  red: '#b90707',
  green: '#03b503',
  blue: '#0000f7',
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  disabled: {
    color: colors.red,
  },
  enabled: {
    color: colors.green,
  },
  spacing: {
    height: 50,
  },
  status: {
    fontSize: 20,
    margin: 20,
  },
  undefined: {
    color: colors.blue,
  },

});

export default App;
