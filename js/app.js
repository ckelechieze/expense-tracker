// Load saved transaction from local storage
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

let editIndex = null;

// Grabbnow what ing Elements
const descriptionInput = document.getElementById('description-input');
const amountInput = document.getElementById('amount-input');
const typeSelect = document.getElementById('type-select');
const dateInput = document.getElementById('date');

const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income');
const expensesElement = document.getElementById('expenses');

const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transactions-list');
const submitBtn = document.getElementById("submit-button");
cancelBtn = document.getElementById("cancel-button");

// Clicking the form submit button
transactionForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (descriptionInput.value === "" || amountInput.value === "" || dateInput.value === "" || typeSelect.value === "") {
      alert ("Please fill in all fields.");
      return;
    }

    if (Number(amountInput.value) <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }

  const transaction = {
    description: descriptionInput.value,
    amount: Number(amountInput.value),
    type: typeSelect.value,
    date: dateInput.value
  };

  if (editIndex === null) {
    transactions.push(transaction);
  } else {
    transactions[editIndex] = transaction;
    editIndex = null;
  }

  localStorage.setItem("transactions", JSON.stringify(transactions));
  displayTransactions();
  updateSummary();
  transactionForm.reset();
  submitBtn.textContent = "Add Transaction";
  cancelBtn.classList.add("hidden");
});

// Function to display transactions in the list
function displayTransactions() {
  transactionList.innerHTML = "";
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const transactionCard = document.createElement('div');
    transactionCard.className = "flex justify-between items-center bg-gray-200 rounded-lg p-3 mb-3";

    const leftSection = document.createElement('div');
    leftSection.className = "flex flex-col";

    const rightSection = document.createElement('div');
    rightSection.className = "flex flex-col items-end";

    const description = document.createElement('p');
    description.textContent = transaction.description;

    const date = document.createElement('p');
    date.textContent = formatDate(transaction.date);
    date.classList.add("text-gray-500", "text-sm");

    const amount = document.createElement('p');

    const buttonContainer = document.createElement('div');
    buttonContainer.className = "flex flex items-center";

    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.className = "text-slate-500 font-medium text-sm hover:text-blue-800 shadow px-2 py-1 rounded-lg";

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = "ml-4 text-red-600 font-medium text-sm hover:text-red-800 shadow px-2 py-1 rounded-lg";

    // Add event listener to delete the transaction
    deleteButton.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete this transaction?")) {
        transactions.splice(i, 1);

        localStorage.setItem("transactions", JSON.stringify(transactions));
        
        displayTransactions();
        updateSummary();
      }
    })

    // Event listener to edit a transaction
    editButton.addEventListener("click", function () {
      editIndex = i;

      descriptionInput.value = transaction.description;
      amountInput.value = transaction.amount;
      typeSelect.value = transaction.type;
      dateInput.value = transaction.date;
      submitBtn.textContent = "Update Transaction";
      cancelBtn.classList.remove("hidden");
    });

    // Event listener to cancel edit
    cancelBtn.addEventListener("click", function () {
      editIndex = null;
      transactionForm.reset();
      submitBtn.textContent = "Add Transaction";
      cancelBtn.classList.add("hidden");
    })

    if (transaction.type === 'income') {
      amount.textContent = `+₦${transaction.amount.toLocaleString()}`;
      amount.classList.add("text-green-600", "font-bold");
    } else {
      amount.textContent = `-₦${transaction.amount.toLocaleString()}`;
      amount.classList.add("text-red-600", "font-bold");
    }

    leftSection.appendChild(description);
    leftSection.appendChild(date);

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

     rightSection.appendChild(amount);
     rightSection.appendChild(buttonContainer);

    transactionCard.appendChild(leftSection);
    transactionCard.appendChild(rightSection);
    transactionList.appendChild(transactionCard);
  }
}

// Function to display formated date
function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

// Function to update the balance, income, and expenses
function updateSummary() {
  let totalIncome = 0;
  let totalExpenses = 0;
  let balance = 0;

  for (const transaction of transactions) {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    } else {
      totalExpenses += transaction.amount;
    }
  }

  balance = totalIncome - totalExpenses;

  balanceElement.textContent = `₦${balance.toLocaleString()}`;
  incomeElement.textContent = `₦${totalIncome.toLocaleString()}`;
  expensesElement.textContent = `₦${totalExpenses.toLocaleString()}`;
}

// Display saved transactions when the page first loads
displayTransactions();
updateSummary();