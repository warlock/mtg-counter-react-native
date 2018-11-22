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
      viewtimer: false,
      timer: '50:00',
      n_restart: 'Restart',
      n_dice: 'Throw a dice',
      n_timer: 'Start timer',
      n_changelang: 'Change Language',
      n_exit: 'Exit',
      n_life: 'life',
      n_poison: 'poison',
      language: 'en',
      players: [
        {
          life: 20,
          poison: 0
        },
        {
          life: 20,
          poison: 0
        }
      ]
    }
    this.resetGame.bind(this)
    this.throwDice.bind(this)
    this.naips.bind(this)
    this.startTimer.bind(this)
    this.stopTimer.bind(this)
    this.eventTimer.bind(this)
    this.changeLang.bind(this)
    this.selectLang.bind(this)

    this.poisonchange.bind(this)
    this.uplife.bind(this)
    this.downlife.bind(this)
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
        n_language: 'cat',
        n_restart: 'Reiniciar joc',
        n_dice: 'Llençar dau',
        n_timer: 'Iniciar temporitzador',
        n_changelang: 'Canvia idioma',
        n_exit: 'Sortir',
        n_life: 'vida',
        n_poison: 'verí'
      })
      AsyncStorage.setItem('@lang', 'ca-ES')
    } else if (locale.includes('es-')) {
      this.setState({
        n_language: 'es',
        n_restart: 'Reiniciar juego',
        n_dice: 'Lanzar dado',
        n_timer: 'Iniciar temporizador',
        n_changelang: 'Cambiar idioma',
        n_exit: 'Salir',
        n_life: 'vida',
        n_poison: 'veneno'
      })
      AsyncStorage.setItem('@lang', 'es-ES')
    } else {
      this.setState({
        n_language: 'en',
        n_restart: 'Restart game',
        n_dice: 'Throw a dice',
        n_timer: 'Start timer',
        n_changelang: 'Change Language',
        n_exit: 'Exit',
        n_life: 'life',
        n_poison: 'poison'
      })
      AsyncStorage.setItem('@lang', 'en')
    }
  }

  resetGame () {
    clearInterval(this.timerint)
    this.timerint = null
    this.setState({
      viewtimer: false,
      timer: '50:00',
      players: [
        {
          life: 20,
          poison: 0
        },
        {
          life: 20,
          poison: 0
        }
      ]
    })
  }

  throwDice () {
    Alert.alert('Resultado del dado:', `${Math.floor(Math.random() * 6) + 1}`)
  }

  naips () {
    Linking.openURL('http://www.naipsbcn.com/')
  }

  startTimer () {
    console.log('start timmer')
    this.seconds = 50*60*1000
    this.setState({ viewtimer: true })
    this.timerint = setInterval(() => {
      this.setState({ timer: dayjs(this.seconds).format('mm:ss') })
      if (this.seconds === 0) {
        clearInterval(this.timerint)
        this.timerint = null
      }  else this.seconds = this.seconds - 1000
    }, 1000)
  }

  stopTimer () {
    console.log('stop timmer')
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

  uplife(player, num) {
    const players = [...this.state.players]
    players[player].life = players[player].life + num
    this.setState({ players })
  }

  downlife(player) {
    const players = [...this.state.players]
    players[player].life = players[player].life - 1
    this.setState({ players })
  }

  poisonchange (player, action) {
    const players = [...this.state.players]
    players[player].poison = action? players[player].poison + 1 : players[player].poison - 1
    this.setState(players)
  }

  render() {
    return (
      <View style={styles.back}>
        <View style={styles.safearea}>
          <View style={[styles.buttons, { width }]}>
            {this.state.viewtimer?
              <Text style={styles.textsmall} onPress={() => { this.eventTimer() }}>{this.state.timer}</Text>
              :
              <Text style={styles.textsmall} onPress={() => { this.eventTimer() }}>{this.state.n_timer}</Text>
            }
            <Text style={styles.textsmall} onPress={() => { this.selectLang() }}>{this.state.n_changelang}</Text>
          </View>
            {this.state.loading? null:
              <View style={[styles.container, { height, width }]}>
                <Counter
                  n_life={this.state.n_life}
                  n_poison={this.state.n_poison}
                  uplife={(num) => { this.uplife(0, num) }}
                  downlife={() => { this.downlife(0) }}
                  poisonchange={action => { this.poisonchange(0, action) }}
                  life={this.state.players[0].life}
                  poison={this.state.players[0].poison}
                  img={require('./assets/draclila.jpg')}
                />
                <Counter
                  n_life={this.state.n_life}
                  n_poison={this.state.n_poison}
                  uplife={(num) => { this.uplife(1, num) }}
                  downlife={() => { this.downlife(1) }}
                  poisonchange={action => { this.poisonchange(1, action) }}
                  life={this.state.players[1].life}
                  poison={this.state.players[1].poison}
                  img={require('./assets/dracvermell.jpg')}
                />
              </View>
            }

          <View style={[styles.buttons, { width }]}>
            <TouchableOpacity onPress={() => { this.resetGame() }}>
              <View style={styles.fullsize}>
                <Text style={styles.textsmall}>{this.state.n_restart}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.throwDice() }}>
              <View style={styles.fullsize}>
                <Text style={styles.textsmall}>{this.state.n_dice}</Text>
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
