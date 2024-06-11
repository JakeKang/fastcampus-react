import React from 'react';
import {
  withRouter,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

export default withRouter(function Counter(props) {
  console.log(props);
  const history = useHistory();
  console.log(history);
  const location = useLocation();
  console.log(location);
  const params = useParams();
  console.log(params);
  const match = useRouteMatch();
  console.log(match);

  const [count, setCount] = React.useState(0);

  //   React.useEffect(() => {
  //     console.log('[] => componentDidMount');
  //     return () => {
  //       // cleanup => componentWillUnmount
  //     };
  //   }, []); // [];

  //   React.useEffect(() => {
  //     console.log('undefined => componentDidMount + componentDidUpdate', count);
  //     // 설정하기
  //     const resize = () => {};
  //     window.addEventListener('resize', resize);
  //     return () => {
  //       // cleanup
  //       console.log('undefined cleanup', count);
  //       window.removeEventListener('resize', resize);
  //     };
  //   }); // [];

  //   React.useEffect(() => {
  //     console.log('count => count 가 바뀌고 랜더된 직후에 실행된다.', count);
  //   }, [count]); // [];

  return (
    <div>
      <h1>{count}</h1>
      <p>
        <button onClick={click}>+</button>
        <button onClick={click2}>alert</button>
      </p>
    </div>
  );

  function click() {
    setCount(count + 1);
  }

  function click2() {
    setTimeout(() => {
      alert(0);
    }, 1000);
  }
});
