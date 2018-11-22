import React, { PureComponent } from 'react'
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'

class Counter extends PureComponent {
    render () {
        const { width } = Dimensions.get('screen')

        return (
          <ImageBackground source={this.props.img} style={{ alignItems: 'center', width: (width/2), backgroundColor: 'red', opacity: (this.props.life < 1 || this.props.poison > 9 ? 0.4:1) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: (width/2)}}>
              <TouchableOpacity onPress={() => this.props.uplife(1)}>
                <Text style={[styles.textsmall, { color: 'lightgreen' }]}>+1 {this.props.n_life}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.uplife(5)}>
                <Text style={[styles.textsmall, { color: 'lightgreen' }]}>+5 {this.props.n_life}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.poisonchange(false)}>
                <Text style={[styles.textsmall, { color: 'magenta' }]}>-1 {this.props.n_poison}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', width: (width/2), height: '80%' }}>
              <TouchableOpacity onPress={() => this.props.downlife()}>
                <View>
                  <Text style={[styles.text, { color: 'lightgreen' }]}>{this.props.life}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.poisonchange(true)}>
                <View>
                  <Text style={[styles.text, { color: 'magenta' }]}>{this.props.poison}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    text: { fontSize: 80 },
    textsmall: { fontSize: 25 },
    lines: {
      borderWidth: 3,
      borderColor: 'red'
    }
  })
  

export default Counter