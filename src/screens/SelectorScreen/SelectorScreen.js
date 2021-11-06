import React, { useState, useEffect } from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import ListItem from '../../common/ListItem'
import Holder from '../../common/Holder'

const SelectorScreen = ({ navigation, route }) => {
  const { values = [], defaultValues = [], onConfirm, isMultiple = false } = route.params || {}
  const [selecteds, setSelecteds] = useState(defaultValues)

  const _onRightPress = () => {
    onConfirm(selecteds)
    navigation.goBack()
  }

  useEffect(() => {
    navigation.setParams({ 'onRightPress': _onRightPress })
  }, [selecteds])

  const onPressItem = val => {
    let arr = []
    if (isMultiple) {
      if (selecteds.includes(val)) {
        arr = selecteds.filter(s => s !== val)
      } else {
        arr = [...selecteds, val]
      }
    } else {
      arr = [val]
    }
    setSelecteds(arr)
  }

  const renderItem = ({ item }) => {
    const renderRight = () => {
      const isSelected = selecteds.includes(item)
      if (!isMultiple) {
        return isSelected ? <Feather name="check-circle" color="#F1A23D" size={16} /> : <Feather name="circle" color="#ddd" size={16} />
      }
      return isSelected ? <Feather name="check" color={'#FC5869'} size={16} /> : null
    }
    return <ListItem text={item} isTitle renderRight={renderRight} onPress={() => onPressItem(item)} />
  }

  return (
    <View style={styles.bg} >
      <FlatList
        keyExtractor={(item, index) => item + index}
        data={values}
        renderItem={renderItem}
        ListFooterComponent={<Holder height={120} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#fff',
  },
})

export default SelectorScreen

