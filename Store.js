//db역할을 하는 storage객체만 관리한다.

import { createNextId } from "./helpers.js";
import storage from "./storage.js";

const tag = "[Store]";

class Store {
  constructor(storage) {
    console.log(tag, "constructor");

    if (!storage) throw "no storage";

    this.storage = storage;
  }

  search(keyword) {
      this.addHistory(keyword);
      return this.storage.productData.filter((product) =>
      product.name.includes(keyword)
      //product이름과 keyword가 일치하는 것이 있는지 찾는다.
    );

  }
  addHistory(keyword=""){
    keyword=keyword.trim();
    if(!keyword){
      return;
    }
    const hadHistory = this.storage.historyData.some(
      (history)=>history.keyword===keyword
    );
    if(hadHistory) this.removeHistory(keyword);
    
    const NextId = createNextId(this.storage.historyData);
    const date = new Date();
    this.storage.historyData.push({keyword,date});
    this.storage.historyData = this.storage.historyData.sort(this._sortHistory);
  }
  getKeywordList() {
    return this.storage.keywordData;
  }
  getHistoryList(){
    return this.storage.historyData.sort(this._sortHistory);
  }
  _sortHistory(history1,history2){
    if(history1.date< history2.date){
      return 1;
    }
    if(history1.date> history2.date){
      return -1;
    }
    return 0;
  }
  removeHistory(keyword){
    this.storage.historyData = this.storage.historyData.filter(
      (history)=> history.keyword!==keyword
    );
  }
}

const store = new Store(storage);
export default store;
