import React, { useState } from 'react'
import {
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons'
const { width, height } = Dimensions.get('screen')

export default ({
  img,
  life,
  poison,
  downlife,
  downpoison,
  uplife,
  uppoison,
  up
}) => {
  const [switcher, setSwitcher] = useState(true)
  return (
    <ImageBackground
      source={img}
      style={[styles.background, { opacity: life < 1 || poison > 9 ? 0.4 : 1 }]}
    >
      <Entypo
        style={{
          position: 'absolute',
          zIndex: 3,
          right: up ? 15 : null,
          top: up ? 15 : null,
          left: up ? null : 15,
          bottom: up ? null : 15,
          transform: up ? [{ rotate: '180deg' }] : []
        }}
        name={switcher ? 'drop' : 'heart'}
        size={35}
        color="white"
        onPress={() => setSwitcher(!switcher)}
      />
      <TouchableOpacity
        style={up ? styles.opacityl : styles.opacityr}
        onPress={() => {
          if (switcher) {
            downlife()
          } else {
            uppoison()
          }
        }}
      >
        <AntDesign
          style={{
            position: 'absolute',
            zIndex: 3,
            alignSelf: 'center',
            transform: up ? [{ rotate: '180deg' }] : []
          }}
          name={switcher ? 'minuscircleo' : 'pluscircleo'}
          size={35}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={up ? styles.opacityr : styles.opacityl}
        onPress={() => {
          if (switcher) {
            uplife()
          } else {
            downpoison()
          }
        }}
      >
        <AntDesign
          style={{
            position: 'absolute',
            zIndex: 3,
            alignSelf: 'center',
            transform: up ? [{ rotate: '180deg' }] : []
          }}
          name={switcher ? 'pluscircleo' : 'minuscircleo'}
          size={35}
          color="white"
        />
      </TouchableOpacity>
      <Text
        style={{
          position: 'absolute',
          zIndex: 0,
          fontSize: width / 3,
          color: switcher ? 'white' : 'magenta',
          transform: up ? [{ rotate: '180deg' }] : [],
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          textShadowOffset: { width: 5, height: 5 },
          textShadowRadius: 10
        }}
      >
        {switcher ? life : poison}
      </Text>
    </ImageBackground>
  )
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
    width: '40%',
    height: '100%',
    zIndex: 1,
    //backgroundColor: 'red',
    left: 0,
    justifyContent: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10
  },
  opacityr: {
    position: 'absolute',
    width: '40%',
    height: '100%',
    zIndex: 1,
    //backgroundColor: 'blue',
    right: 0,
    justifyContent: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10
  },
  background: {
    justifyContent: 'center',
    //width: '100%',
    //height: '100%',
    //height: '45%', // AQUEST ES EL BO
    height: height / 2 - 50,
    alignItems: 'center',
    backgroundColor: 'red'
  }
})
