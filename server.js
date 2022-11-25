const express = require('express') // express를 통해 서버를 생성
const mongoose = require('mongoose')
const Article = require('./models/article')
const Comment = require('./models/comment')
const articleRouter = require('./routes/articles')
// 모든 경로는 /articles 부터 출발
//const $ = require("jquery")

const methodOverride = require('method-override')
const comment = require('./models/comment')
const article = require('./models/article')
const app = express() // app 호출시 express 호출

const db = mongoose.connect('mongodb+srv://wnsdhqo:gkrehd102@cluster0.aoo8syv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})




app.set('view engine', 'ejs') // ejs 를 사용하여 view를 작성한 다름 view engine 을 통해 HTML 코드로 변환
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  const article = await Article.findOne({title : articles.title})
  const comment = await Comment.find({parentTitle : articles.title})
  res.render('articles/index', { articles: articles})
  
})

  // find 안에 원래 비어있었음
  // const articles = await Article.find({article : req.query.value}).sort({ createdAt: 'desc' })
  // const article = await Article.findOne({title : articles.title})
  
 
  //  res.render('articles/search', { articles: articles})
  // res.send("Hello World")
 
    // const articles = await Article.find({}).sort({ createdAt: 'desc' })
    // const article = await Article.findOne({title : articles.title})
    //  res.render('articles/search', { articles: articles})
  app.get('/articles/search', async (req,res) => {
      const {keyword} = req.query;
      let articles =[];
        
      if(keyword){
        //keyword가 있다면,
        articles = await Article.find({
          //Article = MongoDB의 Model
          title : {
            $regex : new RegExp(`${keyword}`,"i"),
          },
        }) 
      }
      return res.send(articles);
      
  
     });
      //  res.send("Hello World")

app.use('/articles', articleRouter)


/*app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const Comment = await Comment.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)
*/





 // find 안에 원래 비어있었음

    

app.listen(5000)



