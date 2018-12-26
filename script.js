/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 */
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
var inventory_array = [];

/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
      addClickHandlersToElements ();
      loadData ();
}

function loadData () {
      var inventory_api_object = {
            url: "api/access.php",
            method: "POST",
            data: {
                  // api_key: "IluXv1RI8a",
                  // "force-failure":"request"
                  'action' : 'read'
            },
            dataType: "json",
            success: function (response) {
                  console.log(response);
                  // if(response.error.length > 0){
                  //       var error_message = response.error.join();
                  //       $('.modal_error_message').text(error_message);
                  //       $('#errorModal').modal('show');
                  // }
                  // else{
                        inventory_array = response.data;
                        console.log("this is the student array: ",inventory_array);
                        updateStudentList(inventory_array);
                        console.log(response);
                        return(response);
                  // }
            }
      };

      $.ajax(inventory_api_object);
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
      $("#addButton").on("click",handleAddClicked);
      $("#cancelButton").on("click",handleCancelClick);
      $("#getDataFromServerButton").on("click",handleGetDataClick);
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(inventoryObj){
      console.log("add was clicked");
      addInventory ();
      clearAddInventoryFormInputs ();
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */

function handleGetDataClick () {
      var student_api_object = {
            url: "http://s-apis.learningfuze.com/sgt/get",
            method: "POST",
            data: {api_key: "IluXv1RI8a"},
            dataType: "json",
            success: function (response) {
                  console.log(response);
            }
      };

      $.ajax(student_api_object);
}

function handleCancelClick(){
      console.log("cancel was clicked");
      clearAddInventoryFormInputs ();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addInventory(){
      var inventoryObj = {};
      inventoryObj.id = $("#id").val();
      inventoryObj.product_title = $("#title").val();
      inventoryObj.product_description = $("#description").val();
      inventoryObj.quantity = $("#quantity").val();
      inventoryObj.price = $("#price").val();
      console.log("===Inventory Object=== ", inventoryObj);
      inventory_array.push(inventoryObj);
      addStudentToDB (inventoryObj.id,inventoryObj.product_title,inventoryObj.product_description,inventoryObj.quantity,inventoryObj.price);

      updateStudentList (inventory_array);
      clearAddInventoryFormInputs ();
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddInventoryFormInputs(){
      $("#id").val("");
      $("#title").val("");
      $("#description").val("");
      $("#quantity").val("");
      $("#price").val("");
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(inventoryObject){
      console.log("this is the inventoryOBject: ", inventoryObject);
      var table_row = $("<tr>");
      var title_TD = $("<td>").text(inventoryObject.product_title);
      var description_TD = $("<td>").text(inventoryObject.product_description);
      var quantity_TD = $("<td>").text(inventoryObject.quantity);
      var price_TD = $("<td>").text(inventoryObject.price);
      var op_TD = $("<td>");
      
      var delete_button = $("<button>",{
            text: "delete",
            "class": "btn btn-danger",
            "data-toggle" : "modal",
            "data-target" : "#deleteModal",
            // on: {
            //       click: handleDeleteClick(table_row, inventoryObject)
            // }
      });

      $(".delete_button").click(() => handleDeleteClick(table_row, inventoryObject));

      op_TD.append(delete_button);

      var currentStudentRow = $(table_row).append(title_TD,description_TD, quantity_TD, price_TD,op_TD);
      $("tbody").append(table_row);     
}

function handleDeleteClick (table_row, inventoryObject){
      debugger;
      // var thisDeleteButton = $(this);
      // console.log("THIS IS DELETE BUTTON: ", thisDeleteButton);
      var thisRowIndex = $(table_row).closest("tr").index();
      var currentProduct = inventory_array[thisRowIndex];
      $(".delete_button").click(() => confirmDelete(currentProduct, table_row, thisRowIndex));
      // table_row.remove();
      // var index = inventory_array.indexOf(inventoryObject);
      // inventory_array.splice(index,1);
      // deleteFromDB (inventoryObject.id);
      // calculateGradeAverage (inventory_array);
}

function confirmDelete (product, row, index){
      debugger;
      inventory_array.splice(index,1);
      row.closest("tr").remove();
      deleteFromDB(product);
}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(inventory_array){
      $("tbody").empty();
      for(var i = 0; i < inventory_array.length; i++){
            renderStudentOnDom(inventory_array[i]);
      }
      calculateGradeAverage (inventory_array);
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(student_array){
      var totalGradeScore = 0;
      for(var index = 0; index < student_array.length; index++){
            var combinedGradeScore = parseFloat(student_array[index].grade);
            totalGradeScore += combinedGradeScore;
      }
      var average = totalGradeScore/student_array.length;
      if(isNaN(average)){
            average = 0;
            var fixedAverage = average.toFixed(0);
            renderGradeAverage (fixedAverage+"%");
            return fixedAverage;
      }
      else{
            var fixedAverage = average.toFixed(0);
            renderGradeAverage (fixedAverage+"%");
            return fixedAverage;
      }
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(average){
      $(".avgGrade").text(average);
}

function addStudentToDB (id,product_title,product_description,quantity,price){
      var student_api_object = {
            url: "api/access.php",
            method: "POST",
            data: {
                  // api_key: "IluXv1RI8a",
                  product_title: product_title,
                  product_description: product_description,
                  quantity: quantity,
                  price: price,
                  'action' : 'create'
                  // "force-failure": "server"
            },
            dataType: "json",
            success: function (response) {
                  console.log(response);
                  return(response);
            },
            error: function (response) {
                  console.log(response);
                  $('.modal_error_message').text(response.statusText);
                  $('#errorModal').modal('show');
            }
      };
      $.ajax(student_api_object);
}

function deleteFromDB (idIndex) {
      var inventory_api_object = {
            url: "api/access.php",
            method: "POST",
            data: {
                  // api_key: "IluXv1RI8a",
                  id: idIndex,
                  'action' : 'delete'
                  // "force-failure": "timeout"
            },
            dataType: "json",
            success: function (response) {
                  console.log(response);
                  return(response);
            },
            error: function (jqXHR,exception) {
                  console.log(jqXHR,exception);
                  var error_message = "";
                  if(exception === "timeout"){
                        error_message = "Time out error"
                  }
                  console.log(error_message);
                  // setTimeout(function(){ 
                  //       $('.modal_error_message').text("took too long to load response from database");
                  //       $('#errorModal').modal('show');}, 2000);
            }
      };
      // setTimeout(function(){ 
      //       $('.modal_error_message').text("took too long to load response from database");
      //       $('#errorModal').modal('show');}, 2000);
      $.ajax(inventory_api_object);
      return;
}