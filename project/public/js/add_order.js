
let addOrderForm = document.getElementById('add-order-form');

addOrderForm.addEventListener('submit', function (e)
{
    e.preventDefault();

    let inputCustomerEmail = document.getElementById('input-email');
	let inputDate = document.getElementById('date');

	let emailVal = inputCustomerEmail.value;
	let dateVal = inputDate.value;
    let data = {
        CustomerEmail: emailVal,
		date: dateVal
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/add-order', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log('Requesting data from /add-order');

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response);
			
			inputCustomerEmail.value = '';
            inputDate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert('Error: ' + xhttp.responseText);
            console.log('Error: ' + xhttp.responseText);
        }
    }
    xhttp.send(JSON.stringify(data));
})

addRowToTable = (data) => {
    let table = document.getElementById("orders-table");
    let newRowIndex = table.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
	let emailCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
	
    emailCell.innerText = parsedData.email;
    dateCell.innerText = parsedData.date;

    row.appendChild(idCell);
	row.appendChild(emailCell);
    row.appendChild(dateCell);

    table.appendChild(row);
}
