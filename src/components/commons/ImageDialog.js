import React, { Component } from 'react'

import {
    View,
    Modal,
    Dimensions,
    Image
} from 'react-native'

import {
    Header,
    Button,
    Icon,
    Card,
    CardItem
} from 'native-base'

import { text, colors, styles, aligns } from '../../styles'
import { image } from '../../utils'
const { width, height } = Dimensions.get("window");
const widthScreen       = width
const heightScreen      = height*3/4
class ImageDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resolve: null,
            reject : null,
            dialog : false,
            image  : null
        }
    }
    
    open(image) {
        this.setState({dialog: true, image: image})
        return new Promise((resolve, reject) => {
            this.setState({resolve: resolve, reject: reject})
        })
    }
    
    cancel() {
        this.setState({dialog: false, resolve: this.state.resolve(false), image: null})
    }

    render() {
        return(
            <Modal
                animationType  = "slide"
                transparent    = {false}
                visible        = {this.state.dialog}
                onRequestClose = {() => this.cancel()}
                
            >
                <View style={[styles.container, colors.black, {alignItems: 'center', justifyContent: 'center'}]}>
                    <Card style={[ aligns.alignCenter, aligns.justifyCenter]}>
                        <CardItem cardBody>
                            <Image source={{uri: image(this.state.image)}} style={{height: heightScreen, width: widthScreen, resizeMode: 'contain'}}></Image>
                        </CardItem>
                    </Card>                   
                </View>
            </Modal>
        )
    }
}

export default ImageDialog;