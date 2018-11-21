import React, { Component } from 'react'
import { StyleSheet, Alert, View, Dimensions, Text, TouchableOpacity, Image, Linking, AsyncStorage } from 'react-native'
import Counter from './components/Counter'
import { DangerZone } from 'expo'
import dayjs from 'dayjs'
const { height, width } = Dimensions.get('screen')
const { Localization } = DangerZone

export default class App extends Component {

  constructor () {
    super()
    this.state = {
      time: Date.now(),
      restart: 'Restart',
      dice: 'Throw a dice',
      timer: 'Start timer',
      changelang: 'Change Language',
      exit: 'Exit',
      language: 'en'
    }
    this.resetGame.bind(this)
    this.throwDice.bind(this)
    this.naips.bind(this)
    this.startTimer.bind(this)
    this.stopTimer.bind(this)
    this.eventTimer.bind(this)
    this.changeLang.bind(this)
    this.selectLang.bind(this)
  }

  async componentWillMount () {
    var lang = await AsyncStorage.getItem('@lang')
    if (!lang) lang = Localization.locale 
    this.changeLang(lang)
  }

  selectLang () {
    Alert.alert(
      this.state.changelang,
      'hola',
      [
        {text: 'English', onPress: () => this.changeLang('en')},
        {text: 'Español', onPress: () => this.changeLang('es-ES')},
        {text: 'Català', onPress: () => this.changeLang('ca-ES')},
        {text: 'Cancel', style: 'cancel'}
      ]
    )
  }

  changeLang (locale) {
    if (locale === 'ca-ES') {
      this.setState({
        language: 'cat',
        restart: 'Reiniciar joc',
        dice: 'Llençar dau',
        timer: 'Iniciar temporitzador',
        changelang: 'Canvia idioma',
        exit: 'Sortir'
      })
      AsyncStorage.setItem('@lang', 'ca-ES')
    } else if (locale.includes('es-')) {
      this.setState({
        language: 'es',
        restart: 'Reiniciar juego',
        dice: 'Lanzar dado',
        timer: 'Iniciar temporizador',
        changelang: 'Cambiar idioma',
        exit: 'Salir'
      })
      AsyncStorage.setItem('@lang', 'es-ES')
    } else {
      this.setState({
        language: 'en',
        restart: 'Restart game',
        dice: 'Throw a dice',
        timer: 'Start timer',
        changelang: 'Change Language',
        exit: 'Exit'
      })
      AsyncStorage.setItem('@lang', 'en')
    }
  }

  resetGame () {
    this.setState({ time: Date.now() })
  }

  throwDice () {
    Alert.alert('Resultado del dado:', `${Math.floor(Math.random() * 6) + 1}`)
  }

  naips () {
    Linking.openURL('http://www.naipsbcn.com/')
  }

  startTimer () {
    this.seconds = 50*60*1000
    this.timerint = setInterval(() => {
      this.setState({ timer: dayjs(this.seconds).format('mm:ss') })
      if (this.seconds === 0) {
        clearInterval(this.timerint)
        this.timerint = null
      }  else this.seconds = this.seconds - 1000
    }, 1000)
  }

  stopTimer () {
    clearInterval(this.timerint)
    this.timerint = null
    this.setState({
      timer: `[${this.state.timer}]`
    })
  }

  eventTimer () {
    if (this.timerint) this.stopTimer()
    else this.startTimer()
  }


  render() {
    return (
      <View style={styles.back}>
        <View style={styles.safearea}>
          <View style={[styles.buttons, { width }]}>
            <Text style={styles.textsmall} onPress={() => { this.eventTimer() }}>{this.state.timer}</Text>
            <Text style={styles.textsmall}>{this.state.dice}</Text>
            <Text style={styles.textsmall} onPress={() => { this.selectLang() }}>{this.state.changelang}</Text>
          </View>
            {this.state.loading? null:
              <View style={[styles.container, { height, width }]}>
                <Counter language={this.state.language} img={require('./assets/draclila.jpg')} reset={this.state.time}/>
                <Counter language={this.state.language} img={require('./assets/dracvermell.jpg')} reset={this.state.time} />
              </View>
            }

          <View style={[styles.buttons, { width }]}>
            <TouchableOpacity onPress={() => { this.resetGame() }}>
              <View style={styles.fullsize}>
                <Text style={styles.textsmall}>{this.state.restart}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.throwDice() }}>
              <View style={styles.fullsize}>
                <Text style={styles.textsmall}>{this.state.dice}</Text>
              </View>          
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.naips() }}>
              <View style={styles.fullsize}>
                <Image source={require('./assets/naips.png')} resizeMode='contain' style={{ width: '80%' }} />
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
    height: '95%',
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
