import { formatRelativeDate } from './js/helpers.js';
import store from './js/Store.js';

const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};

const TabLabel = {
  [TabType.KEYWORD]: "추천 음식",
  [TabType.HISTORY]: "최근 음식",
};

class App extends React.Component {
constructor(){
    super();
    this.state={
        searchKeyword: "",
        searchResult: [],
        submitted:false,
        selectedTab:TabType.KEYWORD,
        keywordList:[],
        historyList:[],

    }
}
componentDidMount(){
  //외부에서 데이터를 가져오기 위한것
  //dom이 마운트 된 직후
  const keywordList = store.getKeywordList();
  const historyList= store.getHistoryList();
  this.setState({
    keywordList,
    historyList,
  });
}
handleReset(){
  this.setState({
    searchKeyword:"",
    submitted:false,
  });
}
handleChangeInput(event){
    const searchKeyword = event.target.value;
    if(searchKeyword.length <= 0 && this.state.submitted){
        return this.handleReset();
    }
    this.setState({
        searchKeyword,
    })
}
handleSubmit(event){
    event.preventDefault();
    console.log("Todo: handleSubmit",this.state.searchKeyword);
    this.search(this.state.searchKeyword);
}
search(searchKeyword){
    const searchResult=store.search(searchKeyword);
    const historyList = store.getHistoryList();
    //입력한 검색어로 store에서 search함수를 호출한다.
    //그럼 store는 검색된 상품 항목을 반환한다.
    //그걸 가지고 setState로 searchResult 상태를 갱신한다.
    this.setState({
      searchResult,
      searchKeyword,
      historyList,
      submitted:true,
    });
}
handleClickRemoveHistory(event,keyword){
  event.stopPropagation();
  store.removeHistory(keyword);
  const historyList = store.getHistoryList();
  this.setState({
    historyList,
  })
}
handleInformation(id){

}
render() {
  const searchForm = (
    <form
      onSubmit={(event) => this.handleSubmit(event)}
      onReset={() => this.handleReset()}
    >
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        autoFocus
        value={this.state.searchKeyword}
        onChange={(event) => this.handleChangeInput(event)}
        //event객체가 들어올것이고, event가 들어오면 handleChangeInput이라는 메소드로 전달한다.
      />
      {this.state.searchKeyword.length >0 && (
        <button type="reset" className="btn-reset"></button>
      )}
    </form>
  );
  const searchResult =(
    this.state.searchResult.length > 0 ?(
      <ul className="result">
        {this.state.searchResult.map(({id,imageUrl,name})=>{
          return(
            <li key={id}>
              <img src={imageUrl} onClick={()=>{this.handleInformation(id)}}/>
              <p>{name}</p>
            </li>
          );
        })}
      </ul>
    ):(<div className="empty-box">검색결과가 없습니다.</div>
  )

  );
  const keywordList=(
    <ul className="list">
      {this.state.keywordList.map(({id,keyword},index)=>(
          <li key = {id}
          onClick={()=>this.search(keyword)}>
            <span className="number">{index+1}</span>
            <span>{keyword}</span>
          </li>
      ))}
    </ul>
  );
  const historyList=(
    <ul className="list">
      {this.state.historyList.map(({id,keyword,date})=>{
        return(
          <li key={id} onClick={()=>this.search(keyword)}>
            <span>{keyword}</span>
            <span className="date">{formatRelativeDate(date)}</span>
            <button className="btn-remove" onClick={event=>{this.handleClickRemoveHistory(event,keyword)}}></button>
          </li>
        )
      })}
    </ul>
  );
  const tabs =(
    <>
      <ul className="tabs">
        {Object.values(TabType).map(tabtype  =>(
            <li className={this.state.selectedTab==tabtype?"active":""} 
            key={tabtype}
            onClick={()=>this.setState({selectedTab:tabtype})}
            >{TabLabel[tabtype]}</li>
        )  
        )}
      </ul>
      {this.state.selectedTab==TabType.KEYWORD && keywordList}

      {this.state.selectedTab==TabType.HISTORY &&historyList}
    </>
  );
  const handleInform=(

  );
    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          {searchForm}
          <div className="content">
            {this.state.submitted ? searchResult:tabs}
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
