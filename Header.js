import React from "react";

const Header= (props)=>{
    return(
        <header>
            <h2 className="container">{props.title}</h2>
        </header>
    )
}

export default Header;

//함수 컴포넌트와 클래스 컴포넌트의 가장 큰 차이는 상태의 유무
//함수는 스테이트가 없다. 
//props는 컴포넌트 외부에서 들어와 내부 ui에 영향을 준다.
//props 변호에 따라 리액트가 리액티브하게 변화한다.
