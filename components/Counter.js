import React, { PureComponent } from 'react'
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'

class Counter extends PureComponent {
  state = {
    life: true
  }

  render() {
    const { width } = Dimensions.get('screen')

    return (
      <ImageBackground
        source={this.props.img}
        style={{
          width: '100%',
          height: '50%',
          alignItems: 'center',
          width: width / 2,
          backgroundColor: 'red',
          opacity: this.props.life < 1 || this.props.poison > 9 ? 0.4 : 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: width / 2,
            height: '80%'
          }}
        >
          {this.state.life ? (
            <TouchableOpacity onPress={() => this.props.downlife()}>
              <View>
                <Text style={[styles.text, { color: 'lightgreen' }]}>{this.props.life}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.props.poisonchange(true)}>
              <View>
                <Text style={[styles.text, { color: 'magenta' }]}>{this.props.poison}</Text>
              </View>
            </TouchableOpacity>
          )}
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
