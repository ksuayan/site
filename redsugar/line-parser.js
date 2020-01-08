import moment from 'moment';

class LineParser {
  static parseAviva(line) {
    const [ 
      date, 
      time, 
      result, 
      unit, 
      tempWarning, 
      other, 
      beforeMeal, 
      afterMeal, 
      fasting, 
      bedtime, 
      controlTest 
    ] = line.split(';');

    if (date && time && result) {
      const [hh, mm] = time.split(':');
      const day = 24 * 60 * 60;
      const timeValue = ((hh) * (60*60) + (mm * 60))/day;

      return {
        timestamp: moment(`${date} ${time}`, 'DD.MM.YYYY HH:mm', true).unix(),
        moment: moment(`${date} ${time}`, 'DD.MM.YYYY HH:mm', true).format(),
        timeValue: timeValue,
        value: parseInt(result)
      }
    }
    return null;
  }
}

module.exports = LineParser;