let info;
var username = window.location.href.split("?")[1].split("=")[1];
function studentLoad() {
    fetch("http://10.240.208.180:3000/departments")
    .then((response) => response.json())
    .then((json) => info = json);
}
window.onload = studentLoad;

function displayItems() {
    document.getElementById("items").innerHTML = '';
    if (document.getElementById("department").value == "art") {
        document.getElementById("items").innerHTML += `<option value="Canvas">canvas</option>`;
        document.getElementById("items").innerHTML += '<option value="paintSet">Paint Set</option>';
    } else if (document.getElementById("department").value == "music") {
        document.getElementById("items").innerHTML += `<option value="trombone">Trombone</option>`;
        document.getElementById("items").innerHTML += `<option value="trumpet">Trumpet</option>`;
    } else if (document.getElementById("department").value == "science") {
        document.getElementById("items").innerHTML += `<option value="textbookSci">Textbook</option>`;
        document.getElementById("items").innerHTML += `<option value="goggles">Goggles</option>`;
    } else if (document.getElementById("department").value == "math") {
        document.getElementById("items").innerHTML += `<option value="textbookMath">Textbook</option>`;
        document.getElementById("items").innerHTML += `<option value="calculator">Calculator</option>`;
    } else if (document.getElementById("department").value == "technology") {
        document.getElementById("items").innerHTML += `<option value="dollies">Dollies</option>`;
        document.getElementById("items").innerHTML += `<option value="tripod">Tripod</option>`;
    }
    
    var date = new Date();
    date.setDate(date.getDate() + 5);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    document.getElementById("dueDate").innerHTML = 'Due by: ' + day + '/' + month + '/' + year;
}

function getItemDetails() {
    console.log(info[document.getElementById("department").value].inventory.find((e) => e.item == document.getElementById("items").value).obj.find((e) => e.status === "IN STOCK").trackingNum);
    console.log(username);
    console.log(Math.floor(new Date().getTime()/1000.0) + (5*86400));
    console.log(document.getElementById("department").value);
    console.log(document.getElementById("items").value);
    fetch("http://10.240.208.180:3000/student/signout", {
        method: "POST",
        body: JSON.stringify({
            trackingNum: info[document.getElementById("department").value].inventory.find((e) => e.item == document.getElementById("items").value).obj.find((e) => e.status === "IN STOCK").trackingNum,
            student: username,
            dueDate: Math.floor(new Date().getTime()/1000.0) + (5*86400),
            dept: document.getElementById("department").value,
            item: document.getElementById("items").value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        })
        .then((response) => response.json())
        .then((json) => {
            document.getElementById("test").innerHTML = json.status;
        }); 
}