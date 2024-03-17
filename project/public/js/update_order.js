/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

update_order.js
    This file is the main entry point for the application.
    It sets up the server and routes.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/


let updateOrderForm = document.getElementById('update-order-form');

updateOrderForm.addEventListener('submit', function (e)
{
    e.preventDefault();

    let inputOrderId = document.getElementById('orderSelect');
    let inputEmail = document.getElementById('email-upd');
	let inputDate = document.getElementById('date-upd');

	let emailVal = inputEmail.value;
    let dateVal = inputDate.value;

    let data = {
        orderID: inputOrderId.value,
		email: emailVal,
        date: dateVal
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open('PUT', '/update-order/', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log('Requesting data from /update-order');
    console.log('Data:' + JSON.stringify(data));

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRowInTable(xhttp.response);

            inputEmail.value = '';
            inputDate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert('Error: ' + xhttp.responseText);
            console.log('Error: ' + xhttp.responseText);
        }
    }
    xhttp.send(JSON.stringify(data));
})

updateRowInTable = (data) => {
    let table = document.getElementById('orders-table');
    let parsedData = JSON.parse(data);
    let newRow = parsedData;

    let row = document.getElementById(newRow.orderID);
    /* row.cells[1].innerHTML = newRow.email;
    row.cells[2].innerHTML = newRow.date; */
}
