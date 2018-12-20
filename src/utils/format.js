import numeral from 'numeral'
import moment from 'moment'
import 'numeral/locales'
numeral.locale('vi');

export function formatTime(time) {
	if(time) {
		return moment(time, 'HH:mm:ss').format('HH:mm')
	}
}

export function formatPrice(price) {
	if(price) {
		return numeral(price).format('0,0$')
	}
}