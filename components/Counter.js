import React, { Component } from 'react'
import { View, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native'

class Counter extends Component {
    constructor () {
      super()
      this.state = {
        life: 20,
        poison: 0
      }
      this.downLife = this.downLife.bind(this)
      this.upLife = this.upLife.bind(this)
      this.poison = this.poison.bind(this)
    }

    downLife () {
      this.setState({
        life: this.state.life - 1
      })
    }

    upLife (num) {
      this.setState({
        life: this.state.life + num
      })
    }

    poison (make) {
      this.setState({
        poison: make ? this.state.poison + 1 : this.state.poison - 1
      })

    }

    render () {
        const { width } = Dimensions.get('screen')

        return (
          <View style={{ alignItems: 'center', width: (width/2) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: (width/2)}}>
              <TouchableOpacity onPress={() => { this.upLife(1) }}>
                <Text style={[styles.textsmall, { color: 'lightgreen' }]}>+1 life</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.upLife(5) }}>
                <Text style={[styles.textsmall, { color: 'lightgreen' }]}>+5 life</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.poison(false) }}>
                <Text style={[styles.textsmall, { color: 'magenta' }]}>-1 poison</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', width: (width/2), height: '80%' }}>
              <TouchableOpacity onPress={() => { this.downLife() }}>
                <Text style={[styles.text, { color: 'lightgreen' }]}>{this.state.life}</Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => { this.poison(true) }}>
                <Text style={[styles.text, { color: 'magenta' }]}>{this.state.poison}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    text: { fontSize: 50 },
    textsmall: { fontSize: 20 }
  })
  

export default Counter