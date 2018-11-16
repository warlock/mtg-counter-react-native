import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, View, Dimensions, Text } from 'react-native'
const { height, width } = Dimensions.get('screen')

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      life_p1: 20,
      life_p2: 20,
      pois_p1: 0,
      pois_p2: 0
    }
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: 'grey', height, width }}>
        <View style={[styles.container, { height, width }]}>
          <View style={{ alignItems: 'center' }}><Text style={[styles.text, { color: 'lightgreen' }]}>20</Text><Text style={[styles.text, { color: 'magenta' }]}>0</Text></View>
          <View style={{ alignItems: 'center' }}><Text style={[styles.text, { color: 'lightgreen' }]}>20</Text><Text style={[styles.text, { color: 'magenta' }]}>0</Text></View>
        </View>
        <View>
        <Text>Dice</Text>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  text: { fontSize: 40 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
})
