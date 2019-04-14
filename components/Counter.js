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
        style={[styles.background, { opacity: this.props.life < 1 || this.props.poison > 9 ? 0.4 : 1 }]}
      >
        {this.state.life ? (
          <TouchableOpacity
            style={styles.opacity}
            onPress={() => this.props.downlife()}
            hitSlop={{ top: 10, bottom: 10, left: 0, right: width / 2 }}
          >
            <View>
              <Text
                style={[
                  styles.text,
                  {
                    color: 'lightgreen',
                    transform: this.props.up ? [{ rotate: '180deg' }] : []
                  }
                ]}
              >
                {this.props.life}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.props.poisonchange(true)}>
            <View>
              <Text style={[styles.text, { color: 'magenta' }]}>{this.props.poison}</Text>
            </View>
          </TouchableOpacity>
        )}
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 80
  },
  textsmall: { fontSize: 25 },
  lines: {
    borderWidth: 3,
    borderColor: 'red'
  },
  opacity: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  background: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    backgroundColor: 'red'
  }
})

export default Counter
