const transactions = [];

const descriptionInput = document.getElementById('description-input');
const amountInput = document.getElementById('amount-input');
const typeSelect = document.getElementById('type-select');
const dateInput = document.getElementById('date');

console.log(transactions);

const transactionForm = document.getElementById('transaction-form');

console.log(transactionForm);

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
});