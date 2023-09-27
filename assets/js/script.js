"use strict";




let addBtns = document.querySelectorAll("#products .card-body a");

let basket = [];

if (localStorage.getItem("basket") != null) {
    basket = JSON.parse(localStorage.getItem("basket"))
} else {
    document.querySelector(".basket .count").classList.add("d-none")
}

if(basket.length == 0){
    document.querySelector(".basket .count").classList.add("d-none");
}

function basketCount() {
    let basketCount = 0;
    for (const item of basket) {
        basketCount += item.count;
    }
    return basketCount;
}

document.querySelector(".basket .count span").innerText = basketCount();

addBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {

        e.preventDefault();

        let productName = this.parentNode.firstElementChild.innerText;
        let productDescription = this.parentNode.firstElementChild.nextElementSibling.innerText;
        let productImage = this.parentNode.previousElementSibling.getAttribute("src");
        let productId = parseInt(this.parentNode.getAttribute("data-id"));
        let productPrice = parseFloat(this.nextElementSibling.innerText.split(" ")[0]);
      

        let existProduct = basket.find(m => m.id == productId);

        if (existProduct != undefined) {
            existProduct.count++;
        } else {

            basket.push({
                id: productId,
                name: productName,
                description: productDescription,
                image: productImage,
                price:productPrice,
                count: 1
            })
        }

        localStorage.setItem("basket", JSON.stringify(basket));
    
        document.querySelector(".basket .count span").innerText = basketCount();
        document.querySelector(".basket .count").classList.remove("d-none");
   

    })
});







