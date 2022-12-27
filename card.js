let title = document.getElementById('title');
let price = document.getElementById('price');
let fees = document.getElementById('fees');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('create');
let delpro = document.getElementById('del');
let Dellall = document.getElementById('delete');
let tbody = document.getElementById('tbody');
let search = document.getElementById('search');
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');
let mood = 'create';
let searchMood = 'title'
 let temp;
function get_total(){
if(price.value != ''){
    let result = (+price.value + +fees.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background='green';
}else{
    total.innerHTML = 'Total';
    total.style.background='darkblue';
}

}
let data =[];
if(localStorage.product != '' && localStorage.product != null){
data = JSON.parse(localStorage.product);
}else{
    data = [];
}
submit.onclick = ()=>{
let pro = {
    title:title.value.toLowerCase(),
    price:price.value,
    fees:fees.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
}
if(mood === 'create'){
   if(count.value > 1){
   for(var i =0; i<count.value; i++){
    data.push(pro);
   }
   }else{
    data.push(pro);
   }
}else{
 data[temp]=pro;
 mood = 'create'
 submit.innerHTML = 'Create';
 count.style.display='block'
}
localStorage.setItem('product',JSON.stringify(data));
ClearInput();
ShowData();
}

function ClearInput(){
    title.value = '';
    price.value= '';
    fees.value = '';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';
    total.innerHTML='';
    get_total();
}

function ShowData(){
    let table = '';
    for(var i =0; i<data.length; i++){
        table += ` <tr>
        <td>${i+13506}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].fees}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].category}</td>
        <td><button id="update" onclick="Update(${i})">Update</button></td>
        <td><button id="del" onclick="DelPro(${i})">Delete</button></td>
        </tr>`;
    }
    tbody.innerHTML = table;
    if(data.length >0){
        Dellall.style.display='block'
        Dellall.innerHTML = `Delete All ( ${data.length} )`
    }else{
        Dellall.style.display='none'

    }
}ShowData();

function DelPro(num){
data.splice(num,1);
localStorage.product = JSON.stringify(data);
ShowData();
}

function DellAllPro(){
data.splice(0);
localStorage.product = JSON.stringify(data);
ShowData();
mood = 'create'
submit.innerHTML = 'Create';
count.style.display='block'
}

function Update(i){
title.value = data[i].title;
price.value = data[i].price;
fees.value = data[i].fees;
ads.value = data[i].ads;
discount.value = data[i].discount;
total.innerHTML = data[i].total;
count.style.display = 'none';
category.value = data[i].category;
get_total();
mood = 'Update'
submit.innerHTML = 'Update'
scroll({top:0,behavior:"smooth"})
temp = i;
}

searchTitle.onclick = ()=> {
    searchMood = 'title'
    search.placeholder = `Search by ${searchMood}`;
    search.focus();
}
searchCategory.onclick =()=>{
    searchMood = 'category'
    search.placeholder = `Search by ${searchMood}`
    search.focus();
}
function searchPro(value){
if(searchMood == 'title'){
    let table = '';
    for(var i =0; i<data.length; i++){
        if(data[i].title.includes(value.toLowerCase())){
            table += ` <tr>
            <td>${i+13506}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].fees}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].category}</td>
            <td><button id="update" onclick="Update(${i})">Update</button></td>
            <td><button id="del" onclick="DelPro(${i})">Delete</button></td>
            </tr>`;
        }else{
            tbody.innerHTML = '';
        }
    }tbody.innerHTML = table;
}else{
    let table = '';
    for(var i =0; i<data.length; i++){
        if(data[i].category.includes(value.toLowerCase())){
            table += ` <tr>
            <td>${i+13506}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].fees}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].category}</td>
            <td><button id="update" onclick="Update(${i})">Update</button></td>
            <td><button id="del" onclick="DelPro(${i})">Delete</button></td>
            </tr>`;
}

}tbody.innerHTML = table;
}
}

























