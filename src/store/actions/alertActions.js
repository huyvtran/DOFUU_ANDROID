export const _showAlert = (data) => {
	return {
		type : 'SHOW_ALERT',
		alert: data
	}
}

export const _closeAlert  = () => {
	return {
		type: 'CLOSE_ALERT'
	}
}


export const showAlert = (data) => {
	return (dispatch) => {
		dispatch(_showAlert(data))
		if(data.close) {
			setTimeout(() => {
				dispatch(_closeAlert())
			}, 3000)
		}
	}
}