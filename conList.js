// open form modal& close 
let addNewBtn = document.querySelector(".addNew")
let closeFormBtn = document.querySelector(".addNewContact .close")
let formSection =document.querySelector(".form")
let contactform =document.querySelector(".addNewContact")

addNewBtn.addEventListener('click',()=>{
    formSection.classList.add("overlay");
    contactform.style.display= "block";
    
})


closeFormBtn.addEventListener('click',()=>{
    formSection.classList.remove("overlay");
    contactform.style.display= "none";
})

//Creat arr to restore data 
let contactList =[];
// select the inputs of the form 
let contactFormName = document.getElementById("contact_form_name")
let contactFormPhone = document.getElementById("contact_form_phone")
let contactFormEmail = document.getElementById("contact_form_email")
let contactFormAddress = document.getElementById("contact_form_address")


//get last id
let lastContactId = contactList.length;

//creat fun to push new contact into arr
let newContact =()=>{
    contactList.push({
        contactId: lastContactId +=1,
        contactName : contactFormName.value,
        contactPhone :contactFormPhone.value,
        contactEmail :contactFormEmail.value,
        contactAddress :contactFormAddress.value,
       
    });
  
}

//creat render function  to shoew data in the table 

let contactTableTbody=document.getElementById("tbody")

let renderContacts =() =>{
    
    let tr = '';
    contactList.forEach(contact =>{
        tr += `
           <tr data-id = ${contact.contactId}>
              <td>${contact.contactId}</td>
              <td>${contact.contactName}</td>
              <td>${contact.contactPhone}</td>
              <td>${contact.contactEmail}</td>
              <td>${contact.contactAddress}</td>
                <td><i class="fa fa-edit"></i></td>  
                <td><i class="fa fa-trash"></i></td>  
            </tr>
        `
    });
    contactTableTbody.innerHTML = tr ;

}
//initial start of webpage
renderContacts()

//reset fun value 
let resetFormContact = ()=>{
    contactFormName.value=""
    contactFormPhone.value=""
    contactFormEmail.value=""
    contactFormAddress.value=""
};


// handle save btn listener 
let saveBtn=document.querySelector(".save-btn")

let saveBtnHandler = () => {
    newContact()
    renderContacts()
    resetFormContact()
    formSection.classList.remove("overlay");
    contactform.style.display= "none";
}

saveBtn.addEventListener('click', saveBtnHandler)


// handle EDIT AND DEL

contactTableTbody.addEventListener('click', e =>{
    if (e.target.classList.contains("green")){

        let tr =e.target.parentElement;
        let id= tr.dataset.id-1;

        contactFormName.value = contactList[id].contactName
        contactFormPhone.value = contactList[id].contactPhone;
        contactFormEmail.value = contactList[id].contactEmail;
        contactFormAddress.value = contactList[id].contactAddress;



        formSection.classList.add("overlay");
        contactform.style.display="block";

    };

    if (e.target.classList.contains("red")){
        // console.log("red")

    }
})

 
contactTableTbody.addEventListener('click', e => {
  if (e.target.classList.contains('fa-trash')) {
    const tr = e.target.parentElement.parentElement;
    const id = parseInt(tr.dataset.id) - 1;

    // Confirm deletion (optional)
    if (confirm('Are you sure you want to delete this contact?')) {
      const contactIndex = contactList.findIndex(contact => contact.contactId === id);
      if (contactIndex !== -1) {
        contactList.splice(contactIndex, 1);
        renderContacts();
      }
    }
  }
});

  