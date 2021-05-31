import React from 'react';
import {ListItem, Text, Body, Left, Right, Thumbnail} from 'native-base';
import Rating from './Rating';
import { TouchableOpacity } from 'react-native';
export default function Product(props, navigation){
    return(
        <ListItem key = {props.key}>
            <Left>
                <Thumbnail square source = {{uri:props.product.avatar_url}} />
            </Left>
            <Body>
                <TouchableOpacity
                    onPress={() => navigation.navigate('view', props.product.key)}>
                    <Text>{props.product.login}</Text>
                </TouchableOpacity>
            </Body>
            <Right>
                <Rating value={props.product.score} />
            </Right>
        </ListItem>
    );
}
