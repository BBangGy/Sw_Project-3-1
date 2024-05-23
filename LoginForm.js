
import React from "react";

const LoginForm = ({ id, password, onSubmit, onChange, onReset }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(id, password);
    };

    const handleID = (event) => {
        onsSumbit(event.target.value);
    };

    const handlePassword = (event) => {
        onSubmit(event.target.value);
    };

    const handleReset = () => {
        onReset();
    };

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <label>
                ID:
                <input
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={id}
                    onChange={handleID}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={handlePassword}
                />
            </label>
            <button type="submit">로그인</button>
        </form>
    );
};

export default LoginForm;
