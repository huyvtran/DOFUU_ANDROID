import { baseURL } from '../../fastlane/config'

export function image(url) {
	if(url == null) {
		return baseURL+'/img/ImageDefault.jpg'
	} else {
		if(url.slice(1, 8) === "storage") {
			return baseURL+url
		} else {
			return url
		}
	}
}

export function typeIcon(value, color) {
	var status = new String(value).toLowerCase()
	switch(status) {
		case 'quán ăn': 
		return `/map_icons/${color}/quan-an.png`
		break
		case 'trà sữa': 
		return `/map_icons/${color}/tra-sua.png`
		break
		case 'cà phê': 
		return `/map_icons/${color}/ca-phe.png`
		break
		case 'ăn vặt': 
		return `/map_icons/${color}/an-vat.png`
		break
		case 'thức ăn nhanh': 
		return `/map_icons/${color}/thuc-an-nhanh.png`
		break
		case 'vỉa hè': 
		return `/map_icons/${color}/via-he.png`
		break
	}
}