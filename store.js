if(document.readyState == 'loading')
{
    document.addEventListener('DomContentLoaded',ready)
}
else{
    ready()
}

function ready()
{
    var removeItemCartButton = document.getElementsByClassName('cart-remove-button')
    console.log(removeItemCartButton);
    for(var i=0; i<removeItemCartButton.length;i++){
        var button=removeItemCartButton[i];
        button.addEventListener('click',removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(var i=0;i < quantityInputs.length;i++)
    {
        var input = quantityInputs[i];
        input.addEventListener('change',quantitychanged)
    }
    var addtocart = document.getElementsByClassName('addtocart');
    for(var i=0; i< addtocart.length;i++)
    {
        var button = addtocart[i];  
        button.addEventListener('click',AddToCart)
    }
    document.getElementsByClassName('purchase-button')[0].addEventListener('click',purchase)
}

function purchase()
{
    alert('THANK YOU')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild);
    }
    updatedCartTotal()
}



function AddToCart(event)
{
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title=shopItem.getElementsByClassName('title')[0].innerText;
    var price = shopItem.getElementsByClassName('price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('image')[0].src;
    console.log(title , price , imageSrc);
    addItemToCart(title,price,imageSrc)
    updatedCartTotal()
}

function addItemToCart(title,price,imageSrc)
{
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-rows')
    var cartItems  = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('title');
    for(var i =0; i< cartItemNames.length;i++)
    {
        if(cartItemNames[i].innerText == title)
        {
            alert ('this is already added')
            return 
        }
    }
    var cartRowContent = ` <div class="cart-column-item" >
    <img src="${imageSrc}" alt="" width="100" height="100">
    <h3 class="cart-column-items-title">${title}</h3>
</div>
<div class="cart-column-price">
    <h2 >${price}</h2>
</div>
     
      <div  >
          <input  class="cart-quantity" type="number" value="1" >
          <button type="button" class="cart-remove-button">REMOVE</button>
      </div>
<!-- </div> -->
</div>`
                alert('add to cart')
                cartRow.innerHTML=cartRowContent
                cartItems.append(cartRow);  
                cartRow.getElementsByClassName('cart-remove-button')[0].addEventListener('click',removeCartItem)
                cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantitychanged)
}

function quantitychanged(event)
{
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value=1;
    }
    updatedCartTotal()
}

function removeCartItem(event)
{
    var buttonclicked=event.target;
    buttonclicked.parentElement.parentElement.remove();
   console.log('clicked');
   updatedCartTotal()
}

function updatedCartTotal()
{
           var cartItemContainer=document.getElementsByClassName('cart-items')[0];
            var cartRow=cartItemContainer.getElementsByClassName('cart-rows');
            var Total=0;
            for(var i=0; i<cartRow.length;i++)
            {
                var cartRows = cartRow[i];
                var priceElement = cartRows.getElementsByClassName('cart-column-price')[0];
                var quantityElement = cartRows.getElementsByClassName('cart-quantity')[0];
               var price= parseFloat(priceElement.innerText.replace('$',''));
               var quantity = quantityElement.value
               Total =Total + (price*quantity);
            }
            Total = Math.round(Total)
            document.getElementsByClassName('cart-total-price')[0].innerText = '$'+Total;
}

var content = document.getElementsByTagName('body')[0];

var toggle = document.getElementById('toggle');


toggle.addEventListener('click',()=>{
      toggle.classList.toggle('active')
     content.classList.toggle('night')
})

const btns = document.querySelectorAll('#btn');
console.log(btns);
const section= document.querySelector('.section')
const container = document.getElementById('container');

section.addEventListener('click',(event)=>{
    if(event.target.classList.contains('addtocart')){
        cretaeNotification();
    }
})

function cretaeNotification()
{
    const Notifi = document.createElement('div');
    Notifi.classList.add('toast')
    Notifi.innerText="This is Challange which is crazy";
    
    container.appendChild(Notifi);

    setTimeout(() =>{
        Notifi.remove();
    },3000)
}
const openCartBtn = document.getElementById('openCartBtn')
const close = document.getElementById('close')
const cart = document.querySelector('.cart');

openCartBtn.addEventListener('click',()=>{
    cart.classList.add('active');
})
close.addEventListener('click',()=>{
    cart.classList.remove('active');
})