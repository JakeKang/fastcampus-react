압축( minify) 과 난독화(uglyfy)

map file

- 디버깅 할 떄 필요한 파일

파일명 - 파일 내용에 대한 해시값

내용이 바뀌지 않았을 경우 캐쉬에 저장된 파일 그대로 쓰기 위해

- long term caching 참고

리액트(spa)에서는 index.html 만 내려주면 된다.

배포방식

- serve -s build
- [https://github.com/zeit/serve](https://github.com/zeit/serve)
- AWS S3 에 배포
- node.js express
- NginX

zeit

- now
  - npm 프로젝트를 쉽게 deploy해주는 사이트

AWS S3 에 react web app 배포하기

nginx 로 프록시 작업

commit 하면 바로 빌드 되는 환경 중요

요즘 docker를 많이 사용한다고 한다.

요청을 했을 때 없으면 index.html 을 보내줘야 한다는 것이 핵심.

node ← nginx ← client

aws lambda

serverless framework

paas

x

Server side rendering

nextjs

refresh token

session storage

progresive webapp

pwa - google 에서 밀고 있는 뭐 그런 것.

- service worker

storybook

upsource
