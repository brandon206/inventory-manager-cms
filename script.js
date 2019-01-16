
$(document).ready(initializeApp);

var inventory_array = [];

function initializeApp(){
      addClickHandlersToElements ();
      loadData ();
}

function loadData () {
      var inventory_api_object = {
            url: "api/access.php",
            method: "POST",
            data: {
                  'action' : 'read'
            },
            dataType: "json",
            success: function (response) {
                  inventory_array = response.data;
                  updateInventoryList(inventory_array);
                  return(response);
            }
      };

      $.ajax(inventory_api_object);
}

function addClickHandlersToElements(){
      $("#addButton").on("click",handleAddClicked);
      $("#cancelButton").on("click",handleCancelClick);
      $("tbody").on("click", "td .btn-warning", handleUpdateClick);
}


function handleAddClicked(){
      addInventory ();
}

function handleCancelClick(){
      $(".product-addition .invalid-product_title").css("display", "none");
      $(".product-addition .invalid-product_description").css("display", "none");
      $(".product-addition .invalid-quantity").css("display", "none");
      $(".product-addition .invalid-price").css("display", "none");
      clearAddInventoryFormInputs ();
}

function addInventory(){
      var inventoryObj = {};
      inventoryObj.id = $("#id").val();
      inventoryObj.product_title = $("#title").val();
      inventoryObj.product_description = $("#description").val();
      inventoryObj.quantity = $("#quantity").val();
      inventoryObj.price = $("#price").val();

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
      var validPrice = /^(\$)?\d+(\.\d{1,2})?$/;

      
      if(addedProduct.price.indexOf("$") > -1){
            addedProduct.price = addedProduct.price.slice(1,addedProduct.price.length);
      }

      if(addedProduct.price.indexOf(".") === -1){
            addedProduct.price = `${addedProduct.price}.00`;
      }

      if(addedProduct.product_title.length > 30){
            $(".product-addition .invalid-product_title").text("Maximum characters for product title is 30.").css("display", "block");
            validationCheck.product_title = false;
      } else if (validProductTitle.test(addedProduct.product_title)){
            $(".product-addition .invalid-product_title").css("display", "none")
      } else {
            $(".product-addition .invalid-product_title").text("Please enter a valid product title that consists of only letters or numbers").css("display", "block");
            validationCheck.product_title = false;
      }

      if(addedProduct.product_description.length > 300){
            $(".product-addition .invalid-product_description").text("Maximum characters for product description is 300.").css("display", "block");
            validationCheck.product_description = false;
      } else if (validProductDescription.test(addedProduct.product_description)){
            $(".product-addition .invalid-product_description").css("display", "none")
      } else {
            $(".product-addition .invalid-product_description").text("Please enter a valid product description that consists of only letters or numbers").css("display", "block");
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
            inventory_array.push(addedProduct);
            clearAddInventoryFormInputs ();
            addProductToDB (addedProduct);
            updateInventoryList (inventory_array);
      }
}

function clearAddInventoryFormInputs(){
      $("#id").val("");
      $("#title").val("");
      $("#description").val("");
      $("#quantity").val("");
      $("#price").val("");
}

function renderProductOnDom(inventoryObject){
      var table_row = $("<tr>");
      var title_TD = $("<td>").addClass("table_row_items").text(inventoryObject.product_title);
      var description_TD = $("<td>").addClass("table_row_items").text(inventoryObject.product_description);
      var quantity_TD = $("<td>").addClass("table_row_items").text(inventoryObject.quantity);
      var price_TD = $("<td>").text(`$${inventoryObject.price}`);
      var edit_TD = $("<td>").addClass("center_button").css({'word-break':'break-all', 'word-wrap':'break-word'});

      var deleteButton = $("<button>", {
            class: "btn btn-danger",
            "data-toggle" : "modal",
            "data-target" : "#deleteModal"
      }).css({"margin-bottom": "10px", "margin-right":"10px"});
      
      var deleteIcon = $("<span>", {
            class: "glyphicon glyphicon-trash visible-xs"
      });
      
      var deleteText = $("<span>", {
            text: "Delete",
            class: "visible-sm visible-md visible-lg"
      });
      
      var updateButton = $("<button>", {
            class: "btn btn-warning",
      }).css({"margin-bottom": "10px", "margin-right":"10px"});
      
      var updateIcon = $("<span>", {
            class: "glyphicon glyphicon-pencil visible-xs"
      });
      
      var updateText = $("<span>", {
            text: "Update",
            class: "visible-sm visible-md visible-lg"
      });
        
      deleteButton.append(deleteIcon, deleteText);
      updateButton.append(updateIcon, updateText);

      $(deleteButton).click(() => handleDeleteClick(table_row, inventoryObject));

      edit_TD.append(deleteButton, updateButton);

      var currentProductRow = $(table_row).append(title_TD,description_TD, quantity_TD, price_TD, edit_TD);
      $("tbody").append(table_row);     
}

function handleDeleteClick (table_row, inventoryObject){
      var thisRowIndex = $(table_row).closest("tr").index();
      var currentProduct = inventory_array[thisRowIndex];

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

      if(updatedProduct.price.indexOf("$") > -1){
            updatedProduct.price = updatedProduct.price.slice(1,updatedProduct.price.length);
      }

      if(updatedProduct.price.indexOf(".") === -1){
            updatedProduct.price = `${updatedProduct.price}.00`;
      }

      if(updatedProduct.product_title.length > 30){
            $("#updateModal .invalid-product_title").text("Maximum characters for product title is 30.").css("display", "block");
            validationCheck.product_title = false;
      } else if (validProductTitle.test(updatedProduct.product_title)){
            $("#updateModal .invalid-product_title").css("display", "none")
      } else {
            $("#updateModal .invalid-product_title").text("Please enter a valid product title that consists of only letters or numbers").css("display", "block");
            validationCheck.product_title = false;
      }

      if(updatedProduct.product_description.length > 300){
            $("#updateModal .invalid-product_description").text("Maximum characters for product description is 300.").css("display", "block");
            validationCheck.product_description = false;
      } else if (validProductDescription.test(updatedProduct.product_description)){
            $("#updateModal .invalid-product_description").css("display", "none")
      } else {
            $("#updateModal .invalid-product_description").text("Please enter a valid product description that consists of only letters or numbers or special characters").css("display", "block");
            validationCheck.product_description = false;
      }

      if(updatedProduct.quantity.length > 9){
            $("#updateModal .invalid-quantity").text("Maximum number of digits for quantity is 9.").css("display", "block");
            validationCheck.quantity = false;
      } else if (validQuantity.test(updatedProduct.quantity)){
            $("#updateModal .invalid-quantity").css("display", "none")
      } else {
            $("#updateModal .invalid-quantity").text("Please enter a valid quantity number i.e. 44").css("display", "block");
            validationCheck.quantity = false;
      }

      if(updatedProduct.price.length > 12){
            $("#updateModal .invalid-price").text("Maximum number of digits for price is 12.").css("display", "block");
            validationCheck.price = false;
      } else if (validPrice.test(updatedProduct.price)){
            $("#updateModal .invalid-price").css("display", "none")
      } else {
            $("#updateModal .invalid-price").text("Please enter a valid price i.e. $16.99").css("display", "block");
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

function updateInventoryList(inventory_array){
      $("tbody").empty();
      for(var i = 0; i < inventory_array.length; i++){
            renderProductOnDom(inventory_array[i]);
      }
}

function addProductToDB (addedProduct){
      var inventory_api_object = {
            url: "api/access.php",
            method: "POST",
            data: {
                  product_title: addedProduct.product_title,
                  product_description: addedProduct.product_description,
                  quantity: addedProduct.quantity,
                  price: addedProduct.price,
                  'action' : 'create'
            },
            dataType: "json",
            success: function (response) {
                  return(response);
            },
            error: function (response) {
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
                  id: idIndex,
                  'action' : 'delete'
            },
            dataType: "json",
            success: function (response) {
                  return(response);
            },
            error: function(response) {
                  console.log("error message: ",response);
            }
      };

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
              updateInventoryList(inventory_array);
              return(response);
            },
            error: function(response) {
                  console.log("error message: ",response);
            }
      };
      $.ajax(inventory_api_object);
    }