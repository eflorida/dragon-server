const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '978367',
  key: '3d07f92de58823065e24',
  secret: 'aaa83982293f73cbd190',
  cluster: 'us3',
  useTLS: true
});

// setInterval(() => {
//    pusher.trigger('quizzo-channel', 'quizzo-event', {
//       "message": "hello ancient dragons"
//     });
// }, 20000);

// pusher.trigger('quizzo-channel', 'quizzo-event', {
//   "message": "hello ancient dragons"
// });

app.get('/api/v1/ping', function (req, res) {
   pusher.trigger('quizzo-channel', 'quizzo-event', {
      "message": "hello ancient dragons"
   })
   return res.send('pong')
})

app.post('/api/v1/send/round/:roundCount/:name', function (req, res) {
   console.log('REG :: req :: ', req.params)
   pusher.trigger('quizzo-channel', 'quizzo-event', {
      "round": req.params
   })
   return res.send(req.params)
})

app.post('/api/v1/send/quizzo', function (req, res) {
   const quizzo = req.body
   console.log('Quizzo :: quizzo :: ', quizzo)
   pusher.trigger('quizzo-channel', 'quizzo-event', {
      "quizzo": quizzo
   })
   return res.json(quizzo)
})

app.get('/api/v1/questions', function (req, res) {
   return res.send(questions)
})

app.get('/*', function(req, res) {
   res.sendFile(path.join(__dirname + 'index.html'))
})

app.listen(process.env.PORT || 8080);