import React, { PureComponent } from 'react'
import { Dimensions, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'

class Counter extends PureComponent {
  state = {
    life: true
  }

  render() {
    const { width } = Dimensions.get('screen')
    console.log(width)
    return (
      <ImageBackground
        source={this.props.img}
        style={[styles.background, { opacity: this.props.life < 1 || this.props.poison > 9 ? 0.4 : 1 }]}
      >
        {this.state.life ? (
          <TouchableOpacity
            style={styles.opacity}
            onPress={() => this.props.downlife()}
            hitSlop={{ top: 0, bottom: 0, left: 0, right: width / 2 }}
          >
            <Text
              style={{
                fontSize: width / 2,
                color: 'lightgreen',
                transform: this.props.up ? [{ rotate: '180deg' }] : []
              }}
            >
              {this.props.life}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.props.poisonchange(true)}>
            <Text style={{ fontSize: width / 2, color: 'magenta' }}>{this.props.poison}</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  textsmall: { fontSize: 25 },
  lines: {
    borderWidth: 3,
    borderColor: 'red'
  },
  opacity: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  background: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    backgroundColor: 'red'
  }
})

export default Counter
