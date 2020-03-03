var express = require('express');
var signin = require('../../public/model/DataAccessObject/signin.js');
var router = express.Router();

const title = 'WatchBuy';
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('./signin/signin', { title: title });
});

router.post('/check', function (req, res) {
  console.log(req.body);
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const role = req.body.role;

  if (role == 'user') {
    signin.userSignInCheck(name, password, email).then(function (data) {
      if (data.length == 0) {
        res.json({ status: 'You have not been signed up as a user yet.' });
      } else {
        var status = 'Welcome Back! ' + name;
        //做完登入確認要轉跳
        signin.Update_login_access_token(role,email).then((Updated_login_access_token)=>{
          console.log('Updated_login_access_token == ',Updated_login_access_token);
          res.cookie('role', role);
          res.cookie('token', Updated_login_access_token);
          res.json({ status: 'ok' });
        }).catch(function (err) {
          res.json({ status: err });
        });

      }
    }).catch(function (err) {
      res.json({ status: err });
    });

  } else if (role == 'host') {
    signin.hostSignInCheck(name, password, email).then(function (data) {
      if (data.length == 0) {
        res.json({ status: 'You have not been signed up as a host yet.' });
      } else {
        var status = 'Welcome Back! ' + name;
        //做完登入確認要轉跳
        signin.Update_login_access_token(role,email).then((Updated_login_access_token)=>{
        console.log('Updated_login_access_token == ',Updated_login_access_token);
        res.cookie('role',role);
        res.cookie('token',Updated_login_access_token);
        res.json({ status: 'ok' });
        }).catch(function (err) {
          res.json({ status: err });
        });
      }
    })

  } else {
    res.json({status:'Error : please check sign in info first.'});
  }

});


router.post('/logout', function (req, res, next) {
  res.clearCookie('role');
  res.clearCookie('token');
  res.json({msg:'already logout'});
});


module.exports = router;
