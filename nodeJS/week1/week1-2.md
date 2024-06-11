week2
===
### Module
* .dotenv
    * ```npm install dotenv```
    * 환경 변수입니다.
        * 환경병수는 process를 위한 key-value형태의 변수입니다.
    * 크로스플랫폼에서도 유용하게 사용할 수 있습니다.
        * mac,window,linux등 OS별로 설정해주기 위하여 env에 저장하여 사용합니다.
    * github같은 공유가 가능한 곳에 정보를 올릴때 db외에도 외부에 노출하면 안되는 데이터를 저장하기 위하여 사용합니다.
    * env를 사용하면 해당 구조를 해석하기 힘들기 때문에 envcopy를 대신 업로드하여 해당 코드 구조를 업로드 합니다.
    ```
    //envcopy의 예
    DATABASE = "Database Name"
    DB_USER = "Database ID"
    DB_PASSWORD = "Database Password"
    DB_HOST = "Database host"
    ```
    ```js
    dotenv.config(); //dotenv를 읽어옵니다.
    
    host: process.env.DB_HOST //이러한 방식으로 host연결을 설정합니다. process.env.이름
    ```
* sequelizer
    * ORM(Object Relational Mapping)입니다.
    * 테이블을 생성할 경우 createAt,updateAt칼럼이 생성됩니다.
    타입은 datetime으로 지정됩니다.
    * join하는 쿼리문을 작성할 경우 복잡해지고 길어져 가독성이 많이 떨어져서 해석이나 분석하기 힘들어집니다 니는 유지보수나 오류찾을때 시간낭비가 심해진다는 의미랑 동일합니다. 이런경우를 직관적으로 해석할 수 있게 도와주는 작업을 합니다.
    * 가독성이 오른다는 말은 재사용이나 유지보수면에서 수월하게 사용할 수 있습니다.
    * DBMS에 대하여 종속성이 줄어듭니다.
    * 설계면에서 편의를 제공하지만 RM만으로 완벽한 서비스를 구현하기 어렵습니다. 복잡성이 커질수록 난이도가 올라갑니다.

* mysql 설치
    * brew install mysql
    * mysql.server start
    * mysql_secure_installation 
    * mysql -u root -p
* model/index.js
    * 테이블이랑 mapping를 만들어준다.
    * dotenv.config를 사용하면 .env파일의 정보를 이용할 수 있다.
    * process.env.변수명
* morgan
    * 사이트에서 서버에 접근하여 CRUD를 콘솔에다가 로그 기록을 남겨 줍니다.
    * 개발시 발생한 이슈를 콘솔창에 남겨주어 편의성을 증가시켜줍니다.
    ```js
    const logger = require('morgan');

    app.use(logger('dev'));
    ```
* moment
    * ```npm install moment``` 을 이용하면 날짜를 format으로 지정하여 간편하게 사용할 수 있습니다.
    * 해당 설정을 prototype으로 사용하면 편하게 설정을 사용할 수 있습니다.
    ```
    테이블명.prototype.dateFormat = (date) => (
        moment(date).format('YYYY년 MM월 DD일')
    );
    ```
* body-parse
    * 기본적으로 존재하는 모듈입니다 해당 모듈은 요청시 보내진 값을 받아올 수 있습니다.
    * app.js에 해당 값으로 셋팅을 해주어야합니다. 
    ```js
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended : false }));
    ```
---
### Setting
* 프로그램을 배포할 경우 에러가 발생하면 이것을 잡아서 다른 에러가 떳다는것만 보여주어야 합니다. 오류를 외부에 노출하면 설계구조를 파악하고 분석할 수 있습니다.
* url에 값을 입력하여 해당 정보를 이용하서 서버를 설계할 수 있습니다. 이것또한 외부에 노출시 보안 이슈가 발생할 수 있어서 값을 암호화하는 작업을 진행합니다.
* 이벤트가 발생하여 DB에 접근할때 쿼리문 입력 순서가 대로 진행하기 때문에 쿼리문을 여러번 발생할경우에는 비동기로 처리해주어야 합니다.
---
### template engine
* ```{% for value in list %}```를 이용하여 제어문을 사용할 수 있습니다. 해당 코드는 자바스크립트의 ```for(let value in list)```를 사용하는 것과 동일합니다. 마지막에는 ```{% endfor %}```로 제어문 종료를 명시해주어야 합니다.
* 노드에서 데이터를 전송할때 Object로 보내주기 때문에 ```{{ 테이블명.칼럼명 }}```를 이용하여 간편하게 값을 작성하여 줄 수 있습니다.
* 
---
### nodejs
* redirect
    * 라우터 경로로 url경로를 재설정 해줄 수 있습니다.
    * url경로를 재 설정 해줄 수 있습니다.
    * then을 이용하여 이벤트 실행 후 다음 이벤트를 실행 해 줄 수 있습니다,
    * [redirect Docs](https://expressjs.com/ko/4x/api.html#res.redirect)
* render
    * 해당 뷰 페이지를 렌더링하여 값을 전송해줍니다.
* request.param.변수명
    * express라우터를 지정해줄때 개인정보를 이용하다 보면 ```http://test.com/id=1&name='jeong'```를 이용하는 경우를 볼 수 있습니다.대부분의 사이트는 1과jeong는 정보노출때문에 암호화 되어 있어 우리가 읽을수는 없습니다.
    * 저럴경우 id랑name값을 이용하여 조회,수정,제거를 할 수 있습니다.