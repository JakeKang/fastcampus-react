import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Signin extends React.Component {
  passwordRef = React.createRef(); // React.useRef
  state = {
    email: '',
  };
  render() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>Signin</h1>
        <p>
          <input type="text" value={this.state.email} onChange={this.change} />
        </p>
        <p>
          <input type="password" ref={this.passwordRef} />
        </p>
        <p>
          <button onClick={this.click}>로그인</button>
        </p>
        {this.state.email.length > 50 && <p>너무 길어</p>}
      </div>
    );
  }

  click = async () => {
    // 이메일과 패스워드 의 value
    const email = this.state.email;
    const password = this.passwordRef.current.value;

    console.log('click', email, password);

    // 서버에 요청
    try {
      const response = await axios.post('https://api.marktube.tv/v1/me', {
        email,
        password,
      });
      const token = response.data.token;
      console.log(token);
      localStorage.setItem('token', token);
      //
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  change = (e) => {
    const text = e.target.value;
    this.setState({ email: text });
  };
}
