/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
/*
import {Platform, StyleSheet, Text, View} from 'react-native';

import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://8f9cbf17856446c2b2b2f18c96e49ab9@sentry.io/1533456', 
});


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
*/
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';

import {Sentry, SentrySeverity, SentryLog} from 'react-native-sentry';

const sentryDsn = Platform.select({
  android:
    'https://8f9cbf17856446c2b2b2f18c96e49ab9@sentry.io/1533456',
  ios:
    'https://8f9cbf17856446c2b2b2f18c96e49ab9@sentry.io/1533456'
});
Sentry.config(sentryDsn, {
  logLevel: SentryLog.Debug,
  deactivateStacktraceMerging: false
}).install();

Sentry.setExtraContext({
  a_thing: 3,
  some_things: {green: 'red'},
  foobar: ['a', 'b', 'c'],
  react: true,
  float: 2.43
});

Sentry.setTagsContext({
  environment: 'production',
  react: true
});

Sentry.setUserContext({
  email: 'john@apple.com',
  userID: '12341',
  username: 'username',
  extra: {
    is_admin: false
  }
});

Sentry.captureBreadcrumb({
  message: 'Item added to shopping cart',
  category: 'action',
  data: {
    isbn: '978-1617290541',
    cartSize: '3'
  }
});

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {text: ''};
    Sentry.setEventSentSuccessfully(event => {
      this.setState({text: JSON.stringify(event)});
    });
  }

  _sendMessage() {
    Sentry.captureMessage('TEST message', {
      level: SentrySeverity.Warning
    });
  }
  _throwError() {
    throw new Error('Sentry: Test throw error');
  }
  _rejectPromise() {
    Promise.reject('Boom promise');
  }
  _setVersion() {
    Sentry.setVersion('1.1');
  }
  _setRelease() {
    Sentry.setRelease('com.hellosentry-1.1');
  }
  _setDist() {
    Sentry.setDist('1');
  }
  _nativeCrash() {
    Sentry.nativeCrash();
  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._setVersion()}
          accessibilityLabel={'set version'}
          title="Set version"
        />
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._setRelease()}
          accessibilityLabel={'set release'}
          title="Set release"
        />
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._setDist()}
          accessibilityLabel={'set dist'}
          title="Set dist"
        />
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._throwError()}
          accessibilityLabel={'throw error'}
          title="throw error!"
        />
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._rejectPromise()}
          accessibilityLabel={'reject promise'}
          title="reject promise"
        />
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._nativeCrash()}
          accessibilityLabel={'native crash'}
          title="native crash!"
        />
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._sendMessage()}
          accessibilityLabel={'send message'}
          title="send message"
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: '80%'}}
          accessibilityLabel={'status'}
          value={this.state.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
