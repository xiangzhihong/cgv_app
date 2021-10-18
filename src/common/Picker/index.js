import * as React from 'react';
import {View, Animated, Easing} from 'react-native';
import Container from './Container';
import Wheel from '../wheel';
import date from '../../utils/date';

const top = new Animated.Value(0);
const years = date.getYears();
const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const DatePicker = ({title, onSubmit}) => {
  const close = () => {
    Animated.timing(top, {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(
      () => global.siblingDatePicker && global.siblingDatePicker.destroy(),
    );
  };

  const show = () => {
    Animated.timing(top, {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    show();
  }, []);

  const tt = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0,
  ).getDate();
  const [yearIndex, setYearIndex] = React.useState(
    new Date().getFullYear() - 1970,
  );
  const [mounthIndex, setMounthIndex] = React.useState(new Date().getMonth());
  const [dayIndex, setDayIndex] = React.useState(new Date().getDate() - 1);
  const [dayList, setDayList] = React.useState(
    tt === 31
      ? [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
        ]
      : tt === 30
      ? [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
        ]
      : tt === 29
      ? [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
        ]
      : tt === 28
      ? [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
        ]
      : [],
  );
  const [timer, setTimer] = React.useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`,
  );

  const submit = () => {
    onSubmit(timer);
    close();
  };

  return (
    <Container close={close} submit={submit} title={title} top={top}>
      <View style={{flexDirection: 'row', alignItems: 'center', height: 280}}>
        <Wheel
          style={{height: 220, flex: 1}}
          itemStyle={{textAlign: 'center'}}
          defaultIndex={yearIndex}
          onChange={index => {
            setYearIndex(index);
            setTimer(
              `${years[index]}-${monthList[mounthIndex]}-${dayList[dayIndex]}`,
            );
          }}
          items={years}
        />
        <Wheel
          style={{height: 220, flex: 1}}
          defaultIndex={mounthIndex}
          itemStyle={{textAlign: 'center'}}
          onChange={index => {
            const days = new Date(
              new Date().getFullYear(),
              index + 1,
              0,
            ).getDate();
            setDayList(
              days === 31
                ? [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                    24,
                    25,
                    26,
                    27,
                    28,
                    29,
                    30,
                    31,
                  ]
                : days === 30
                ? [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                    24,
                    25,
                    26,
                    27,
                    28,
                    29,
                    30,
                  ]
                : days === 29
                ? [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                    24,
                    25,
                    26,
                    27,
                    28,
                    29,
                  ]
                : days === 28
                ? [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                    24,
                    25,
                    26,
                    27,
                    28,
                  ]
                : [],
            );
            setMounthIndex(index);
            setTimer(
              `${years[yearIndex]}-${monthList[index]}-${dayList[dayIndex]}`,
            );
          }}
          items={monthList}
        />
        <Wheel
          style={{height: 220, flex: 1}}
          defaultIndex={dayIndex}
          itemStyle={{textAlign: 'center'}}
          onChange={index => {
            setDayIndex(index);
            setTimer(
              `${years[yearIndex]}-${monthList[mounthIndex]}-${dayList[index]}`,
            );
          }}
          items={dayList}
        />
      </View>
    </Container>
  );
};

export {DatePicker};
