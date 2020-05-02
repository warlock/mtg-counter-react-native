import React, { useState } from 'react'
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons'

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
  const { width } = Dimensions.get('screen')
  return (
    <ImageBackground
      source={img}
      style={[styles.background, { opacity: life < 1 || poison > 9 ? 0.4 : 1 }]}
    >
      <View style={styles.container}>
        <Entypo
          style={{
            position: 'absolute',
            zIndex: 3,
            right: up ? 20 : null,
            top: up ? 20 : null,
            left: up ? null : 20,
            bottom: up ? null : 20,
            transform: up ? [{ rotate: '180deg' }] : []
          }}
          name={switcher ? 'drop' : 'heart'}
          size={35}
          color="white"
          onPress={() => {
            setSwitcher(!switcher)
          }}
        />
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
              alignSelf: 'center',
              transform: up ? [{ rotate: '180deg' }] : []
            }}
            name="minuscircleo"
            size={35}
            color="white"
          />
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
              alignSelf: 'center',
              transform: up ? [{ rotate: '180deg' }] : []
            }}
            name="pluscircleo"
            size={35}
            color="white"
          />
        </TouchableOpacity>
        <Text
          style={{
            position: 'absolute',
            zIndex: 0,
            fontSize: width / 3,
            color: switcher ? 'lightgreen' : 'magenta',
            transform: up ? [{ rotate: '180deg' }] : [],
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: 5, height: 5 },
            textShadowRadius: 10
          }}
        >
          {switcher ? life : poison}
        </Text>
      </View>
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
    width: '100%',
    height: '50%',
    alignItems: 'center',
    backgroundColor: 'red'
  }
})
