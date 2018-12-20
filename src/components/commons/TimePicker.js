import React, {Component} from 'react'

import DateTimePicker from 'react-native-modal-datetime-picker';

class TimePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resolve: null,
            reject : null,
            dialog : false,
        }
    }

    render() {
        return(
            <DateTimePicker 

            />
        )
    }
}