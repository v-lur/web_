$(function () {
  // 权限认证
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDE1NDMsInVzZXJuYW1lIjoicXdlMiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiIiLCJlbWFpbCI6IiIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjM1NDgyOTc3LCJleHAiOjE2MzU1MTg5Nzd9.j0c5yDxP5QBf0XyIW4MzIhKEzfsKl5tCGxYZhmP8AIA


  $('#link_reg').on('click', function () {

    $('.login-box').hide()
    $('.reg-box').show()
  })

  $('#link_login').on('click', function () {
    console.log(1);
    $('.login-box').show()
    $('.reg-box').hide()
  })

  //从layui中获取form对象
  var form = layui.form
  var layer = layui.layer
  //自定义校验规则
  form.verify({
    //自定义一个PWD的校验规则
    'pwd': [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    //校验两次密码是否一致
    repwd: function (value) {
      //通过形参拿到的是确认密码框的内容
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })

  //发起登录请求(注册)
  $("#form_reg").on("submit", function (e) {
    //阻止默认的提交请求
    e.preventDefault()
    var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        // return console.log(res.message);
        return layer.msg(res.message)
      }
      else {
        layer.msg("注册成功！ 去登录")
        $('#link_login').click()

      }
    })
  });

//监听登录界面
$('#form_login').submit(function(e){
  e.preventDefault()
  $.ajax({
    url:'/api/login',
    method:'POST',
    //快速拿表单内容
    data:$(this).serialize(),
    success:function(res){
      if(res.status!==0){
        return layer.msg('登录失败！')
      }
      else{
        layer.msg('登录成功！')
        // console.log(res.token);
           //将登录成功的token字符串，保存到本地lcoatstore
           localStorage.setItem('token',res.token)
        location.href='/后端/index.html'
     
      }
    }
  })
})
})