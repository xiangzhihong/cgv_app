import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SPACING } from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign'


const SectionHeader = ({
    title = '剧照·花絮',
    isRenderRight = true,
    isRenderButton = true,
    renderRightView,
    rightText = '更多',
    onClick = {},
}) => {

  return (
    <View style={styles.container}>
      <Text type={"subheading"} bold >{title}</Text>
      {
        isRenderRight ? (
          renderRightView ? renderRightView : (
            !!isRenderButton ? (
              <TouchableOpacity onPress={onClick} style={styles.moreBtn}>
                <Text type={"subheading"} bold style={styles.moreText}>{rightText ? rightText : '更多'}</Text>
                <AntDesign name="right" style={styles.rightIcon} />
              </TouchableOpacity>
            ) : (
              <View style={styles.moreBtn}>
                <Text type={"subheading"} bold style={[styles.moreText, rightText ? {color: '#333'} : null]}>{rightText ? rightText : '更多'}</Text>
              </View>
            )
          )
        ): null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 12,
  },
  moreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    color: '#999',
  },
  rightIcon: {
    color: '#ccc',
    fontSize: 15,
  },
})

export default SectionHeader
