import moment from 'moment';

export const forSearchFormat = (start: moment.Moment, end: moment.Moment) => {
  return {
    start: start.format(),
    end: end.add(1, 'days').format(),
  };
};
