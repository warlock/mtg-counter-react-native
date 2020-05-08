import React, { useState } from 'react'
import {
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
const { width } = Dimensions.get('screen')

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
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: life < 1 || poison > 9 ? 0.4 : 1,
          transform: up ? [{ rotate: '180deg' }] : null
        }
      ]}
    >
      <TouchableOpacity
        style={{
          position: 'absolute',
          zIndex: 3,
          left: 0,
          bottom: 10,
          width: 60,
          height: 60,
          padding: 10
        }}
        onPress={() => setSwitcher(!switcher)}
      >
        {switcher ? (
          <Image source={require('../assets/poison.png')} />
        ) : (
          <Image source={require('../assets/planeswalker.png')} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.opacityr}
        onPress={() => {
          if (switcher) {
            uplife()
          } else {
            uppoison()
          }
        }}
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
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.opacityl}
        onPress={() => {
          if (switcher) {
            downlife()
          } else {
            downpoison()
          }
        }}
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
      </TouchableOpacity>
      <Text
        style={{
          position: 'absolute',
          zIndex: 0,
          fontSize: width / 3,
          color: switcher ? 'white' : 'magenta',
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
    right: 0,
    justifyContent: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10
  }
})
