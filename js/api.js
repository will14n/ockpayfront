 var server = "https://boiling-escarpment-86975.herokuapp.com";

function loadMenu() {
	// console.log(window.location.search.substr(1))
	axios.get(server+'/api/menu/client/' + window.location.search.substr(1))
    .then(response => buildSnacksStructure(response.data))
    .catch(error => console.log(error))
}

function showMenu() {
	axios.get(server+'/api/menu/' + window.location.search.substr(1),{
	headers: {
	  'Access-Control-Allow-Origin': '*',
	}})
    .then(response => chargeMenu(response.data))
    .catch(error => console.log(error))
}

function loadCart(id) {
	axios.get(server+'/api/menu_request/request/' + id)
    .then(response => buildCartStructure(response.data))
    .catch(error => console.log(error))
}

function loadRequestList() {
	axios.get(server+'/api/request/')
    .then(response => buildRequestListStructure(response.data))
    .catch(error => console.log("error : "+error))
}

function loadRequest(id) {
	axios.get(server+'/api/request/' + id)
    .then(response => buildRequestStructure(response.data))
    .catch(error => console.log(error))
}

async function finalizeRequest(id) {

	params = '{"request": {"status_id": 2}}';

	let res = await axios.put(server+'/api/request/' + id, JSON.parse(params));

/*	if(res.request.status == 201) {
		 window.location.href = "../Cart/index.html?request=" + res.data.id;
	}*/
}

async function sendToCart(params) {

	params = params.split("&").join(", ");
	params = params.split("=").join(": ");
	params = params.split("quantity[").join('"');
	params = params.split("]").join('"');
	params = '{"menu": {' + params + '}}';
	// console.log(params);return false;
	// params = params.join();
	// console.log(JSON.parse(params));
	let res = await axios.post(server+'/api/request', JSON.parse(params));

	if(res.request.status == 201) {
		window.location.href = "../Cart/index.html?request=" + res.data.id;
	}
}

async function createMenu() {

	var formData = new FormData();
	var imagefile = document.querySelector('#attachment');
	var client_id = document.getElementById('client_id').value;	
	var price = document.getElementById('price').value;
	price = price.split(".").join("");
	price = price.split(",").join(".");

	formData.append("client_id", client_id);
	formData.append("image", imagefile.files[0]);
	formData.append("title", document.getElementById('title').value);
	formData.append("price", price);
	formData.append("description", document.getElementById('description').value);
	// params = params.join();
	// console.log(JSON.parse(params));
	let res = await axios.post(server+'/api/menu', formData, {
            'headers': {
                'Accept': 'application/json',
            	'Content-Type': 'multipart/form-data',
            }
    	}
    );

	if(res.request.status == 201) {
		 window.location.href = "../Client/index.html";
	}
}

async function updateMenu() {

	var formData = new FormData();
	var imagefile = document.querySelector('#attachment');
	var price = document.getElementById('price').value;
	price = price.split(".").join("");
	price = price.split(",").join(".");
	var id = window.location.search.substr(1);
	

	// formData.append("id", );
	formData.append("image", imagefile.files[0]);
	formData.append("title", document.getElementById('title').value);
	formData.append("price", price);
	formData.append("description", document.getElementById('description').value);
	// params = params.join();
	// console.log(JSON.parse(params));
	let res = await axios.post(server+'/api/menu/' + id, formData, {
            'headers': {
                'Accept': 'application/json',
            	'Content-Type': 'multipart/form-data',
            }
    	}
    );

	if(res.request.status == 201) {
		 window.location.href = "../Client/index.html";
	}
}

async function sendToPayment(params) {
// console.log(params[0].value);
	// params = params.split("&").join(", ");
	// params = params.split("=").join(": ");
	// params = '{"request": {' + params + '}}';
	// console.log(params);
	// let res = await axios.post(server+'/api/payment/request/', JSON.parse(params));

	// if(res.request.status == 201) {
		 window.location.href = "../Payment/index.html?request=" + params[0].value;
	// }	
}

async function pay(params) {
// console.log(params[0].value);
	// params = params.split("&").join(", ");
	// params = params.split("=").join(": ");
	// params = '{"request": {' + params + '}}';
	// console.log(params);
	// let res = await axios.post(server+'/api/payment/request/' + params);

	// if(res.request.status == 201) {
		 window.location.href = "../Request/index.html?request=" + params;
	// }	
}

async function login(params) {

	params = params.split("&").join('", "');
	params = params.split("=").join('": "');
	params = '{"' + decodeURIComponent(params) + '"}';
	// console.log(params);
	// params = params.join();
	// console.log(JSON.parse(params));
	let res = await axios.post(server+'/api/login', JSON.parse(params));

	if(res.request.status == 201) {
		let resData = res.data.success;
		setCookie('token', resData.token, 1);
		setCookie('client_id', resData.client_id, 1);
		setCookie('user_id', resData.id, 1);
		window.location.href = "../Client/index.html";
	}	
}
 
function loadClientMenu(client_id) {
	axios.get(server+'/api/menu/client/' + client_id)
    .then(response => buildClientSnacksStructure(response.data))
    .catch(error => console.log(error))
}

 
function destroySnack(id) {
	axios.delete(server+'/api/menu/' + id)
    .then(response => response.data == 201 ? window.location.href = "../Client/index.html" : "")
    .catch(error => console.log(error))
}