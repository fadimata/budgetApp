const budgetInput = document.getElementById('input_budget');
const totalBudget = document.getElementById('budget_span');
const titleExpenseInput = document.getElementById('titleExpense');
const inputAmount = document.getElementById('inputAmount');
const calculateButton = document.querySelector('.calculate');
const updatemodif = document.querySelector('.update-modif');
const addExpenseButton = document.querySelector('.add_expense');
const totalExpense = document.querySelector('#expense_span');
const totalBalance = document.querySelector('#balance_span');
const resetValue = document.querySelector('.Reset-value');
const buttonHistory = document.querySelector('.button-history');
const buttonClose = document.querySelector('.button-close');
const table = document.querySelector('table');
const tablePriceStory = document.querySelector('.tablePrice');
console.log(tablePriceStory);
let expenses = [];
let totalAmount = 0;
const localTotalBudgetAmount = 'localTotalBudgetAmount'
const localExpenses = 'localExpenses'

calculateButton.addEventListener('click', () => {
    const inputValue = +budgetInput.value;
    const totalbudgetValue = parseInt(totalBudget.textContent);
    totalAmount = inputValue + totalbudgetValue;
    totalBudget.textContent = `${totalAmount} F`;
    budgetInput.value = '';
    localStorage.setItem(localTotalBudgetAmount, `${totalAmount}`);
})

const checkExpenseInputs = ()=>{
  
}
addExpenseButton.addEventListener('click', (e) => {
    if (titleExpenseInput.value === '' || inputAmount.value === '') {
        alert('Les inputs ne doivent pas etre vide mesdames')        
    }else{
        updatemodif.style.display = 'none'
    addExpenseButton.style.display = 'block';
    e.preventDefault();
    const titleExpenseValue = titleExpenseInput.value;
  const amountExpenseValue = +inputAmount.value;
    
    table.innerHTML += `
    <tr data-index="${expenses.length}" class="icon3 d-flex gap-5 justify-content-center align-items-center ">
        <td>${titleExpenseValue} </td>
        <td>${amountExpenseValue}</td>
        <td class="">
            <i class="bi bi-pencil-square text-primary" onclick="updateItem(event)"></i>
            <i class="bi bi-trash-fill text-danger" onclick="deleteItem(event)"></i>
        </td>
    </tr>`;

    const dataObject = {
        title: titleExpenseValue,
        price: amountExpenseValue
    }
    expenses.push(dataObject);
    localStorage.setItem(localExpenses, JSON.stringify(expenses));
    calculatetotalExpense()
    titleExpenseInput.value = ''
    inputAmount.value = ''

    }
})



const init = () => {
    totalAmount = +localStorage.getItem(localTotalBudgetAmount)
    totalBudget.textContent = `${totalAmount} F `;

    const tableData = localStorage.getItem(localExpenses);
    expenses = JSON.parse(tableData);
    if(!expenses) expenses = []
    for (let i = 0; i < expenses.length; i++) {
        const element = expenses[i];
        table.innerHTML += `
    <tr data-index="${i}" class="icon3 d-flex gap-5 justify-content-center align-items-center ">
    <td>${element.title}</td>
    <td>${element.price}</td>
    <td class="">
        <i class="bi bi-pencil-square" onclick="updateItem(event)"></i>
        <i class="bi bi-trash-fill" onclick="deleteItem(event)"></i>
    </td>
    </tr>`;
    }

    calculatetotalExpense()

    addExpenseButton.style.display = 'block';
    updatemodif.style.display = 'none'
}
init()

function calculatetotalExpense() {
    let initialeExpense = 0
    expenses?.forEach(expense => {
        initialeExpense += expense.price
    })

    totalExpense.textContent = initialeExpense;
    const totalBalanceValue = totalAmount - initialeExpense;
    totalBalance.innerHTML = `${totalBalanceValue}`
}

let index;
function updateItem(e) {
    addExpenseButton.style.display = 'none';
    updatemodif.style.display = 'block'
    index = +e.target.parentNode.parentNode.getAttribute('data-index');
    let data = expenses[index];
    console.log(data);
    titleExpenseInput.value = data.title
    inputAmount.value = data.price
    console.log(typeof data.price);

    updatemodif.addEventListener('click',(e) =>{
        e.preventDefault()
    
        let data = expenses[index];
        addExpenseButton.style.display = 'block';
        updatemodif.style.display = 'none';
        data.title = titleExpenseInput.value
        data.price =  +inputAmount.value
        console.log(typeof data.price);
        
        localStorage.setItem(localExpenses, JSON.stringify(expenses));
        table.innerHTML = ''
        titleExpenseInput.value = ''
        inputAmount.value = ''
        init()
        })
}

function deleteItem(e) {

    const index = +e.target.parentNode.parentNode.getAttribute('data-index');
    expenses.splice(index, 1);
    localStorage.setItem(localExpenses, JSON.stringify(expenses));
    table.innerHTML = ''
    init()
}


resetValue.addEventListener('click', () =>{
    localStorage.clear()
    init()
})


// *********************************** chart ***********************************
let dataChart = [];
let labelChart = [];
let newTableData = JSON.parse(localStorage.getItem(localExpenses));

newTableData.forEach(product => {
  dataChart.push(product.price);
  labelChart.push(product.title);
});
  console.log(newTableData);
const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: labelChart,
    datasets: [{
      label: 'price',
      data: dataChart,
      borderWidth: 1
    }]
  },

});

buttonHistory.addEventListener('click', () =>{
  document.querySelector('.tablePrice').classList.remove('d-none');
  buttonClose.classList.remove('d-none')
  // buttonClose.style.display = 'block';
})
buttonClose.addEventListener('click', () =>{
  document.querySelector('.tablePrice').classList.add('d-none');
  buttonClose.classList.add('d-none')
})

newTableData.forEach((el, index)=> {
  let tableState = [];
  tableState.push(newTableData)
  console.log(tableState);
  tablePriceStory.innerHTML += ` <thead>
  
</thead>
<tbody>
  <tr>
    <th scope="row">${index + 1}</th>
    <td>${el.title}</td>
    <td>${el.price}</td>
    
  </tr>
 
 
</tbody>  `
});