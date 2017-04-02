import React from 'react';
import { StyleSheet, Text, TextInput, WebView, View, Button, TouchableOpacity } from 'react-native';
const WEBVIEW_REF = "WEBVIEW_REF";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      canGoBack: false,
      url: '',
      text: 'http://',
      isLoading: true
    };
  };

  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={{height: 50, width: 200, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            onBlur={() => this.setState({url: this.state.text})}
            value={this.state.text}
            autoFocus={true}
          />
        </View>
        <View style={styles.topbar}>
          <TouchableOpacity
            disabled={!this.state.canGoBack}
            onPress={this.onBack.bind(this)}
            >
            <Text
              style={this.state.canGoBack ? styles.topbarText : styles.topbarTextDisabled}
            >{this.state.isLoading ? 'Loading' : 'Go Back'}</Text>
          </TouchableOpacity>
        </View>
        <WebView
          ref={WEBVIEW_REF}
          style={{flex: 1}}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          onLoadStart={() => {this.setState({isLoading: true})}}
          onLoadEnd={() => {this.setState({isLoading: false})}}
          source={{uri: this.state.url || 'http://google.com'}}
          injectedJavaScript={"$('script[crossorigin=\"anonymous\"]').remove();"}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15, /* Padding to push below the navigation bar */
    backgroundColor: '#F5FCFF',
  },
  searchBar: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topbar: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topbarTextDisabled: {
    color: 'gray'
  }
});
