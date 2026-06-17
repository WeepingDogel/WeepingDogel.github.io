function SignIn(){
    var username = document.forms["signForm"]["username"].value;
    var password = document.forms["signForm"]["password"].value;
    if(username == "" | username == null){
        alert("用户名不得为空");
        return false;
    }else if(password == "" | password == null){
        alert("密码不得为空");
        return false;
    }
}