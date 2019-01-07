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
                        updateInventoryList(inventory_array);
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
      $("tbody").on("click", "td .btn-danger", handleDeleteClick);
      $("tbody").on("click", "td .btn-warning", handleUpdateClick);
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
      addInventory ();
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
      inventoryObj.price = `$` + inventoryObj.price;

      validateAddProduct (inventoryObj);
}

function validateAddProduct (addedProduct) {
      var validationCheck = {
            product_title: true,
            product_description: true,
            quantity: true,
            price: true
          };
      
      var validProductTitle = /^[a-zA-Z0-9 _]+$/;
      var validProductDescription = /^[^<>]+$/;
      var validQuantity = /^[1-9]\d*$/;
      var validPrice = /^\d+(\.\d{1,2})?$/;

      if(addedProduct.product_title.length > 30){
            $(".product-addition .invalid-product_title").text("Maximum characters for product title is 30.").css("display", "block");
            validationCheck.product_title = false;
      } else if (validProductTitle.test(addedProduct.product_title)){
            $(".product-addition .invalid-product_title").css("display", "none")
      } else {
            $(".product-addition .invalid-product_title").text("Please enter a valid product title").css("display", "block");
            validationCheck.product_title = false;
      }

      if(addedProduct.product_description.length > 100){
            $(".product-addition .invalid-product_description").text("Maximum characters for product description is 100.").css("display", "block");
            validationCheck.product_description = false;
      } else if (validProductDescription.test(addedProduct.product_description)){
            $(".product-addition .invalid-product_description").css("display", "none")
      } else {
            $(".product-addition .invalid-product_description").text("Please enter a valid product description").css("display", "block");
            validationCheck.product_description = false;
      }

      if(addedProduct.quantity.length > 9){
            $(".product-addition .invalid-quantity").text("Maximum number of digits for quantity is 9.").css("display", "block");
            validationCheck.quantity = false;
      } else if (validQuantity.test(addedProduct.quantity)){
            $(".product-addition .invalid-quantity").css("display", "none")
      } else {
            $(".product-addition .invalid-quantity").text("Please enter a valid quantity i.e. 44").css("display", "block");
            validationCheck.quantity = false;
      }

      if(addedProduct.price.length > 12){
            $(".product-addition .invalid-price").text("Maximum number of digits for price is 12.").css("display", "block");
            validationCheck.price = false;
      } else if (validPrice.test(addedProduct.price)){
            $(".product-addition .invalid-price").css("display", "none")
      } else {
            $(".product-addition .invalid-price").text("Please enter a valid price i.e. $16.99").css("display", "block");
            validationCheck.price = false;
      }
          
      if(validationCheck.product_title && validationCheck.product_description && validationCheck.quantity && validationCheck.price) {
            inventory_array[index].product_title = addedProduct.product_title;
            inventory_array[index].product_description = addedProduct.product_description;
            inventory_array[index].quantity = addedProduct.quantity;
            inventory_array[index].price = addedProduct.price;

            inventory_array.push(inventoryObj);
            clearAddInventoryFormInputs ();
            updateInventoryList (inventory_array);
            addProductToDB (inventory_array);
      }
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
function renderProductOnDom(inventoryObject){
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
            "data-target" : "#deleteModal"
      });

      var update_button = $("<button>", {
            text: 'update',
            'class': 'btn btn-warning'
      });

      $(delete_button).click(() => handleDeleteClick(table_row, inventoryObject));

      op_TD.append(delete_button, update_button);

      var currentProductRow = $(table_row).append(title_TD,description_TD, quantity_TD, price_TD,op_TD);
      $("tbody").append(table_row);     
}

function handleDeleteClick (table_row, inventoryObject){
      var thisRowIndex = $(table_row).closest("tr").index();
      var currentProduct = inventory_array[thisRowIndex];
      var index = inventory_array.indexOf(inventoryObject);

      $("#deleteModal .modal-title").text(`Edit Product: ${currentProduct.product_title}`);
      $("#deleteModal .product-title").val(currentProduct.product_title);
      $("#deleteModal .product-title").val(currentProduct.product_title);
      $("#deleteModal .product-description").val(currentProduct.product_description);
      $("#deleteModal .quantity").val(currentProduct.quantity);
      $("#deleteModal .price").val(currentProduct.price);

      $(".delete_button").click(() => confirmDelete(currentProduct, table_row, thisRowIndex));
}

function confirmDelete (product, row, index){
      inventory_array.splice(index,1);
      row.remove();
      deleteFromDB(product.id);
      $('.delete_button').off();
}

function handleUpdateClick() {
      var currentUpdateButton = $(this);
      var thisRowIndex = currentUpdateButton.closest("tr").index();
      var currentProduct = inventory_array[thisRowIndex];
    
      $("#updateModal .product-title").val(currentProduct.product_title);
      $("#updateModal .product-description").val(currentProduct.product_description);
      $("#updateModal .quantity").val(currentProduct.quantity);
      $("#updateModal .price").val(currentProduct.price);
      
      $(".update_button").off();
      $(".update_button").click(() => confirmUpdate(thisRowIndex));
      $("#updateModal .invalid-input").hide();
      $("#updateModal").modal("show");
      
}

function confirmUpdate (index){
      
      var updatedProduct = {};
      updatedProduct.product_title = $("#updateModal .product-title").val();
      updatedProduct.product_description = $("#updateModal .product-description").val();
      updatedProduct.quantity = $("#updateModal .quantity").val();
      updatedProduct.price =$("#updateModal .price").val();
      validateUpdateProduct(updatedProduct, index);
}

function validateUpdateProduct (updatedProduct, index) {
      var validationCheck = {
            product_title: true,
            product_description: true,
            quantity: true,
            price: true
          };
      
      var validProductTitle = /^[a-zA-Z0-9 _]+$/;
      var validProductDescription = /^[^<>]+$/;
      var validQuantity = /^[1-9]\d*$/;
      var validPrice = /^\d+(\.\d{1,2})?$/;

      if(updatedProduct.product_title.length > 30){
            $("#updateModal .invalid-product_title").text("Maximum characters for product title is 30.").css("display", "block");
            validationCheck.product_title = false;
      } else if (validProductTitle.test(updatedProduct.product_title)){
            $("#updateModal .invalid-product_title").css("display", "none")
      } else {
            $("#updateModal .invalid-product_title").text("Please enter a valid product title").css("display", "block");
            validationCheck.product_title = false;
      }

      if(updatedProduct.product_description.length > 100){
            $("#updateModal .invalid-product_description").text("Maximum characters for product description is 100.").css("display", "block");
            validationCheck.product_description = false;
      } else if (validProductDescription.test(updatedProduct.product_description)){
            $("#updateModal .invalid-product_description").css("display", "none")
      } else {
            $("#updateModal .invalid-product_description").text("Please enter a valid product description").css("display", "block");
            validationCheck.product_description = false;
      }

      if(updatedProduct.quantity.length > 9){
            $("#updateModal .invalid-quantity").text("Maximum number of digits for quantity is 9.").css("display", "block");
            validationCheck.quantity = false;
      } else if (validQuantity.test(updatedProduct.quantity)){
            $("#updateModal .invalid-quantity").css("display", "none")
      } else {
            $("#updateModal .invalid-quantity").text("Please enter a valid quantity").css("display", "block");
            validationCheck.quantity = false;
      }

      if(updatedProduct.price.length > 12){
            $("#updateModal .invalid-price").text("Maximum number of digits for price is 12.").css("display", "block");
            validationCheck.price = false;
      } else if (validPrice.test(updatedProduct.price)){
            $("#updateModal .invalid-price").css("display", "none")
      } else {
            $("#updateModal .invalid-price").text("Please enter a valid price").css("display", "block");
            validationCheck.price = false;
      }
          
      if(validationCheck.product_title && validationCheck.product_description && validationCheck.quantity && validationCheck.price) {
            inventory_array[index].product_title = updatedProduct.product_title;
            inventory_array[index].product_description = updatedProduct.product_description;
            inventory_array[index].quantity = updatedProduct.quantity;
            inventory_array[index].price = updatedProduct.price;
            updateProductToDB(inventory_array[index]);
            $("#updateModal").modal("hide");
      }
}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateInventoryList(inventory_array){
      $("tbody").empty();
      for(var i = 0; i < inventory_array.length; i++){
            renderProductOnDom(inventory_array[i]);
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

function addProductToDB (id,product_title,product_description,quantity,price){
      var inventory_api_object = {
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
      $.ajax(inventory_api_object);
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

function updateProductToDB(product) {
      var inventory_api_object = {
            url: "api/access.php",
            method: "POST",
            dataType: "json",
            data: {
              action: "update",
              product_title: product.product_title,
              product_description: product.product_description,
              quantity: product.quantity,
              price: product.price,
              id: product.id
            },
            success: function(response) {
              console.log(response);
              updateInventoryList(inventory_array);
              return(response);
            },
            error: function(response) {
                  console.log("error message: ",response);
            }
      };
      $.ajax(inventory_api_object);
    }