function addQuantity(id) {
	let quantityDom = document.getElementById("quantity[" + id + "]");
	let quantity = parseInt(quantityDom.value) + 1;
	document.getElementById("quantityLabel[" + id + "]").innerText = quantity;
	quantityDom.value = quantity;
	changeTotal(); 
}

function lessQuantity(id) {
	let quantity = parseInt(document.getElementById("quantity[" + id + "]").value);
	if(quantity > 0) {

		let newQuantity = quantity - 1;
		// console.log(quantity);
		document.getElementById("quantityLabel[" + id + "]").innerText = newQuantity;
		document.getElementById("quantity[" + id + "]").value = newQuantity;
		changeTotal(quantityDom.className, "-"); 
	}
	changeTotal(); 
}

function changeTotal() {

	let labelTotal = document.getElementById('labelTotal');
	let nodeList = document.querySelectorAll('input[type="hidden"]');
	for (var i = 0; i < nodeList.length; ++i) {

		var item = nodeList[i];
		if(item.value > 0) {
			total = parseInt(item.value) * parseFloat(item.className);
		}
	}
	labelTotal.innerText = total;
}

function buildSnacksStructure(res) {

	for(prop in res) {

	    let menu = res[prop];
		let menuStructure = createSnackStructure(menu);
		document.getElementById("snacks").appendChild(menuStructure);
	}
}

function buildCartStructure(res) {

	let total = 0;
	for(prop in res) {

	    let request = res[prop];

			// let requestStructure = createCartStructure(request.menu);
			// document.getElementById("cart").appendChild(requestStructure);
		i = 0;
		while(i < request.quantity) {

			total += parseFloat(request.menu.price);
			let requestStructure = createCartStructure(request.menu);
			document.getElementById("cart").appendChild(requestStructure);
			i++;
		}
	}
	document.getElementById("labelTotal").innerText = total;
}

function buildRequestListStructure(res) {

	for(prop in res) {

	    let request = res[prop];
		let requestStructure = createRequestListStructure(request);
		if(request.status_id == 1) {
			document.getElementById("holder").appendChild(requestStructure);
		}
		else {
			document.getElementById("dropIt").appendChild(requestStructure);			
		}
	}	
}

function buildClientSnacksStructure(res) {

	for(prop in res) {

	    let request = res[prop];
		let requestStructure = createClientSnackStructure(request);
		document.getElementById("snacks").appendChild(requestStructure);
		// if(request.status_id == 1) {
		// 	document.getElementById("holder").appendChild(requestStructure);
		// }
		// else {
		// 	document.getElementById("dropIt").appendChild(requestStructure);			
		// }
	}	
}

function buildRequestStructure(res) {
	document.getElementById('labelRequestId').innerText = res.id;
	if(res.status_id == 1) {
		document.getElementById('labelRequestStatus').innerText = "Em Preparo";		
	}
	document.getElementById('labelRequestTable').innerText = "Ajustar";
}

function createSnackStructure(res) {
	let node = createDiv("columns is-vcentered  stretch");
	node.appendChild(createImageColumn(res));
	node.appendChild(createSnackColumn(res));
	node.appendChild(createQuantityColumn(res.id, res.price));
	return node;
}

function createClientSnackStructure(res) {
	let node = createDiv("columns");
	node.appendChild(createImageColumn(res));
	node.appendChild(createSnackColumn(res));
	node.appendChild(createActionsColumn(res.id));
	return node;
}


function createCartStructure(res) {
	let node = createDiv("columns");
	node.appendChild(createDescriptionColumn(res.title));
	node.appendChild(createPriceColumn(res));
	return node;
}

function createRequestListStructure(res) {

	let node = createDiv("drag column has-text-centered");
	node.draggable = "true";
	node.ondragstart = dragStart;
	// node.addEventListener("ondragenter", dragStart, false);
	// node.addEventListener("ondragenter", function(){
	// 	return dragEnter(event);
	// });
	// node.addEventListener("ondrop", function(){
	// 	return dragDrop(event);
	// });
	// node.addEventListener("ondragover", function(){
	// 	return dragOver(event);
	// });

	node.setAttribute("id", res.id);
	if(res.status_id == 1) {
		node.innerHTML = "#" + res.id + '<br/><i class="fa fa-forward" id="icon' + res.id + '" aria-hidden="true" onclick="finalizeRequest('+res.id+')" > Finalizar</i>';
	}
	else {
		node.innerHTML = "#" + res.id;
	}
	return node;
}

function createSnackColumn(res) {
	node = createDiv("column is-8")
	node.appendChild(createParagraph(res, true, null, "is-left"));
	node.appendChild(createParagraph(res.description, null, null, "is-left"));
	return node;
}

function createQuantityColumn(id, price) {
	node = createDiv("column is-1 has-text-centered")
	node.appendChild(createParagraph("+", null, "addQuantity(" + id + ")"));
	node.appendChild(createInput(id, price));
	node.appendChild(createLabel(id));
	node.appendChild(createParagraph("-", null, "lessQuantity(" + id + ")"));
	return node;
}

function createImageColumn(res) {
	node = createDiv("column is-3 has-text-centered");
	node.appendChild(createFigure(res));
	return node;
}

function createPriceColumn(res) {
	node = createDiv("column is-4")
	node.appendChild(createParagraph("R$ " + res.price));
	node.appendChild(createInput(res.id, res.price));
	return node;
}

function createDescriptionColumn(res, id) {
	node = createDiv("column is-4 is-offset-2");
	node.appendChild(createParagraph(res));
	return node;
}

function createActionsColumn(id) {
	node = createDiv("column is-1")
	/*<button class="button is-medium">
    <span class="icon is-small">
      <i class="fas fa-heading"></i>
    </span>
  </button>*/
	node.appendChild(createButton(id, 'is-warning', 'createEditIcon("pencil-alt", '+id+')'));
	node.appendChild(createButton(id, 'is-danger', 'createDeleteIcon("trash", '+id+')'));

	return node;
}

/*
ELEMENTS
*/

function createDiv(name) {
	let div = document.createElement("div");
	div.className = name;
	return div;
}

function createParagraph(res, bolder = false, func, className = null) {
	let p = document.createElement("p");
	if(bolder == true) {
		txt = p.appendChild(createBolderText(res.title + " | R$" + res.price.replace(".", ",")));
	}
	else {
		txt = document.createTextNode(res);
	}

	if(func) {
		p.addEventListener('click' , function(){
			eval(func);
		} );
	}

	if(className) {
		p.className = className;
	}
	p.appendChild(txt);
	return p;
}

function createFigure(res) {
	let img = document.createElement("figure");
	img.className = "avatar";
	img.appendChild(createImage(res));
	return img;
}

function createImage(res) {
	let img = document.createElement("img");
	img.src = "../../api/public/uploads/" + res.attachment;
	img.className = " menu-image";
	return img;
}

function createInput(id, price = null) {
	let input = document.createElement("input");
	input.type = "hidden";
	input.value = "0";
	input.name = "quantity[" + id + "]";
	input.className = price;
	input.id = "quantity[" + id + "]";
	return input;
}

function createLabel(id) {
	let label = document.createElement("label");
	let txt = document.createTextNode("0");
	label.id = "quantityLabel[" + id + "]";
	label.className = "quantityLabel";
	label.appendChild(txt);
	return label;
}

function createBolderText(txt) {
	let b = document.createElement("b");
	txt = document.createTextNode(txt);
	b.appendChild(txt);
	return b;
}

function createButton(id, className, icon) {
	let button = document.createElement("button");
	button.className = "button "+className;
	button.appendChild(eval(icon));
	if(className == 'is-warning') {
		button.onclick = function () {
	    	editSnack(id);
		};
	}
	else {
		button.onclick = function () {
	    	deleteSnack(id);
		};	
	}
	return button;
}

function createEditIcon(name, id) {
	let icon = document.createElement("i");
	icon.className = "fas fa-" + name;
	return icon;
}

function createDeleteIcon(name, id) {
	let icon = document.createElement("i");
	icon.className = "fas fa-" + name;
	return icon;
}

// function serialize(form){if(!form||form.nodeName!=="FORM"){return }var i,j,q=[];for(i=form.elements.length-1;i>=0;i=i-1){if(form.elements[i].name===""){continue}switch(form.elements[i].nodeName){case"INPUT":switch(form.elements[i].type){case"text":case"hidden":case"password":case"button":case"reset":case"submit":if(form.elements[i].value > 0) {q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));}break;case"checkbox":case"radio":if(form.elements[i].checked){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value))}break;case"file":break}break;case"TEXTAREA":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"SELECT":switch(form.elements[i].type){case"select-one":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"select-multiple":for(j=form.elements[i].options.length-1;j>=0;j=j-1){if(form.elements[i].options[j].selected){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].options[j].value))}}break}break;case"BUTTON":switch(form.elements[i].type){case"reset":case"submit":case"button":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break}break}}return q.join("&")};
function serialize(form){if(!form||form.nodeName!=="FORM"){return }var i,j,q=[];for(i=form.elements.length-1;i>=0;i=i-1){if(form.elements[i].name===""){continue}switch(form.elements[i].nodeName){case"INPUT":switch(form.elements[i].type){case"text":case"hidden":case"password":case"button":case"reset":case"submit":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"checkbox":case"radio":if(form.elements[i].checked){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value))}break;case"file":break}break;case"TEXTAREA":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"SELECT":switch(form.elements[i].type){case"select-one":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"select-multiple":for(j=form.elements[i].options.length-1;j>=0;j=j-1){if(form.elements[i].options[j].selected){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].options[j].value))}}break}break;case"BUTTON":switch(form.elements[i].type){case"reset":case"submit":case"button":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break}break}}return q.join("&")};

	// document.body.querySelector("form").onsubmit = function(){

	// console.log(serialize(document.forms[0]));
// }

function validateMoney(value) {

  	value = value.split(",").join("");
  	value = value.split(".").join("");

	if(parseInt(value) > 0) {

	  	var decimal = value;
	  	// if(value.toString().length > 3) {
	  		decimal = (value/100).toFixed(2);
	  	// }
	  	var strString = decimal.toString();
	  
		//substitui separador decimal ponto por virgula
		strString=strString.replace(".", ",");
		//a regex abaixo coloca um ponto a esquerda de cada grupo de 3 dígitos desde que não seja no inicio do numero
		money = strString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		document.getElementById('price').value = money;
	}	
}

function somenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace   
    // charCode 9 = tab
    if (charCode != 8 && charCode != 9) {
        // charCode 48 equivale a 0   
        // charCode 57 equivale a 9
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }
}

function validateLenght(value) {

	value = value.toString();
	if(value.length == 9 && value.split(',')[1].length == 2) {
		openMessage('priceMessage');
	}
}

function openMessage(id) {
	document.getElementById(id).classList.remove("is-hidden");
}

function closeMessage(id) {
	document.getElementById(id).classList.add("is-hidden");
}

function createSnack() {
	window.location.href = "../Menu/create.html";
}

function editSnack(id) {
	window.location.href = "../Menu/edit.html?" + id;
}

function deleteSnack(id) {
	if(confirm("Deseja realemente apagar este produto?")) {
		destroySnack(id);

	}
}

function backToList(id) {
	window.location.href = "../Client/index.html";
}

function chargeMenu(data) {
	document.getElementById("client_id").value = data.id;
	document.getElementById("title").value = data.title;
	document.getElementById("price").value = data.price.replace(".", ",");
	document.getElementById("description").value = data.description;
}
