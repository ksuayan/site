import * as ss from 'simple-statistics';
import moment from 'moment';

class Analyze {

  static analyzeDaysAgo(list, daysAgo) {
    const startDate = moment().subtract(daysAgo+1, 'days').unix(),
    newList = list.filter((item, idx)=>(item.timestamp >= startDate)),
    values = newList.map( x => x.value );
    const obj = {
      count: newList.length,
      values: values,
      average: ss.average(values).toFixed(1),
      stdDev: ss.sampleStandardDeviation(values).toFixed(1)
    };
    return obj;
  }

}

module.exports = Analyze;