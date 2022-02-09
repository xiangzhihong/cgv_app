import React, { useContext } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Card from '../../../../common/Card/Card';

const GetTicketInfoContainer = () => {
  return (
    <Card type="clear" style={styles.container}>
      <View>
        <Image style={{width: 30, height: 30}} source={require('../../../../assets/images/pay/film-order-phone.png')}/>
      </View>
      <View>
        <Image style={{width: 25, height: 25}} source={require('../../../../assets/images/pay/film-order-write.png')}/>
      </View>
    </Card>

  );
};

GetTicketInfoContainer.propTypes = {

};


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
});

export default GetTicketInfoContainer;
