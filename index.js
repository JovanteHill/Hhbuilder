/* Set Variables & Create Elements */
var form = document.getElementsByTagName("FORM")[0]; //Form
var memberList = document.getElementsByTagName("ol")[0]; //Ordered List
var memberAge = document.getElementsByName("age")[0]; //Member Age
var memberRel = document.getElementsByName("rel")[0]; //Member Relationship Status
var memberSmoke = document.getElementsByName("smoker")[0]; //Member Smoke Status
var addButton = document.getElementsByTagName("button")[0]; //Add Button
var submitButton = document.getElementsByTagName("button")[1]; //Submit Button
var showJSON = document.getElementsByTagName("pre")[0]; //Debug Element
var house = [];

//Add New Member to Household
addButton.addEventListener("click", function(){

    //User Input Values
    age = memberAge.value;
    rel = memberRel.value;
    smoke = memberSmoke.checked;
    
    //Validate user Info
    if(validation()){
        newListItem();
    } else {
        console.log("Error: Check validation!");
    }
    event.preventDefault();
});

//Submit Form
submitButton.addEventListener("click", submitHouse);

//Validation Script
function validation() {
    if (age === "" || age === "0") {
        alert("Please enter in your age");
        return false;
    } else if (rel === "") {
        alert("Your Relationship status is required");
        return false;
    } else if (smoke === true) {
        smoke = "yes";
        return true;
    } else {
        smoke = "no";
        return true;
    }   
}

//New List Item Script
function newListItem() {
    console.log("Adding Member to List...");
    var person = {Age: memberAge.value ,Relationship: memberRel.value ,Smoker: smoke};//Object to be stored in Array
    house.push(person);//Push Object to Array

    var text = document.createTextNode("Age: " + person.Age + " Relationship: " + person.Relationship + " Smoker: " + person.Smoker);//String to be displayed in HTML
    var listItem = document.createElement("LI");//Create child node "li" for memberList("ol")
    var deleteButton = document.createElement("button");//Create Delete Button
    deleteButton.textContent = "Remove Member";//Text for delete button

    listItem.appendChild(text);//Append created string to "li"
    listItem.appendChild(deleteButton);//Append delete button to end of string
    memberList.appendChild(listItem);//Append both string and delete button to "ol"

    form.reset();//Clear form fields after each input
    console.log("Member Added Successfully!");

    //Delete Member from Household
    deleteButton.addEventListener("click", function(){
        memberList.removeChild(listItem);//Remove "li" from "ol" (will no loger display in HTML)
        house.splice(house.indexOf(person),1);//Remove object from array
        console.log("Member deleted");
    });
}

//Serialize House JSON
function submitHouse() {
    var myJSON = JSON.stringify(house);//Convert object array (keys & values) to strings
    showJSON.innerHTML = myJSON;//Display object strings in HTML
    showJSON.style.display = "inherit";//Set the hidden element to be seen
    event.preventDefault();
}
