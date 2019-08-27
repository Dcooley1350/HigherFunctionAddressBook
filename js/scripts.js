// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, addresses) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.adresses = addresses;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

//Business Logic for Adresses

function Adresses() {
  this.emailAddressess = [];
  this.physicalAddresses = [];
}

Adresses.prototype.addEmailAddress = function(emailAddress) {
  this.emailAddresses.push(emailAddress);
}

Adresses.prototype.addEmailAddress = function(phycsicalAddress) {
  this.physicalAddresses.push(physicalAddress);
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  $(".physical-address").html(contact.email);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

function addEmailInput(emailNum) {
  emailNum++;
  //use jQuery to insert new input field with id of "new-email-emailNum"
  var newHTML = "";
  //edit newHTML

  newHTML += '<div class="form-group"> <label for="new-email-' + emailNum + '">Additional Email</label><input type="text"  class="form-control" id="new-email-' + emailNum + '"></div>';
  console.log(newHTML);

  var target = "";
  target = 'new-email-';
  target += (emailNum - 1);
  target += ''
  console.log(target);
  $(`#${target}`).after(newHTML);

  //insert



 return emailNum;
}
function addAddressInput(addressNum) {
  addressNum++;


  return addressNum;
}


$(document).ready(function() {
  var emailNum = 1;
  var addressNum = 1;
  attachContactListeners();

  // $("div").on("click","add-email-button",function () {
  //   addEmailInput(emailNum)
  // });
  $("#add-email-button").click(addEmailInput(addressNum));

  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    //get email addresses and store in arrays using emailNum and addressNum
      //use for loop and # of input fields

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-1").val("");
    $("input#new-physical-address").val("");
    //remove additional address boxes

    //create addresses object

    //push addresses from arrays to adresses object

    //change to construct with addresses object
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber,inputtedEmail,inputtedPhysicalAddress);

    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
