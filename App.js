import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, View, Dimensions, Text } from 'react-native'
import Counter from './components/Counter'

export default class App extends Component {


  render() {
    const { height, width } = Dimensions.get('screen')

    return (
      <SafeAreaView style={[styles.lines, { backgroundColor: 'grey', height, width }]}>
        <View style={[styles.container, styles.lines, { height, width }]}>
          <Counter />
          <Counter />
        </View>
        <View style={styles.lines}>
          <Text>Dado</Text>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lines: {
    alignItems: 'center'
  }
})
