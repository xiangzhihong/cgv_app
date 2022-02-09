import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import Card from '../../../../common/Card/Card';
import SectionHeader from '../../../../common/SectionHeader';

const TicketTotalContainer = ({ current }) => {
  let list = current?.ticketOrder?.ticketTotal?.details?.reduce((obj, item) => {
    let find = obj.find(i => i.dsc_price === item.dsc_price && item.dsc_type !== "mbrcard" || i.dsc_name === item.dsc_name && i.dsc_cd === item.dsc_cd && i.dsc_price === item.dsc_price && item.dsc_type !== "voucher" && item.dsc_auth_no === "")
    let _d = {
      ...item,
      frequency: 1
    }
    find ? (find.num+=item.num,find.frequency++ ): obj.push(_d)
    return obj
  }, [])
  return (
    <Card type="clear" style={styles.container}>
      <View>
        <SectionHeader title="票价小计：" isRenderRight isRenderButton={false} rightText={`¥${current && current.ticketOrder && current.ticketOrder.ticketTotal &&  current.ticketOrder.ticketTotal.totalAmount}`}/>
        {list?.map((item, index) => (
          <View style={styles.discountLine} key={index}>
            <Text type='subheading' style={styles.discountName}>已优惠</Text>
            <Text type='bodyheading' style={styles.discountAmount}>-￥{(item.itemAmount*item.frequency).toFixed(0)}</Text>
          </View>
        ))}
      </View>
    </Card>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginHorizontal: 12,
    padding: 12
  },
  sectionTitle: {
    color: '#222222'
  },
  sectionTitleButton: {
    color: '#777777'
  },
  discountLine: {
    height: 29,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 18
  },
  discountName: {
    width: 180,
    height: 29,
    lineHeight: 29,
    color: '#777',
  },
  discountAmount: {
    width: 50,
    height: 29,
    lineHeight: 29,
    textAlign: 'right',
    color: '#F1A23D',
    marginRight: 5,
  },
});

export default TicketTotalContainer;
