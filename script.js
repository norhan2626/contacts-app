var selectedId;
var isNew = true;

function getSelectedId() {
    return selectedId;
}

/*
function filterContacts() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("input");
    filter = input.value.toUpperCase();
    ul = document.getElementById("contacts-list");
    li = ul.getElementsByTagName('li');
    console.log("filter: " + filter);
    // Loop through all list items, and hide those who don't match the search query
    if (filter.length > 0) {
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByClassName("nameLbl")[0];
            txtValue = a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    } else {
        for (i = 0; i < li.length; i++) {
            li[i].style.display = "";
        }
    }
}
*/

function sorter(a, b) {
    if (a.name > b.name) {
        return 1;
    }
    if (b.name > a.name) {
        return -1;
    }
    return 0;
}

function displayContact(id, contact) {
    console.log(contact);
    var contactRow = document.createElement("li");
    contactRow.setAttribute("class", "row contact-row");
    contactRow.setAttribute("id", "id" + id);

    var a = document.createElement("a");
    contactRow.appendChild(a);

    var imageIcon = document.createElement("img");
    imageIcon.setAttribute("class","image-icon");
    if (contact.gender === "female")
        imageIcon.setAttribute("src", "female.png");
    else
        imageIcon.setAttribute("src", "male.png");
    a.appendChild(imageIcon);

    var name = document.createElement("h2");
    name.setAttribute("class","nameLbl");
    name.innerText = contact.name;
    a.appendChild(name)

    //<a data-role="button" data-icon="plus"> Add </a>
    var callBtn = document.createElement("a");
    callBtn.setAttribute("class", "ui-btn ui-btn-right");
    callBtn.setAttribute("data-role","button");
    callBtn.setAttribute("href", "tel:" + contact.phone);
    callBtn.setAttribute("data-icon", "phone");
    callBtn.setAttribute("data-inline", "true");
    a.appendChild(callBtn);

    console.log(contactRow);
    document.getElementById("contacts-list").appendChild(contactRow);
}

/*function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}*/

function start_app() {
    document.getElementById("contacts-list").innerHTML = "";

    var contactsList = JSON.parse(localStorage.getItem("contacts"));
    console.log(contactsList);
    if(contactsList === null || contactsList === undefined){
        localStorage.setItem("contacts",JSON.stringify([]));
    }
    else {
        for (var i = 0; i < contactsList.length; i++) {
            if(contactsList[i]!=null)
                displayContact(i, contactsList[i]);
        }
        $(".nameLbl").click(function () {
            selectedId = this.parentElement.parentElement.id.substr(this.parentElement.parentElement.id.indexOf("id") + 2);
            console.log("selectedid: " + selectedId);
            window.location.href = "#contactInfo";

            var contact = JSON.parse(localStorage.getItem("contacts"))[selectedId];
            console.log(contact);
            userName = document.getElementById("userNameHeader");
            userName.innerHTML = contact.name;
            tel = document.getElementById("tel-anchor");
            tel.href = "tel:+" + contact.phone;
            console.log("gender" + contact.gender);


            if (contact.gender == "female") {
                document.getElementById("user-image").src = "female.png";

            } else {
                document.getElementById("user-image").src = "male.png";
            }
            //document.getElementById("editHeader").innerHTML = "Edit Contact";

        });
    }

    console.log(document.getElementById("contacts-list"));

    /*
   editUser = document.getElementById("editUser");
    editUser.href = "#newContact";
*/
    /*$(".delete").click(function () {
        $("#node").remove();
    });
    $(document).ready(function () {
        $("img").click(function () {
            $(this).attr("src", "image.png");
        });
    });*/
}

function deleteContact() {
    console.log("selectedid: " + selectedId);
    var contacts = JSON.parse(localStorage.getItem("contacts"));
    delete contacts[selectedId];
    console.log(contacts);
    localStorage.setItem("contacts",JSON.stringify(contacts));
    window.location.href = "#contact-list";
    start_app();
}

function edit() {
    isNew = false;
    console.log("selectedid: " + selectedId);
    window.location.href = "#newContact";
    var contacts = JSON.parse(localStorage.getItem("contacts"));
    var contact = contacts[selectedId];

    console.log(contact + "here in edit");
    var newName = document.getElementById("newName").value = contact.name;
    var newEmail = document.getElementById("newEmail").value = contact.email;
    var newPhone = document.getElementById("newPhone").value = contact.phone;
    var newGender=document.getElementById("newGender").value = contact.gender;

    $("#editHeader").html("Edit Contact");
}

function Contact(name, phone, email, gender) {
    //,photo
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.gender = gender;
    //this.photo = photo;
}

function validate(userName, phoneNumber, emailCode) {

    var phoneRGEX = /^(01)(0|1|2|5)\d{8}/;
    var emailRGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    var userNameResult = userName !== "";
    var phoneResult = phoneRGEX.test(phoneNumber);
    var emailResult = emailRGEX.test(emailCode);

    if (userNameResult === false) {
        document.getElementById("error").innerHTML = "Please enter valid name";
    } else{
        document.getElementById("error").innerHTML = "";
    }

    if (phoneResult === false) {
        document.getElementById("error1").innerHTML = "Please enter valid number";
    } else{
        document.getElementById("error1").innerHTML = "";
    }

    if (emailResult === false) {
        document.getElementById("error2").innerHTML = "Please enter valid email";
    } else{
        document.getElementById("error2").innerHTML = "";
    }

    if (emailResult && phoneResult && userNameResult) {
        return true;
    }
    else{
        return false;
    }
}

function save(){
    var userName = document.getElementById("newName").value;
    var phoneNumber = document.getElementById('newPhone').value;
    var emailCode = document.getElementById('newEmail').value;
    var gender = document.getElementById("newGender").value;

    if(validate(userName, phoneNumber, emailCode)){
        var contact = new Contact(userName, phoneNumber, emailCode, gender);
        console.log(contact);
        var contactsArray = JSON.parse(localStorage.getItem("contacts"));
        var index = isNew? contactsArray.length: selectedId;
        isNew = true;
        delete contactsArray[index];
        contactsArray[index] = contact;
        contactsArray.sort(sorter);
        console.log(contactsArray);
        localStorage.setItem("contacts",JSON.stringify(contactsArray));
        window.location.href = "#contact-list";
        $("#editHeader").html("New Contact");

        //window.history.back();
        start_app();
    }
}

