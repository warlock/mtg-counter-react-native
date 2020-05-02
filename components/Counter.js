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
      style={[
        styles.background,
        {
          opacity: life < 1 || poison > 9 ? 0.4 : 1,
          transform: up ? [{ rotate: '180deg' }] : null
        }
      ]}
    >
      <Entypo
        style={{
          position: 'absolute',
          zIndex: 3,

          left: 15,
          bottom: 15
        }}
        name={switcher ? 'drop' : 'heart'}
        size={35}
        color="white"
        onPress={() => setSwitcher(!switcher)}
      />
      <TouchableOpacity
        style={styles.opacityr}
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
            alignSelf: 'center'
          }}
          name={switcher ? 'minuscircleo' : 'pluscircleo'}
          size={35}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.opacityl}
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
            alignSelf: 'center'
          }}
          name={switcher ? 'pluscircleo' : 'minuscircleo'}
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
