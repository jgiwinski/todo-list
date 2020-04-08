
// add eventListeners to the form 
const form          = document.querySelector('#itemForm');  // select form
const itemInput     = document.querySelector('#itemInput'); // select input box from form
const itemList      = document.querySelector('.item-list'); 
const feedback      = document.querySelector('.feedback'); 
const clearButton   = document.querySelector('#clear-list'); // clears list of all items

let todoItems       = []; 

const handleItem    = function(itemName){ 
    const items = itemList.querySelectorAll('.item'); 

    items.forEach(function(item){
        //complete eventListener
        if(item.querySelector('.item-name').textContent === itemName){
            item.querySelector('.complete-item').addEventListener('click', function(){
                item.querySelector('.item-name').classList.toggle('completed');
                this.classList.toggle('visibility'); 
            }); 
            //edit evenListener
            item.querySelector('.edit-item').addEventListener('click', function(){
                itemInput.value = itemName; 
                itemList.removeChild(item); 

                todoItems = todoItems.filter(function(item){
                    return item !== itemName; 
                }); 
            }); 
            //delete eventListener
            item.querySelector('.delete-item').addEventListener('click', function(){
                itemList.removeChild(item); 

                todoItems = todoItems.filter(function(item){
                    return item !== itemName; 
                }); 

                showFeedback('item delete', 'success'); 
            })
        }
    })
}

const removeItem = function(item){
    console.log(item); 
    const removeIndex = (todoItems.indexOf(item)); 
    console.log(removeIndex); 
    todoItems.splice(removeIndex, 1); 
}

const getList = function(todoItems){
    itemList.innerHTML = ''; 

        todoItems.forEach(function(item){
            itemList.insertAdjacentHTML('beforeend', `<div class="item my-3"><h5 class="item-name text-capitalize">${item}</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>`); 
        
            handleItem(item); 
        }); 
}

const getLocalStorage = function(){
    const todoStorage = localStorage.getItem('todoItems'); 
    if (todoStorage === 'undefined' || todoStorage === null){
        todoItems = []; 
    } else {
        todoItems = JSON.parse(todoStorage); 
        getList(todoItems); 
    }
}

const setLocalStorage = function(todoItems){
    localStorage.setItem('todoItems', JSON.stringify(todoItems)); 
}

//get local storage from page
getLocalStorage(); 

//add item to the list - including local storage
form.addEventListener('submit', function(e){
    e.preventDefault(); 
    const itemName = itemInput.value; 

    if (itemName.legth === 0){ 
        feedback.innerHTML = 'please enter value value'; 
        feedback.classList.add('showItem', 'alert-danger'); 
        setTimeout(
            function(){
                feedback.classList.remove('showItem'); 
            }, 3000); 
    } else {
        todoItems.push(itemName); 
        setLocalStorage(todoItems); 
        getList(todoItems); 
        //add eventListeners to icons
    }

    itemInput.value = ''; 

}); 

//clear all items from list 
clearButton.addEventListener('click', function(){
    todoItems = []; 
    localStorage.clear(); 
    getList(todoItems); 
})