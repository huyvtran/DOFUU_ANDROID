import React, { Component } from 'react'

import { 
    View, 
    Text,
} from 'react-native'

import { 
    Left,
    Body,
    Right,
    Header,
    Item,
    Title,
    Input,
    Button,
    Icon, 
    Card, 
    CardItem,
    List,
    ListItem,
    Separator, 
    Thumbnail
} from 'native-base'

import { styles, aligns, text, colors, spacing } from '../../styles'
import { image } from '../../utils'
import deviceStorage from '../../services/deviceStorage';

export default class Profile extends Component {
    
    static navigationOptions = ({ navigation, navigationOptions }) => ({
        header     : null,
        title      : `Tài Khoản`,
        tabBarLabel: 'Tài Khoản',
        tabBarIcon : ({ tintColor, focused }) => (
			<Icon type="MaterialCommunityIcons" name={focused ? "account" : "account-outline"}  style={{ color: tintColor, fontSize: 25 }} />
		)
    })
    
    async _logout () {
        const { navigation, logout } = this.props
        navigation.navigate('Auth')
        logout()

    }
    
    render() {
        const { navigation, isLoggedIn, user } = this.props
        console.log(this.props)
        return (
            <View style={styles.container}>
                <Header searchBar rounded style={colors.white}>
                    <Item rounded style={colors.greyLighten4}>
                        <Icon name="ios-search" />
                        <Input placeholder="Tìm kiếm món, quán ăn..." onFocus  = {() => navigation.state.routeName != 'Search' ? navigation.navigate('Search') : null}/>
                    </Item>
                </Header>
                <Card transparent>
                    <CardItem button onPress={() => alert('ok')} style={[aligns.column, aligns.justifyCenter]}>
                        <Thumbnail large source={{uri: image(user.image)}} />
                        <Text style={[text.textDark, text.fontWeightBold, text.headline]}>{user.name}</Text>
                    </CardItem>                    
                </Card>

                <Card transparent>
                    <List style={colors.white}>
                        <ListItem icon button onPress={() => alert('bộ sưu tập')}>
                            <Left>
                                <Button style={[colors.blue, styles.circle]}>
                                    <Icon type="MaterialCommunityIcons" name="bookmark" />
                                </Button>
                            </Left>
                            <Body><Text>Bộ sưu tập</Text></Body> 
                        </ListItem>
                        <ListItem icon button onPress={() => alert('Lịch sử đặt món')} last>
                            <Left>
                                <Button style={[colors.redDarken3, styles.circle]}>
                                    <Icon type="MaterialCommunityIcons" name="history" />
                                </Button>                               
                            </Left>
                            <Body><Text>Lịch sử đặt món</Text></Body>
                        </ListItem>
                        <Separator bordered  style={colors.greyLighten4} />
                        <ListItem last>
                            <Body>
                                <Button block style={[colors.redDarken1, styles.rounded]} small hasText onPress={() => this._logout()}>
                                    <Text style={text.textWhite}>ĐĂNG XUẤT</Text>
                                </Button>   
                            </Body>
                        </ListItem>
                    </List>                    
                </Card>
            </View>
        )
    }
}

