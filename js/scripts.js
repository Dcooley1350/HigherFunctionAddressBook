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
function Contact(firstName, lastName, phoneNumber, addresses) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.adresses = addresses;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

//Business Logic for Adresses

function Adresses(emailAdresses, physicalAddress) {
  this.emailAddressess = emailAdresses;
  this.physicalAddresses = physicalAddress;
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
  console.log(emailNum);
  var newHTML = '<div class="form-group extra-fields"> <label for="new-email-' + emailNum + '">Additional Email</label><input type="text"  class="form-control" id="new-email-' + emailNum + '"></div>';
  console.log(newHTML);
  var target = 'new-email-' + (emailNum - 1);
  console.log(target);
  $(`#${target}`).after(newHTML);
}

function addAddressInput(addressNum) {
  console.log(addressNum);
  var newHTML = '<div class="form-group extra-fields"> <label for="new-address-' + addressNum + '">Additional Address</label><input type="text"  class="form-control" id="new-address-' + addressNum + '"></div>';
  console.log(newHTML);
  var target = 'new-address-' + (addressNum - 1);
  console.log(target);
  $(`#${target}`).after(newHTML);
}
function captureEmails(emailNum) {
  var emails = [];
  for (var i = 1; i <= emailNum; i++) {
    var target = '#new-email-' + i;
    emails.push($(target).val());
  }
  return emails;
}

function capturePhysicalAddresses(addressNum) {
  var physicalAddresses = [];
  for (var i = 1; i <= addressNum; i++) {
    var target = '#new-address-' + i;
    physicalAddresses.push($(target).val());
  }
  return physicalAddresses;
}






$(document).ready(function() {
  var emailNum = 1;
  var addressNum = 1;
  attachContactListeners();

$("#add-email-button").click(function() {
  emailNum++;
  addEmailInput(emailNum);
  });
  $("#add-address-button").click(function() {
    addressNum++;
    addAddressInput(addressNum);
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var emails = captureEmails(emailNum);
    var physicalAddresses = capturePhysicalAddresses(addressNum);
    console.log(emails);
    console.log(physicalAddresses);
    //get email addresses and store in arrays using emailNum and addressNum
      //use for loop and # of input fields

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-1").val("");
    $("input#new-address-1").val("");
    //remove additional address boxes
    $(".extra-fields").detach()
    //create addresses object
    var newAddress = new Adresses(emails, physicalAddresses);

    //change to construct with addresses object
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber,newAddress);

    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    emailNum = 1;
    addressNum = 1;
  })
})
