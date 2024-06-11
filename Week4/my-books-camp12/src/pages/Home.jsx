import React from 'react';
import withAuth from '../hocs/withAuth';
import axios from 'axios';
import Counter from '../components/Counter';

class Home extends React.Component {
  state = {
    books: [],
    loading: false,
    error: null,
    count: 0,
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>{this.props.token}</p>

        <h1>Count {this.state.count}</h1>
        <p>
          <button onClick={this.plus}>+</button>
        </p>
        <p>
          <button onClick={this.alert}>alert</button>
        </p>

        <Counter />
      </div>
    );
  }

  async componentDidMount() {
    // 책 가져오기
    try {
      this.setState({ loading: true });
      await sleep(3000);
      const response = await axios.get('https://api.marktube.tv/v1/book', {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      });
      const books = response.data;
      this.setState({ books, loading: false });

      /*
        {
          author: "정이든"
          bookId: 1809
          createdAt: "2020-07-22T22:36:58.000Z"
          deletedAt: null
          message: "끝까지 한번 가보자 !!"
          ownerId: "7a1fcf00-6cc6-4f54-84f1-2e55d301d4b5"
          title: "React 끝판왕"
          updatedAt: "2020-07-23T11:45:56.000Z"
          url: "www.naver.com"
        }
      */
    } catch (error) {
      console.log(error);
      this.setState({ books: [], loading: false, error });
    }
  }

  plus = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  alert = () => {
    setTimeout(() => {
      alert(this.state.count);
    }, 1000);
  };
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export default withAuth(Home);
