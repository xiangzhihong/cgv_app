import React  from 'react';
import {
  StyleSheet,
} from 'react-native';
import Card from '../../../../common/Card/Card';
import { TicketSummaryItem } from '../../components';
import httpConfig from "../../../../api/httpConfig";

const TicketSummaryContainer = ({ data }) => {
  return (
    <Card type="clear" style={styles.container}>
      <TicketSummaryItem
        title={data.movName}
        baseUrl={httpConfig.mediaUrl}
        imgUrl={data.movUrl}
        movieFormat={data.movFmt}
        language={data.lang}
        cinema={data.thatName}
        screen={data.screenName}
        seats={data.seats}
        totalCount={data.seats.length}
        totalAmount={data.cinema.money.price}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
});

export default TicketSummaryContainer;
