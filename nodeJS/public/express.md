Express 프레임워크
===
* 프레임워크
    * 개발에 템플릿 역활을하는 인터페이스와 클래스의 집합
    * 프레임워크를 사용하면 기본적으로 행하는 행동을 제공해주는 역활을 해주어 개발할 경우 준비과정의 시간이 단축될 수 있습니다.
* express 프레임워크는 EJS와 동일하게 Node.js 패키지로 제공되고 있습니다. npm에서 간단하게 설치가 가능하며 템플릿 엔진에 ejs 사용하여 기존에 사용중인 ejs를 재사용 할 수 있습니다.
    * ejs는 템플릿 엔진입니다.
    * 템플릿을 읽어서 문법과 설정에 따라서 파일을 HTML형식으로 변환시켜 주는 모듈입니다.
    ```js
    express.render = function(req,res){
        req.render('index.html',{hello : 'hello template!'})
    }
    ```
    ```html
    <div><%= hello %></div>
    ```
    * 해당 강의에서는 nunjucks를 사용합니다. nunjucks에서 변수를 사용하려면 단순합니다. {{}}내부에 사용하면 쉽게 사용할 수 있습니다.
        * [nunjucks 홈페이지](https://mozilla.github.io/nunjucks/)
* npm을 이용하여 설치하면 됩니다. express를 설치할 경우 고려해야 할 것이 어디에 설치하는 것인가가 중요합니다.
* express는 에러 잡는 부분에서 try-catch를 이용해서 잡아야 합니다.