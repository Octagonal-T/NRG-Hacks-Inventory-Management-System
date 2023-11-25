function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (document.getElementById("teacherOrStudent").value == "teacher") {
        var teacher = true;
    } else {
        var teacher = false;
    }
    var password = document.getElementById("password").value;
    // var teacher = false;
    // let username = 348688615;
    // let password = "abc123";
    
    if (password.length <= 8) {
        fetch("http://10.240.208.180:3000/login", {
        method: "POST",
        body: JSON.stringify({
            id: username,
            password: password,
            type: teacher
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        })
        .then((response) => response.json())
        .then((json) => {
            if (json.status == "accepted") {
                window.location.replace("student.html?username=" + username);
            }
            document.getElementById("test").innerHTML = json.status;
        }); 
    }
}
