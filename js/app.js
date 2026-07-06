const transactions = [];

const descriptionInput = document.getElementById('description-input');
const amountInput = document.getElementById('amount-input');
const typeSelect = document.getElementById('type-select');
const dateInput = document.getElementById('date');

const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income');
const expensesElement = document.getElementById('expenses');

const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transactions-list');

transactionForm.addEventListener('submit', function (event) {
    event.preventDefault();
  const transaction = {
    description: descriptionInput.value,
    amount: Number(amountInput.value),
    type: typeSelect.value,
    date: dateInput.value
  };

  transactions.push(transaction);
  console.log(transactions);
  displayTransactions();
  updateSummary();
});

// Function to display transactions in the list
function displayTransactions() {
  transactionList.innerHTML = "";
  for (const transaction of transactions) {
    const transactionCard = document.createElement('div');
    transactionCard.className = "flex justify-between items-center bg-gray-200 rounded-lg p-4 mb-3";

    const leftSection = document.createElement('div');
    leftSection.className = "flex flex-col";

    const description = document.createElement('p');
    description.textContent = transaction.description;

    const date = document.createElement('p');
    date.textContent = formatDate(transaction.date);
    date.classList.add("text-gray-500", "text-sm");

    const amount = document.createElement('p');
    if (transaction.type === 'income') {
      amount.textContent = `+#${transaction.amount.toLocaleString()}`;
      amount.classList.add("text-green-600", "font-bold");
    } else {
      amount.textContent = `-#${transaction.amount.toLocaleString()}`;
      amount.classList.add("text-red-600", "font-bold");
    }

    leftSection.appendChild(description);
    leftSection.appendChild(date);

    transactionCard.appendChild(leftSection);
    transactionCard.appendChild(amount);
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

  balanceElement.textContent = `#${balance.toLocaleString()}`;
  incomeElement.textContent = `#${totalIncome.toLocaleString()}`;
  expensesElement.textContent = `#${totalExpenses.toLocaleString()}`;
}