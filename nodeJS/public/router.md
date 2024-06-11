Router
===
express 가 클라이언트 요청에 응답하는 방식을 말합니다.
```js
app.post('/hello',(req,res)=>{
    res.send('hello world!');
})
```
* post이벤트가 발생하면 hello world!를 반환해주는 예시입니다.
---
### 라우트 메소드
* HTTP 메소드중 하나로부터 파생되어지며 express클래스의 인스턴스에 연결됩니다.
* 지원하는 메소드
    * get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search ,connect
* 변수이름으로 변환되는 메소드를 라우팅하려면 []를 이용하시면 됩니다.
* 특수한 라우팅 메소드인 app.all()은 HTTP메소드로 부터 파생되지 않습니다. 이 메소드는 모든 요청에 대해 한 경로에서 미들웨어 함수를 로드하는데 사용됩니다. CRUD모든 작업에서 해당 핸들러가 실행됩니다.
```js
app.all('/all',(req,res)=>{
    res.send('hello world!');
})
```
---
### 라우트 경로
* 라우트 경로는 문자열,문자열패턴 또는 정규식일 수 있습니다.
```js
app.get('/',(req,res)=>{
    res.send('hello world!');
})
```
요청을 루트 라우터 / 에 일치 시킵니다.
* 이외에도 표현식이 몇개더 존재합니다.
    * ab?cd : ? 앞의 문자가 들어갈지 안들어 갈지를 확인할 수 있습니다.(abcd,acd)만 매칭됩니다.
    ```js
    app.get('ab?cd',function(req,res)=>{
        res.send('just abcd,acd')
    })
    ```
    * ab+cd : + 앞의 문자가 1개이상 들어가면 연결이 됩니다.(abcd,abbcd,abbbbbcd)
    ```js
    app.get('ab+cd',function(req,res)=>{
        res.send('use abcd,abbcd,abbbbbcd etc')
    })
    ```
    * ab*cd : ab,cd사이에 어떤 글자가 들어가도 연결이 됩니다.(absdfaksjdsdafsdfasdfasdfc)
    ```js
    app.get('ab*cd',function(req,res)=>{
        res.send('use abdkfajsdkfjadfacd etc')
    })
    ```
    * ab(cd)?e : 위의 ?연산자와 동일하지만 위는 하나의 문자만 가능하지만 이 방식은 문자열로 가능합니다.(abe, abcde)
    ```js
    app.get('ab(cd)?e',function(req,res)=>{
        res.send('just abe abcde')
    })
    ```
    * /a/ :a가 포함되어진 모든 문자열과 연결이 됩니다.
    ```js
    app.get(/a/,function(req,res)=>{
        res.send('includes a')
    })
    ```
    * /.*a$/ : a로 끝이나는 문자와 연결이 됩니다.
    ```js
    app.get(/.*a$/,function(req,res)=>{
        res.send('use abacabasa , a ,aaaaaaaaaaa etc')
    })
    ```
---
### 라우터 핸들러
* 미들웨어와 비슷하게 작동하는 여러개의 콜백함수를 제공하여 요청을 처리할 수 있습니다.
next('router')를 호출하여 나머지 라우트 콜백을 우회할 수도 있다는 점입니다.
---
```js
const indexRouter = require('./routes/index');

app.use('/',indexRouter);
```
* 주소가 /로 시작하면 rotuer/index.js를 호출하라는 의미입니다.
* javascript의 Import,export처럼 index.js에서 export를 해주어야 합니다.
```js
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('router is done');
})

module.exports = router;
```
라우터 index스크립트 입니다. 해당 라우터를 보면 라우터를 마지막에 export를 명시해주어야 합니다.


* 참조사이트
    * [express docs](https://expressjs.com/ko/guide/routing.html)
    * [라우팅 설명](http://jeonghwan-kim.github.io/express-js-2-%EB%9D%BC%EC%9A%B0%ED%8C%85/)