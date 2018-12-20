import moment from 'moment'

export function activityTime(times) {
    var n   = moment().locale('vi').day()
    var day = times.find(day => {
        if(day.number === n) {
            return day
        } else {
            return false
        }
    })

    if(day) {
        return day.times.map(time => {
            return time.from + ' - ' + time.to 
        })
    } else {
        return 'Hôm nay nghỉ'
    }
}