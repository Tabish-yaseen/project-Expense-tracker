let form=document.querySelector('#addForm')
let Amount=document.querySelector('#amount')
let Description=document.querySelector('#description')
let Category=document.querySelector('#category')
let ul=document.querySelector('#items')

let editMode=false
let userId=null

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const details={
        expenseAmount:Amount.value,
        description:Description.value,
        category:Category.value,
}
if(editMode===false && userId===null){
axios.post('http://localhost:5000/expensetracker/add-product',details)
.then((res)=>{
    console.log(res)
    showOnScreen(res.data.product)
    form.reset()
}).catch(err=>{
    console.log(err)
})

}
else if(editMode && userId){
    axios.put(`http://localhost:5000/expensetracker/update-product/${userId}`,details)
    .then(res=>{
       return axios.get(`http://localhost:5000/expensetracker/get-productbyId/${userId}`)
    })
    .then(res=>{
        showOnScreen(res.data.product)
        form.reset()
        
        editMode=false
        userId=null
    })
}
})
window.addEventListener('DOMContentLoaded',(e)=>{
    axios.get('http://localhost:5000/expensetracker/get-allProducts').then((res)=>{
        for(let product of res.data.products){
            showOnScreen(product)
        }
    })

})
function showOnScreen(product){
    let li=document.createElement('li')
    li.innerHTML=`
    ${product.expenseAmount} ${product.description} ${product.category}
    <button class="delete" id="${product.id}">Delete Product</button>
    <button class="edit" amount=${product.expenseAmount} description=${product.description}  category=${product.category} id="${product.id}">Edit Product</button>

    `
    ul.appendChild(li)

}
ul.addEventListener('click',(e)=>{
    // for delete
    if(e.target.classList.contains('delete')){
        let li=e.target.parentElement
        let userid=e.target.getAttribute('id')
        axios.delete(`http://localhost:5000/expensetracker/delete-product/${userid}`).then((res)=>{
            ul.removeChild(li)

        }).catch(err=>{
            console.log(err)
        })
    }
    // for edit
    else if(e.target.classList.contains('edit')){

        Amount.value=e.target.getAttribute('amount')
        Description.value=e.target.getAttribute('description')
        Category.value=e.target.getAttribute('category')
        
        let li=e.target.parentElement
        ul.removeChild(li)
        
         userId=e.target.getAttribute('id')
         editMode=true
    }
})