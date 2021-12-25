import React  from 'react';
import {View,Text, StyleSheet,TouchableOpacity} from 'react-native';

const CinemaItem = ({
  onItemPress,
  labels = [{
    title: 'IMAX厅',
    type: 'movie'
  },{
    title: '观影小食',
    type: 'cinema'
  }
  ],
  addrTextType = 'label',
  name= '',
  addr = '',
  note = '',
  noteStyle,
  renderInfo,
  centerText,
  centerTextStyle = {},
  rightStyle,
}) => {

  const Container = onItemPress ? TouchableOpacity : View

  return (
    <Container style={[styles.container, {backgroundColor: '#fff'}]} activeOpacity={0.7} onPress={onItemPress}>
      <View style={styles.leftContainer}>
        <Text type="heading" bold >{name}</Text>
        <Text type={addrTextType} style={[styles.address, {color:'#ABAFBB'}]}>{addr}</Text>
        <View style={styles.labelContainer}>
          {
            labels.map((item, index) =>  <Label label={item.title} type={item.type} key={index.toString()}/>)
          }
        </View>
        {
          note ?  <Text type={'label'} style={[{color: '#ABAFBB', marginTop: 4}, noteStyle]}>{note}</Text> : null
        }
      </View>
      <View style={[styles.rightContainer,rightStyle ]}>
        { renderInfo ? renderInfo() : null }
        {centerText  ? <Text type="subheading" style={[{color: '#ABAFBB'}, centerTextStyle]}>{centerText}</Text> : null }
      </View>
    </Container>
  )
}

const Label = (props) => {
  const { label = 'IMAX厅', type = 'movie' } = props
  return (
    <View style={[styles.label, {borderColor: type === 'movie' ? '#FC5869' : '#389AFC'}]}>
      <Text type="body" style={[{color: type === 'movie' ? '#FC5869' : '#389AFC'}]}>{label}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff'
  },
  leftContainer: {
    flex: 1
  },
  rightContainer: {
    justifyContent: 'center'
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 3,
    marginBottom: 2
  },
  label: {
    borderRadius: 2,
    borderWidth: 0.7,
    paddingHorizontal: 3,
    marginRight: 3,
  },
  address: {
    marginTop: 5
  }
})

export default CinemaItem
