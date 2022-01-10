import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native'

const ShoppingCartBtn = ({ count, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} >
      <View style={styles.btnBg}>
        <ImageBackground
          source={require('../../../assets/images/shop/shoppingcart.png')}
          style={{ width: 18, height: 18 }}>
          { !!count && (
            <View style={styles.storeCarNumView}>
              <Text style={styles.storeCarNumText}>{count}</Text>
            </View>
          )}
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 40,
    right: 0,
    width: 76,
    height: 60,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  btnBg: {
    width: 41,
    height: 41,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  storeCarNumView: {
    backgroundColor: '#FC5869',
    borderRadius: 15,
    position: 'absolute',
    width: 18, height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    left: 16,
    bottom: 14,
  },
  storeCarNumText: {
    color: '#fff',
    fontSize: 10,
  },
})

export default ShoppingCartBtn
