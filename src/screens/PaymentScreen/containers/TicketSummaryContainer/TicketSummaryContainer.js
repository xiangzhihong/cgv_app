import React  from 'react';
import {
  StyleSheet,
} from 'react-native';
import Card from '../../../../common/Card/Card';
import { TicketSummaryItem } from '../../components';

const TicketSummaryContainer = ({ current }) => {
  return (
    <Card type="clear" style={styles.container}>
      <TicketSummaryItem
        title={current.ticketOrder.ticket.movie.title}
        baseUrl={httpConfig.mediaUrl}
        imgUrl={current.ticketOrder.ticket.movie.imageUrl}
        schedule={`${current.ticketOrder.ticket.schedule.displayName} ${current.ticketOrder.ticket.schedule.scnFrTime}`}
        movieFormat={current.ticketOrder.ticket.movie.movieFormat}
        language={current.ticketOrder.ticket.movie.language}
        cinema={current.cinema.name}
        screen={current.ticketOrder.screen.name}
        seats={current.ticketOrder.ticket.seats}
        totalCount={current.ticketOrder && current.ticketOrder.ticket && current.ticketOrder.ticket.seats && current.ticketOrder.ticket.seats.length}
        totalAmount={current.ticketOrder.ticketTotal.totalAmount}
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
