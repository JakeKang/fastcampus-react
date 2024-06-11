import React from 'react';
import 'antd/dist/antd.css';       // <= 전역 스타일 추가 in index.js
import { DatePicker } from 'antd'; // <= 리액트 컴포넌트 in App.js


function App() {
  return (
    <div className="App">
     <DatePicker />
    </div>
  );
}

export default App;
