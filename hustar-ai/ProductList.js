import React from 'react';
import {List, Text} from 'native-base';
import Product from './Product';
import axios from 'axios';

export default function ProductList(){
    const [products, setProducts] = React.useState([]);
    React.useEffect( async ()=>{
        const res = await axios.get('https://api.github.com/search/users?q=kim');
        setProducts(res.data.items);
    }, []); //컴포넌트를 최초 사용할때 1회 실행
    if(products.length === 0) return <Text>NO PRODUCT</Text>
    return(
        <List>
            {products.map(prod => <Product key={prod.id} product = {prod}/>)}
        </List>
        );
}