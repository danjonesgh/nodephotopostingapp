
var aws = require('aws-sdk');
var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var post = require('./post');
var person = require('./person');

/* GET home page. */
router.get('/', function(req, res) {
	post.getPosts(req, res, function(result) {
    console.log(result);
    res.render('index', {'posts': result});
  });
  //res.send('test');
  //res.render('index');
});


router.get('/sign_s3', function(req, res){
  aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
  var s3 = new aws.S3();
  var s3_params = {
    Bucket: S3_BUCKET,
    Key: req.query.s3_object_name,
    Expires: 60,
    ContentType: req.query.s3_object_type,
    ACL: 'public-read'
  };
  
  s3.getSignedUrl('putObject', s3_params, function(err, data){
      if(err){
      	console.log('errrrsrs');
          console.log(err);
      }
      else{
          var return_data = {
              signed_request: data,
              url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.s3_object_name
          };
          res.write(JSON.stringify(return_data));
          res.end();
      }
  });
});

router.get('/addpost', function(req, res) {
	post.getform(req, res);
});

router.post('/addpost', multipartMiddleware, function(req, res) {
	post.savepost(req, res);
});





router.get('/addperson', function(req, res) {
	person.getform(req, res);
});

router.post('/addperson', multipartMiddleware, function(req, res) {
	person.saveperson(req, res);
});




module.exports = router;
