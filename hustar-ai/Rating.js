import React from 'react';
import { Icon } from 'native-base';
import { Row } from 'react-native-easy-grid';
import {TouchableOpacity} from 'react-native';

export default function Rating(props){
    const [rating, setRating] = React.useState(props.value); //rating = 상태값, setRating = 함수
    return(
        <Row>
            <TouchableOpacity onPress={()=>setRating(1)}>
            {rating > 0
                ? <Icon type="FontAwesome" name = "star" />
                : <Icon type="FontAwesome" name = "star-o" />
            }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setRating(2)}>
             {rating > 1
                ? <Icon type="FontAwesome" name = "star" />
                : <Icon type="FontAwesome" name = "star-o" />
            }   
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setRating(3)}>
             {rating > 2
                ? <Icon type="FontAwesome" name = "star" style ={{color : "red"}} />
                : <Icon type="FontAwesome" name = "star-o" />
            }   
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setRating(4)}>
             {rating > 3
                ? <Icon type="FontAwesome" name = "star" />
                : <Icon type="FontAwesome" name = "star-o" />
            }   
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setRating(5)}>
             {rating > 4
                ? <Icon type="FontAwesome" name = "star" />
                : <Icon type="FontAwesome" name = "star-o" />
            }   
            </TouchableOpacity>
            
        </Row>
    );
}