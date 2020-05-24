import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'

export default ({ image, setmode }) => (
  <TouchableOpacity onPress={setmode}>
    <Image source={image} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 3,
    left: 0,
    bottom: 10,
    width: 60,
    height: 60,
    padding: 10
  }
})
