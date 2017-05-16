/*jshint esversion: 6*/
exports.mood = function(req, rsp) {
  var validationToken = '2J2arrqqs3pK8fcb53WVXocM';

  if(req.body.token == validationToken) {
    rsp.status(403);
  }

  switch(req.method) {
      case 'POST':
        if(req.body.user_name == 'slackbot') {
          rsp.status(200);
        } else {
          const sleep = require('sleep');
          const language = require('@google-cloud/language')();
          var respond = false;
          var message;
          var doc = language.document(req.body.text);
          var loopCount = 0;

          doc.detectSentiment(function(err, sentiment){
            if(err) {
              console.log(err);
              message = `Sorry! I appear to have nothing to say about your message ${req.body.user_name}`;
            } else {
              var score = sentiment.score;
              var magnitude = sentiment.magnitude;

              console.log(`score: ${sentiment.score}, magnitude: ${sentiment.magnitude}`);
              if(score > 0.5) {
                message = `@${req.body.user_name}! You seem suprisingly upbeat today. Love it! You will make it through another day.`;
              } else if(score <= 0.5 && score >= -0.5) {
                message = `@${req.body.user_name}! Where's the passion? Perhaps a salary reduction will help motivate you.`;
              } else if(score < -0.5) {
                message = `@${req.body.user_name}... Why so glum? This will be noted in your performance review!`;
              } else {
                message = "hmmmmm...... i don\'t know what to say.";
              }
            }

            rsp.status(200).send(`{"text":"${message}"}`);
          });
      }
      break;
    default:
      rsp.status(500).send('what are you trying to do?');
  }
};
