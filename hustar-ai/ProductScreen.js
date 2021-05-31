import React from 'react';
import {Container, Header, Content, Text} from 'native-base';
import axios from 'axios';

export default function ProductScreen({route, navigation}){
    const product = route.params;
    // url 이용
    // useEffect => 상세정보 가져오기
    
    return (
        <Container>
            <Header />
            <Content>

            </Content>
        </Container>
    )
}
