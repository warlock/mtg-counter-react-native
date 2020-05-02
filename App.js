import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native'
import Counter from './components/Counter'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'
const sleep = secs => new Promise(resolve => setTimeout(resolve, secs * 1000))
const MAX_TIME = 50 * 60 * 1000
const { height, width } = Dimensions.get('screen')

export default () => {
  const [dice, setDice] = useState({ number: 3, color: 'white' })
  const [viewtimer, setViewTimer] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [timer, setTimer] = useState('50:00')
  const [seconds, setSeconds] = useState(MAX_TIME)
  const [player1, setPlayer1] = useState({ life: 20, poison: 0 })
  const [player2, setPlayer2] = useState({ life: 20, poison: 0 })

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          setIsActive(false)
        } else {
          setSeconds(seconds - 1000)
          setTimer(dayjs(seconds).format('mm:ss'))
        }
      }, 1000)
    } else if (!isActive && seconds !== MAX_TIME) {
      setTimer(`[${dayjs(seconds).format('mm:ss')}]`)
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [seconds, isActive])

  const resetGame = () => {
    setIsActive(false)
    setSeconds(MAX_TIME)
    setViewTimer(false)
    setTimer('50:00')

    setPlayer1({
      life: 20,
      poison: 0
    })

    setPlayer2({
      life: 20,
      poison: 0
    })
  }

  const throwDice = async () => {
    setDice({
      number: '1',
      color: 'grey'
    })
    await sleep(0.3)
    setDice({
      number: '3',
      color: 'grey'
    })
    await sleep(0.3)
    setDice({
      number: '5',
      color: 'grey'
    })
    await sleep(0.3)
    const number = Math.floor(Math.random() * 6) + 1
    setDice({
      number,
      color: 'white'
    })
  }

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.inview}>
        <Counter
          up={true}
          uplife={() =>
            setPlayer1({ life: player1.life + 1, poison: player1.poison })
          }
          downlife={() =>
            setPlayer1({ life: player1.life - 1, poison: player1.poison })
          }
          uppoison={() =>
            setPlayer1({ life: player1.life, poison: player1.poison + 1 })
          }
          downpoison={() =>
            setPlayer1({ life: player1.life, poison: player1.poison - 1 })
          }
          life={player1.life}
          poison={player1.poison}
          img={require('./assets/red.jpg')}
        />
        <View style={[styles.buttons]}>
          <TouchableOpacity
            style={{
              width: width / 3,
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
            onPress={() => {
              if (isActive) {
                setIsActive(false)
              } else {
                setViewTimer(true)
                setIsActive(true)
              }
            }}
          >
            {viewtimer ? (
              <Text style={styles.textsmall}>{timer}</Text>
            ) : (
              <MaterialCommunityIcons
                name="clock-outline"
                size={32}
                color="white"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: width / 3,
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
            onPress={() => resetGame()}
          >
            <MaterialCommunityIcons name="reload" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: width / 3,
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
            onPress={() => throwDice()}
          >
            <MaterialCommunityIcons
              name={`dice-${dice.number}`}
              size={32}
              color={dice.color}
            />
          </TouchableOpacity>
        </View>
        <Counter
          uplife={() =>
            setPlayer2({ life: player2.life + 1, poison: player2.poison })
          }
          downlife={() =>
            setPlayer2({ life: player2.life - 1, poison: player2.poison })
          }
          uppoison={() =>
            setPlayer2({ life: player2.life, poison: player2.poison + 1 })
          }
          downpoison={() =>
            setPlayer2({ life: player2.life, poison: player2.poison - 1 })
          }
          life={player2.life}
          poison={player2.poison}
          img={require('./assets/blue.jpg')}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1,
    height: '100%'
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 46
  },
  inview: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-evenly'
  },
  textsmall: {
    fontSize: 25,
    color: 'white'
  }
})
