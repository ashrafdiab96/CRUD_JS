var rowData = document.getElementById("rowData");
var myBtn = document.getElementById("myBtn");
var myUpdateBtn = document.getElementById("myUpdateBtn");
var proName = document.getElementById("productName");
var proCost = document.getElementById("productCost");
var proCompany = document.getElementById("productCompany");
var proDesc = document.getElementById("productDesc");

var productContainer;

if (localStorage.getItem("productContainer") == null) {
    productContainer = [];
} else {
    productContainer = JSON.parse(localStorage.getItem("productContainer"));
    displayData();
}

myBtn.onclick = function() {
    addProduct();
    displayData();
    clearForm();
}

function addProduct() {
    var product = {
        name: proName.value,
        cost: proCost.value,
        company: proCompany.value,
        desc: proDesc.value
    };
    productContainer.push(product);
    localStorage.setItem("productContainer", JSON.stringify(productContainer));
}

function displayData() {
    var temp = "";
    for (var i = 0; i < productContainer.length; i++) {
        temp += `<div class="col-md-3 p-3" id="colData">
                    <p class="data">` + productContainer[i].name + `</p>
                    <p class="data">` + productContainer[i].cost + `</p>
                    <p class="data text-danger">` + productContainer[i].company + `</p>
                    <p class="data text-info">` + productContainer[i].desc + `</p>
                    <button class="btn btn-danger" onclick="deleteProduct(` + i + `)">delete</button>
                    <button class="btn btn-info" onclick="updateProduct(` + i + `)">update</button>
                </div>`;
    }
    rowData.innerHTML = temp;
}

function clearForm() {
    var inputs = document.getElementsByClassName("form-control");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function deleteProduct(i) {
    productContainer.splice(i, 1);
    localStorage.setItem("productContainer", JSON.stringify(productContainer));
    displayData();
}

function updateProduct(i) {
    myUpdateBtn.disabled = false;
    proName.value = productContainer[i].name;
    proCost.value = productContainer[i].cost;
    proCompany.value = productContainer[i].company;
    proDesc.value = productContainer[i].desc;
    myUpdateBtn.onclick = function() {
        productContainer[i].name = proName.value;
        productContainer[i].cost = proCost.value;
        productContainer[i].company = proCompany.value;
        productContainer[i].desc = proDesc.value;
        localStorage.setItem("productContainer", JSON.stringify(productContainer));
        displayData();
        clearForm();
        myUpdateBtn.disabled = true;
    }
}
// var searchProduct = document.getElementById("searchProduct");
// var filter = searchProduct.value.toUpperCase();
// var colData = document.getElementById("colData");
// var data = colData.getElementsByClassName("data")[0].innerHTML;

function searchProduct() {
    var searchProduct = document.getElementById("searchProduct");
    var filter = searchProduct.value.toUpperCase();
    var colData = document.getElementById("colData");
    var data = colData.getElementsByClassName("data");
    var txtVal, a;
    for (var i = 0; i < data.length; i++) {
        a = data[i].getElementsByTagName("p");
        txtVal = a.textContent || a.innerHTML;
        window.console.log(txtVal);
        if (txtVal.toUpperCase().indexOf(filter) > -1) {
            data[i].style.display = "";
        } else {
            data[i].style.display = "none";
        }
    }
}