const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;
console.log("port: ",port);
const app= express();

hbs.registerPartials(__dirname+'/views/partials');  /* to register partials*/
hbs.registerHelper('getCurrentyear',()=>{
  return new Date().getFullYear();
}); /*Helper function for year in all the urls (/,/about,/bad)*/
app.set('view engine','hbs');   /* to let express know that view engine HBS will be used*/

app.use(express.static(__dirname+'/public')); /*Expres middleware statis Html page rendering */
app.use((req,res,next)=>{
  var now=new Date().toString();
  fs.appendFile('server.log',`${now},${req.method},${req.url}\n`,()=>{});
//  console.log(`${now},${req.method},${req.url}`);
  next();
});

//maintenence page below

// app.use((req,res,next)=>{
//   res.render('maintenence.hbs',{
//     pageContent:`Miantenence going on. Will be back soon`
//   });
// });

app.get('/',(req,res)=>{
//  res.send("<h1>Hello World</h1>");
  res.render("home.hbs",{
    pageContent:"Welcome to my page",
//    year:new Date().getFullYear()
  });
});

app.get('/about',(req,res)=>{
  // res.send("This is about learning express");
  res.render('about.hbs',{
    pageContent: "This is about HBS learning Express.",
//    year:new Date().getFullYear()
  });
});

app.get('/bad',(req,res)=>{
  res.render('bad.hbs',{
    pageContent:JSON.stringify({
      error: 'error',
      message: 'bad request'
    }),
//    year:new Date().getFullYear()
  });
  // res.send({
  //   error: 'error',
  //   message: 'bad request'
  // });
});

app.listen(port,()=>{
  console.log(`web server started on port ${port}`);
});
