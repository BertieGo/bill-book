const moment = require('moment');

function getMonthTimeRange(year, month) {
    const startTime = moment(year + '-' + month + '-' + '01' + ' 00:00:00');
    const endTime = startTime.clone().endOf('month');
    return {
        startTime: parseInt(startTime.format('x'), 10),
        endTime: parseInt(endTime.format('x'), 10)
    }
}

module.exports = {
    getMonthTimeRange,
}
