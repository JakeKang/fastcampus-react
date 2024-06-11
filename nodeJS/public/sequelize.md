```js
const db = require('./models');
```
* db는 models디렉토리 아래의 모든 폴더를 연결합니다.
```js
//./app.js
db.sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
    return db.sequelize.sync();
})
.then(() => {
    console.log('DB Sync complete.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});
```
* 연결이 되어지면 성공,싱크완료를 출력하고 아닐경우 오류발생을 출력해줍니다.
---
```js
//./models/index.js
const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
```
```js
//./models/index.js
const sequelize = new Sequelize( process.env.DATABASE,
process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00', //한국 시간 셋팅
    operatorsAliases: Sequelize.Op,
    pool: { //DB connection pool
        max: 5, //최대 5명
        min: 0, //최소 0명입니다.
        idle: 10000
    }
});
```
1. 새로운 sequelize를 선언합니다.
2. db정보를 입력합니다.
3. dialect는 데이터베이스 정보, timezone은 시간, operationAliases는 오퍼레이트의 이명입니다.
4. database connect pool을 설정합니다.
```js
//./model/index.js
fs.readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.js')&& file !== 'index.js'
    })
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname,
            file));
            db[model.name] = model;
    });
Object.keys(db).forEach(modelName => {
    if("associate" in db[modelName]){
        db[modelName].associate(db);
    }
});
```
* 디렉토리 내부에 있는 파일을 읽어옵니다.
* filter로 js파일 이거나 index.js파일이 아닌것을 분류합니다.
* 분류된 파일을 각각 sequelize에 입력합니다.
* 키값을 기준으로 modelname을 associate시켜줍니다.
```js
//./model/index.js
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```
* 마지막으로 db를 exports해줍니다.
---
```js
//./model/db설정.js
module.exports = (sequelize, DataTypes)=>{
let table명변수 = sequelize.define('table명',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //숫자형 기본키 자동증가
        name : { type: DataTypes.STRING }, //varchar(255) 
        price : { type: DataTypes.INTEGER }, //숫자
        description : { type: DataTypes.TEXT } //텍스트타입
    }
return table명변수
);
```
* DB를 테이블 구조입니다. module형식으로 생성하며 각 테이블 칼럼의 구조를 입력합니다.
--- 
```js
//./routes/admin.js
const models = require('../models');
const db설정명 = require('../models/db설정.js');
```
* models디렉토리 내부에 sequelize설정이 있기 때문에 연결합니다.
* 아래 products는 해당 테이블 구조를 읽어옵니다.
    * create = insert into
    ```js
    models.table명.create(request.body) //키값과 동일한 경우 해당방법으로 공유할 수 있습니다.
    .then(()=>{
        res.redirect('/');
    });
    ```
    ```js
    models.table명.create({
        name : requeset.body.name,
        price : requeset.body.price,
        description : requeset.body.description,
    }).then(()=>{
        res.redirect('/');
    })
    ```
    * find = select
    * findAll = select * 
    ```js
    models.table명.findAll({}) //Products테이블 모든 값을 받아옵니다.
    .then( (테이블) => { 
        // DB에서 받은 products를 products변수명으로 내보냄
        res.render( '폴더경로' ,{ 테이블키값 : 테이블 });
    });
    ```
    * findByPk = 기본키를 가지고 해당 제품을 DB에서 조회한다.
    ```js
    models.table명.findByPk(req.params.id).then( (테이블) => {
        res.render('폴더경로', { 테이블키값 : 테이블 });  
    });
    ```
    * update = update
    ```js
    models.table명.update(req.body, //키값과 칼럼명이 동일할때 사용합니다.
        { 
            where : { id: req.params.id } 
        }
    ).then( () => {
        res.redirect('라우터경로' + req.params.id );
    });
    ```
    ```js
    models.table명.update(
        {   
            name : req.body.name, 
            price : req.body.price ,
            description : req.body.description
        }{ 
            where : { 
                id: req.params.id //where id = '입력값'
            } 
        }
    ).then( () => {
        res.redirect('라우터경로' + req.params.id );
    });
    ```
    * destroy = delete 
    ```js
    models.table명.destroy({
        where: {
            id: req.params.id //where id = '입력값'
        }
    }).then(() => {
        res.redirect('라우터경로');
    });
    ```
