import React from 'react';
import { useRef } from 'react';

export default function SigninForm({ loading, error, login }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <div>
      <p>
        <input type="text" ref={emailRef} />
      </p>
      <p>
        <input type="password" ref={passwordRef} />
      </p>
      <p>
        <button onClick={click}>로그인</button>
      </p>
      {loading && <p>로딩 중...</p>}
      {error !== null && <p>에러다</p>}
    </div>
  );

  function click() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // 유효성 체크

    login(email, password);
  }
}
