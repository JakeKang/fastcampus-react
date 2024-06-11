week1
===
js 파일 생성후 실행
http모듈 이용하여 웹 띄우기
express모듈 이용하여 웹 띄우기.
---
* nodejs는 req 요청시 해당 이벤트를 받아서 res해주는 방식입니다.
* single-thread를 사용하며, 이벤트가 오면 이벤트 큐에 저장을 합니다. 이벤트 큐에 저장하여 처리가 완료되면 다음 이벤트를 실행하기 때문에 가볍거나 입출력이 적은것은 설계할떄 효율성이 극대화 될 수 있습니다.
* nodejs에서는 ES6문법을 사용할 수 있습니다.
[nodejs ES6](https://node.green/#ES2015-optimisation)
---
* http 모듈 사용
    * 해당 모듈은 node에 내장되어진 모듈이라 따로 설치가 필요 없습니다.
```js
const http= require('http');

http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type' : 'text/plain'});
    res.write('hello nodejs');
    res.end(0)
}).listen(port)
console.log(`localhost:${port}`)
```
* express 모듈설치 
1. cmd창에```npm init```을 입력하여 Package.json을 생성합니다.
    * package-lock.json 에서는 모듈 내부에 설치되어진 버전을 출력해줍니다.
2. cmd창에```npm install express```를 입력하여 express를 생성합니다.
3. require는 import와 동일합니다. 
```js
const express = require('express')

const app = express();

app.get('/',(req,res)=>{
    //logic
})//메인페이지/

app.list(port,()=>{
    //logic
})
```
* nodemon 설치
* sudo npm install -g nodemon 
* nodemon js
* npm설치 파일이라 package.json에서 관리가 가능합니다. scripts 에서 nodemon js 를 작성하여주면 npm run 이름으로 실행이 가능합니다.
```js
scripts :{
    "test" : "echo~~~~",
    "start" : "nodemon app.js"
}
```
```cmd
>npm start
>npm run start
```
* npx :  global모듈을 실행하여줍니다. 만약 nodemon을 global로 설치하셨다면 npx nodmone js를 이용하여 실행하면 됩니다.
---
* router 
* 경로나 코드가 많아 질 경우 사용되어집니다.
* url은 해당 경로의 /admin/products로 설정이됩니다.
* 메인 스크립트에 import해주어야 합니다.
```js
// router.js
const express =require('express');
const router = express.Router();

router.get('/',(req,res)=>{ //localhost:port/
    res.send('admin main');
})

router.get('/products',(req,res)=>{//localhost:port/admin/products
    res.send('admin products');
})

module.exports = router;
```

```js
//app.js
const admin = require('./routes/admin');

//router
app.use('/admin',admin);
```
---
* Template engine (nunjucks)
* ```npm install nunjucks```를 이용하여 설치합니다.
```js
const nunjucks = require('nunjucks');

nunjucks.configure('template',{//template폴더를 이용합니다 ajax,ejs를 이용할때 view를 이용하는 것과 똑같은 것이라고 이해하시면 편합니다.
    autoescape: true, //Script공격을 막아줄 수 있습니다.
    express: app
})
```
```js
// admin.js
router.get('/products',(req,res)=>{
    res.render('admin/products.html',{//값을 전송해줄 수 있습니다.
        camp : 'nodejs'
    })
})
```

* base.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ title }}</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
    <div class="container" style="padding-top:100px;">

        {% block content %}{% endblock %}

    </div>    
</body>
</html>
```
* products.html
```html
{% set title = "관리자 리스트" %}
{% extends "layout/base.html" %}
 
{% block content -%}
    <table class="table table-bordered table-hover">
        <tr>
            <th>제목</th>
            <th>작성일</th>
            <th>삭제</th>
        </tr>
        <tr>
            <td>제품 이름</td>
            <td>
                2017-07-15
            </td>
            <td>
                <a href="#" class="btn btn-danger">삭제</a>
            </td>
        </tr>
    </table>

    <a href="/admin/products/write" class="btn btn-default">작성하기</a>

{% endblock %}
```
* ```{% extends "layout/base.html" %}```는 products.html을 호출할 경우 기본 셋팅 즉, base.html 내부의 html,head,body에 적혀진 코드에 따라 설게됩니다. base.html ```{%block content%}{% endblock %}```으로 둘러쌓인 곳에 입력이 되어집니다.
* base.html에 보면 title을 입력하지 변수로 입력되어진 것을 확인할 수 있습니다. products.html에서 ```{% set title = "관리자 리스트" %}```
 값을 설정해주면 해당 값을 동적으로 변경해줄 수 있습니다.