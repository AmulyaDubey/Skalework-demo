getCustomersList = () => {
  var apiUrl = "http://localhost:5000/get-customer-list";
  return fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.result;
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

getCustomersListHtml = async () => {
  const list = await getCustomersList();
  document.getElementById("customers__list__div").innerHTML = list
    .map(
      (user) =>
        `<div class="card mt-4 mb-4 shadow bg-body rounded" style="cursor: pointer" onclick="customerDetailsPopup('${user.customerId}')">
          <div class="card-body d-flex align-items-center justify-content-between">
            <p style="margin:0">${user.name}</p>
            <i class="fa fa-angle-right" aria-hidden="true" style="color: black"></i>
          </div>
        </div>`
    )
    .join("");
};

addCustomer = (e) => {
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  var apiUrl = "http://localhost:5000/add-customer";
  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(formProps),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

initializeCustomers = async () => {
  const list = await getCustomersList();
  document.getElementById("orderCustomer").innerHTML =
    "<option value='' selected disabled hidden>Select an Option</option>" +
    list
      .map((user) => `<option value=${user.customerId}>${user.name}</option>`)
      .join("");
};

createOrder = (e) => {
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  var apiUrl = "http://localhost:5000/create-order";
  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(formProps),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

getOrdersList = () => {
  var apiUrl = "http://localhost:5000/get-all-orders";
  return fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.result;
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

getOrdersListHtml = async () => {
  const list = await getOrdersList();
  document.getElementById("orders__list__div").innerHTML = list
    .map(
      (order) =>
        `<div class="card mt-4 mb-4 shadow bg-body rounded" style="cursor: pointer">
          <div class="card-body d-flex align-items-center justify-content-between">
            <p style="margin:0">${order.name}</p>
            <i class="fa fa-angle-right" aria-hidden="true" style="color: black"></i>
          </div>
        </div>`
    )
    .join("");
};

customerDetails = (customerId) => {
  var apiUrl = `http://localhost:5000/get-customer/${customerId}`;
  return fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.result;
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

customerDetailsPopup = async (customerId) => {
  var customer = await customerDetails(customerId);
  console.log(customer);
  document.getElementById("customer__details__alert").innerHTML =
    `<div class="alert">
      <span class="closebtn" onclick="this.parentElement.style.display='none';" style="float: right">&times;</span> 
      <br/>
      <div class="container">
        <h3>${customer.name}</h3>
        <h6><i class="text-muted">${customer.email}</i></h6>
        <p class="lead" style="font-size: 14px">${customer.address}</p>
        <div class="mt-4">
          <h5>Orders: ${customer.orders.length}</h5> <ol>` +
    customer.orders.map((order) => `<li>${order.orderName}</li>`).join("") +
    `</ol>
       </div>
      </div>
    </div>`;
};
