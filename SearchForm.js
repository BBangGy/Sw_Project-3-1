import React from "react";

const SearchForm = ({value,onChange,onSubmit,onReset})=>{
  const handleSubmit=(event)=>{
    event.preventDefault();
    onSubmit();
    //검색어를  입력하고 엔터를 누른것만 searchform이 담당하고
    //그 이후의 로직은  부모 컴포넌트인 app으로 전달해서  처리하도록 하기위해 위임해야한다.
    //그런데 외부와 통신하수 있는것이 props뿐이다.
    //부모에서 자식으로 옮기는게 자연스러운건데
    //props에 함수도 전달 가능해서 자식 컴포넌트에서는 함수가props로 전달되고
    //그걸 호출해서 부모쪽으로 메세지를 전달 가능
    //그러니깐 부모 쪽으로 전달하기 위해 콜백을 쓰고 그 전달 받은걸 부모가 처리한다.

  }
  const handleReset=()=>{
    onReset();
  }

  const handleChangeInput=(event)=>{
    onChange(event.target.value);

  }
  return (

    <form onSubmit={handleSubmit} onReset={handleReset}>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        autoFocus
        value={value}
        onChange={handleChangeInput}
      />
      {value.length > 0 && (
        <button type="reset" className="btn-reset"></button>
      )}
    </form>
  );
}
export default SearchForm;
