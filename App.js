import React, { Component } from 'react'
import {
  StyleSheet,
  Alert,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  SafeAreaView,
  Font
} from 'react-native'
import Counter from './components/Counter'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'
const { height, width } = Dimensions.get('screen')

export default class App extends Component {
  constructor() {
    super()
    this.state = {
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
    }
    this.resetGame.bind(this)
    this.throwDice.bind(this)
    this.naips.bind(this)
    this.startTimer.bind(this)
    this.stopTimer.bind(this)
    this.eventTimer.bind(this)
    this.poisonchange.bind(this)
    this.uplife.bind(this)
    this.downlife.bind(this)
  }

  resetGame() {
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

  throwDice() {
    Alert.alert(`${Math.floor(Math.random() * 6) + 1}`)
  }

  naips() {
    Linking.openURL('http://www.naipsbcn.com/')
  }

  startTimer() {
    this.seconds = 50 * 60 * 1000
    this.setState({ viewtimer: true })
    this.timerint = setInterval(() => {
      this.setState({ timer: dayjs(this.seconds).format('mm:ss') })
      console.log(this.seconds)
      if (this.seconds === 0) {
        clearInterval(this.timerint)
        this.timerint = null
      } else this.seconds = this.seconds - 1000
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.timerint)
    this.timerint = null
    this.setState({
      timer: `[${this.state.timer}]`
    })
  }

  eventTimer() {
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

  poisonchange(player, action) {
    const players = [...this.state.players]
    players[player].poison = action ? players[player].poison + 1 : players[player].poison - 1
    this.setState(players)
  }

  render() {
    return (
      <SafeAreaView style={styles.back}>
        <View style={styles.safearea}>
          <View style={styles.container}>
            <Counter
              up={true}
              n_life={this.state.n_life}
              n_poison={this.state.n_poison}
              uplife={num => {
                this.uplife(0, num)
              }}
              downlife={() => {
                this.downlife(0)
              }}
              poisonchange={action => {
                this.poisonchange(0, action)
              }}
              life={this.state.players[0].life}
              poison={this.state.players[0].poison}
              img={require('./assets/draclila.jpg')}
            />
            <View style={[styles.buttons, { width }]}>
              {this.state.viewtimer ? (
                <Text
                  style={styles.textsmall}
                  onPress={() => {
                    this.eventTimer()
                  }}
                >
                  {this.state.timer}
                </Text>
              ) : (
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={32}
                  color="white"
                  onPress={() => {
                    this.eventTimer()
                  }}
                />
              )}
              <TouchableOpacity
                onPress={() => {
                  this.resetGame()
                }}
              >
                <MaterialCommunityIcons name="reload" size={32} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.throwDice()
                }}
              >
                <MaterialCommunityIcons name="dice-3" size={32} color="white" />
              </TouchableOpacity>
            </View>
            <Counter
              n_life={this.state.n_life}
              n_poison={this.state.n_poison}
              uplife={num => {
                this.uplife(1, num)
              }}
              downlife={() => {
                this.downlife(1)
              }}
              poisonchange={action => {
                this.poisonchange(1, action)
              }}
              life={this.state.players[1].life}
              poison={this.state.players[1].poison}
              img={require('./assets/dracvermell.jpg')}
            />
          </View>
        </View>
      </SafeAreaView>
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
    height: '100%',
    width: '100%'
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  fullsize: {
    width: width / 3,
    alignItems: 'center'
  },
  textsmall: { fontSize: 25, color: 'white' }
})
