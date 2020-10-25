import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Dimensions, Text, StyleSheet, Pressable, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import ModeButton from './ModeButton'
const { width } = Dimensions.get('screen')

export default forwardRef(({ img, invert }, ref) => {
  const [status, setStatus] = useState({
    life: 20,
    poison: 0,
    planeswalker: 0
  })
  const [mode, setMode] = useState('life')

  useImperativeHandle(ref, () => ({
    reset() {
      setStatus({
        life: 20,
        poison: 0,
        planeswalker: 0
      })
    }
  }))

  const colorSelector = {
    life: 'white',
    poison: 'magenta',
    planeswalker: 'blue'
  }

  /*
  
      <ImageBackground
      source={img}
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: status.life < 1 || status.poison > 9 ? 0.4 : 1,
          transform: invert ? [{ rotate: '180deg' }] : null
        }
      ]}
    >

   
  */

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: status.life < 1 || status.poison > 9 ? 0.4 : 1,
          transform: invert ? [{ rotate: '180deg' }] : null
        }
      ]}
    >
      <View style={[styles.buttonBox, { width }]}>
        <ModeButton image={require('../assets/heart.png')} setmode={() => setMode('life')} />
        <ModeButton image={require('../assets/poison.png')} setmode={() => setMode('poison')} />
        <ModeButton
          image={require('../assets/planeswalker.png')}
          setmode={() => setMode('planeswalker')}
        />
      </View>
      <Pressable
        style={styles.opacityr}
        onPress={() => setStatus({ ...status, [mode]: status[mode] + 1 })}
      >
        <AntDesign
          style={{
            position: 'absolute',
            zIndex: 3,
            alignSelf: 'center'
          }}
          name={'pluscircleo'}
          size={35}
          color="white"
        />
      </Pressable>
      <Pressable
        style={styles.opacityl}
        onPress={() => setStatus({ ...status, [mode]: status[mode] - 1 })}
      >
        <AntDesign
          style={{
            position: 'absolute',
            zIndex: 3,
            alignSelf: 'center'
          }}
          name={'minuscircleo'}
          size={38}
          color="white"
        />
      </Pressable>
      <Text style={[styles.textBig, { color: colorSelector[mode] }]}>{status[mode]}</Text>
    </View>
  )
})

/*
const shadows = {
  textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: { width: 5, height: 5 },
  textShadowRadius: 10
}
*/

const styles = StyleSheet.create({
  buttonBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 3,
    left: 0,
    bottom: 10,
    width: 60,
    height: 60,
    padding: 10
  },
  textBig: {
    position: 'absolute',
    zIndex: 0,
    fontSize: width / 3
    //...shadows
  },
  opacityl: {
    position: 'absolute',
    width: '40%',
    height: '100%',
    zIndex: 1,
    left: 0,
    justifyContent: 'center'
    //...shadows
  },
  opacityr: {
    position: 'absolute',
    width: '40%',
    height: '100%',
    zIndex: 1,
    right: 0,
    justifyContent: 'center'
    //...shadows
  }
})
