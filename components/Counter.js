import React, { PureComponent } from 'react'
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { Entypo } from '@expo/vector-icons'

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
          <View style={styles.container}>
            <Entypo
              style={{
                position: 'absolute',
                zIndex: 3,
                right: this.props.up ? 20 : null,
                top: this.props.up ? 20 : null,
                left: this.props.up ? null : 20,
                bottom: this.props.up ? null : 20,
                transform: this.props.up ? [{ rotate: '180deg' }] : []
              }}
              name={this.state.life ? 'drop' : 'heart'}
              size={32}
              color="white"
              onPress={() => {
                console.log('aqui?')
                this.setState({ life: !this.state.life })
              }}
            />
            <TouchableOpacity style={styles.opacityl} onPress={() => this.props.downlife()} />
            <TouchableOpacity style={styles.opacityr} onPress={() => this.props.uplife()} />
            <Text
              style={{
                position: 'absolute',
                zIndex: 0,
                fontSize: width / 2,
                color: 'lightgreen',
                transform: this.props.up ? [{ rotate: '180deg' }] : []
              }}
            >
              {this.props.life}
            </Text>
          </View>
        ) : (
          <View style={styles.container}>
            <Entypo
              style={{
                position: 'absolute',
                zIndex: 3,
                right: this.props.up ? 20 : null,
                top: this.props.up ? 20 : null,
                left: this.props.up ? null : 20,
                bottom: this.props.up ? null : 20,
                transform: this.props.up ? [{ rotate: '180deg' }] : []
              }}
              name={this.state.life ? 'drop' : 'heart'}
              size={32}
              color="white"
              onPress={() => {
                console.log('aqui?')
                this.setState({ life: !this.state.life })
              }}
            />
            <TouchableOpacity style={styles.opacityl} onPress={() => this.props.downpoison()} />
            <TouchableOpacity style={styles.opacityr} onPress={() => this.props.uppoison()} />
            <Text
              style={{
                position: 'absolute',
                zIndex: 0,
                fontSize: width / 2,
                color: 'magenta',
                transform: this.props.up ? [{ rotate: '180deg' }] : []
              }}
            >
              {this.props.poison}
            </Text>
          </View>
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
  container: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  opacityl: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    zIndex: 1,
    //backgroundColor: 'red',
    left: 0
  },
  opacityr: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    zIndex: 1,
    //backgroundColor: 'blue',
    right: 0
  },
  background: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    backgroundColor: 'red'
  }
})

export default Counter
