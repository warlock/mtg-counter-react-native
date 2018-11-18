import React, { Component } from 'react'
import { StyleSheet, Alert, View, Dimensions, Text, TouchableOpacity } from 'react-native'
import Counter from './components/Counter'
const { height, width } = Dimensions.get('screen')
import { DangerZone } from 'expo'
const { Localization } = DangerZone

export default class App extends Component {

  constructor () {
    super()
    this.state = {
      time: Date.now()
    }
    this.resetGame.bind(this)
    this.throwDice.bind(this)
    this.naips.bind(this)
  }

  async componentWillMount () {
    if (Localization.locale === 'ca-ES') {
      console.log('catala')
    } else if (Localization.locale.includes('es-')) {
      console.log('castella')
    } else {
      console.log('angles')
    }
  }

  resetGame () {
    this.setState({ time: Date.now() })
  }

  throwDice () {
    Alert.alert('Resultado del dado:', `${Math.floor(Math.random() * 6) + 1}`)
  }

  naips () {
    alert('Visita naips!')
  }

  render() {
    return (
      <View style={styles.back}>
        <View style={styles.safearea}>
            {this.state.loading? null:
              <View style={[styles.container, { height, width }]}>
                <Counter img={require('./assets/draclila.jpg')} reset={this.state.time}/>
                <Counter img={require('./assets/dracvermell.jpg')} reset={this.state.time} />
              </View>
            }

          <View style={[styles.buttons, { width }]}>
            <TouchableOpacity onPress={() => { this.resetGame() }}>
              <View style={styles.fullsize}>
                <Text style={styles.textsmall}>Reiniciar juego</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.throwDice() }}>
              <View style={styles.fullsize}>
                <Text style={styles.textsmall}>Lanzar dado</Text>
              </View>          
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.naips() }}>
              <View style={styles.fullsize}>
                <Text style={styles.textsmall}>Tienda Naips</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: 'grey',
    height,
    width,
    alignItems: 'center',
    flexDirection: 'row'
  },
  safearea: {
    height: '90%',
    width: '90%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  fullsize : {
    width: (width/3),
    alignItems: 'center'
  },
  textsmall: { fontSize: 25 }
})
