import React from 'react';
import LoginButton from '../Components/LoginButton';

export default function Login() {
    return (
        <div>
        <h1>Login</h1>
        <LoginButton />
        </div>
    );
}

// 1.
// export default function Login({history}) {
// <LoginButton history={history} />
// 분해할당된 props의 history를 자식요소 LoginButton에 전달한다.

// 2.App
// <LoginButton />>
// withRouter 를 이용하기에 자식요소에게 history를 전달하지 않아도 된다.