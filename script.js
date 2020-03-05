var selectedId;
function getSelectedId() {
    return selectedId;
}
function filterContacts(){
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("input");
    filter = input.value.toUpperCase();
    ul = document.getElementById("contacts-list");
    li = ul.getElementsByTagName('li');
    console.log("filter: " + filter);
    // Loop through all list items, and hide those who don't match the search query
    if(filter.length>0) {
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByClassName("nameLbl")[0];
            txtValue = a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
    else{
        for (i = 0; i < li.length; i++) {
            li[i].style.display = "";
        }
    }
}

function displayContact(id, contact) {
    console.log(contact);
    var contactRow = document.createElement("li");
    contactRow.setAttribute("class","row contact-row");
    contactRow.setAttribute("id","id"+id);
    contactRow.setAttribute("href","")

    var imageIcon = document.createElement("img");
    imageIcon.className = "image-icon";
    if(contact.gender==="female")
        imageIcon.setAttribute("src","female.png");
    else
        imageIcon.setAttribute("src","male.png");
    contactRow.appendChild(imageIcon);

    var name = document.createElement("div");
    name.className = "nameLbl";
    name.innerText = contact.name;
    contactRow.appendChild(name)

    //<a data-role="button" data-icon="plus"> Add </a>
    var callBtn = document.createElement("a");
    callBtn.setAttribute("class","call-btn");
    //callBtn.setAttribute("data-role","button");
    callBtn.setAttribute("href","tel:"+contact.phone);
    callBtn.setAttribute("data-icon","phone");
    contactRow.appendChild(callBtn);

    console.log(contactRow);
    document.getElementById("contacts-list").appendChild(contactRow);
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function start() {
    var image = document.createElement("img");
    image.setAttribute("src","male.png");
    //
    var persons = [new Contact("Martina","0122","123@def.com","female"),
        new Contact("Sally","0122","123@def.com","female"),
        new Contact("Zenda","0122","123@def.com","female")];
    localStorage.setItem("contacts",JSON.stringify(persons));

    var contactsList = JSON.parse(localStorage.getItem("contacts"));
    for(var i = 0; i<contactsList.length; i++){
        displayContact(i,contactsList[i]);
    }
    $("#contacts-list li").click(function() {
        selectedId = this.id;
        console.log("selectedid: "+selectedId);
        window.location.href = "#pageone";
        var contact = JSON.parse(localStorage.getItem("contacts"))[selectedId.substr(selectedId.indexOf("id")+2)];
        console.log(contact);

        $("#user-image").attr("src",imagesrc);
    });
    console.log(document.getElementById("contacts-list"));
}

function Contact(name, phone, email, gender) {
    //,photo
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.gender = gender;
    //this.photo = photo;
}

function validate() {
    var phoneNumber = document.getElementById('phone').value;
    //   var postalCode = document.getElementById('postal-code').value;
    var emailCode = document.getElementById('email').value;
    username = document.getElementById("name").value;
    var phoneRGEX = /^(01){1}\d{9}/;

    var emailRGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    var phoneResult = phoneRGEX.test(phoneNumber);

    var emailResult = emailRGEX.test(emailCode);
    if (username === "") {
        document.getElementById("error").innerHTML = "Please enter  valid Name";

    }
    // if (!username == "") {
    //   document.getElementById("error").innerHTML = "";

    // }

    if (phoneResult === false) {
        document.getElementById("error1").innerHTML = "Please enter valid number";
    }
    // if (phoneResult == true) {
    //   document.getElementById("error1").innerHTML = "";
    // }
    if (emailResult === false) {
        document.getElementById("error2").innerHTML = "Please enter valid email";
    }
        // if (emailResult == true) {
        //   document.getElementById("error2").innerHTML = "";
    // }
    else {
        window.location.href = '#pageone';

    }
}