const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const amountInput = document.getElementById('text');
    const descriptionInput = document.getElementById('des');
    const categoryInput = document.getElementById('category');

    const amount = amountInput.value;
    const choosedescription = descriptionInput.value;
    const choosecategory = categoryInput.value;
    const expenseKey = `expense_${Date.now()}`;

    const newLi = document.createElement('li');
    newLi.innerHTML = `<span class="bold">${amount}</span> - ${choosedescription} - ${choosecategory}
                       <button class="delete-btn">Delete</button>
                       <button class="edit-btn">Edit</button>`;

    const userList = document.querySelector('#userlist');
    userList.appendChild(newLi);

    amountInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = '';

    const obj = {
        amount: amount,
        choosedescription: choosedescription,
        choosecategory: choosecategory
    };

    const newobj = JSON.stringify(obj);
    localStorage.setItem(expenseKey, newobj); // Use unique key for each expense

    const deleteButton = newLi.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        localStorage.removeItem(expenseKey); // Remove expense using unique key
        userList.removeChild(newLi);
    });

    const editButton = newLi.querySelector('.edit-btn');
    editButton.addEventListener('click', function() {
        userList.removeChild(newLi);
        document.getElementById('text').value = obj.amount;
        document.getElementById('des').value = obj.choosedescription;
        document.getElementById('category').value = obj.choosecategory;
        localStorage.removeItem(expenseKey); // Remove expense using unique key
    });
});
