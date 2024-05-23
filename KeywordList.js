import React from "react";
import store from "../Store.js";
import List from './List.js';

export default class KeywordList extends List{

    componentDidMount(){
        const data = store.getKeywordList();
        this.setState({
            data,
        })
        //list를 상속받아서 data가 있다.
    }
    renderItem(item,index){
        return (
          <>
            <span className="number">{index + 1}</span>
            <span>{item.keyword}</span>
          </>
        );
    }
}
