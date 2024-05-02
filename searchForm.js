import store from './js/store.js';
class App extends React.Component {
constructor(){
    super();
    this.state={
        searchKeyword: "",
        searchResult: [],
        submitted:false,
    }
}
handleReset(){
  // this.setState(()=>{
  //     return {searchKeyword:"",submitted:false};
  // },()=>{
  //     console.log("Todo:handleReset",this.state.searchKeyword);
  // })
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
    //입력한 검색어로 store에서 search함수를 호출한다.
    //그럼 store는 검색된 상품 항목을 반환한다.
    //그걸 가지고 setState로 searchResult 상태를 갱신한다.
    this.setState({searchResult,submitted:true,});
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
              <img src={imageUrl}/>
              <p>{name}</p>
            </li>
          );
        })}
      </ul>
    ):(<div className="empty-box">검색결과가 없습니다.</div>
  )

  );
    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          {searchForm}
          <div className="content">
            {this.state.submitted && searchResult}
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
