// Initialize a variable to keep track of the total cart value
let all_total = 0;

// Function to add an item to the cart
function addToCart(element){

    // Find the parent element for the item being added
    let main_element = element.closest(".single-item");

    // Extract the price, name, and quantity of the item being added
    let price = main_element.querySelector(".price").innerText;
    let name = main_element.querySelector("h3").innerText;
    let quantity = main_element.querySelector("input").value;

    // Find the cart items container
    let cart_items = document.querySelector(".cart-items");

    // Check if the selected quantity is valid
    if(parseInt(quantity) > 0){

        // Remove the dollar sign from the price and calculate the total cost of the item
        price = price.substring(1);
        let total = parseInt(price) * parseInt(quantity);

        // Add the item to the cart items container
        cart_items.innerHTML += `<div class="card-single-item">
                                    <h3>${name}</h3>
                                    <p>$${price} x ${quantity} = $<span>${total}<span></p>
                                    <button class="remove-item" onclick="removeFromCart(this)">Remove</button>
                                `;

        // Update the total cart value and disable the "Add to Cart" button for the item
        all_total += total; 
        document.querySelector(".total").innerText = `Total: $${all_total}`;
        element.innerHTML = "Added";
        element.setAttribute("disabled", "true");

    } else{
        // Display an error message if the selected quantity is not valid
        alert("Select a quantity");
    }
}

// Function to remove an item from the cart
function removeFromCart(element){

    // Find the parent element for the item being removed
    let main_element = element.closest(".card-single-item");

    // Extract the price and name of the item being removed
    let price = main_element.querySelector("p span").innerText;
    let name = main_element.querySelector("h3").innerText;

    // Find all of the items that can be added to the cart
    let items = document.querySelectorAll(".single-item");

    // Subtract the cost of the item being removed from the total cart value
    all_total -= parseInt(price); 
    document.querySelector(".total").innerText = `Total: $${all_total}`;
    
    // Remove the item from the cart items container
    main_element.remove();

    // Enable the "Add to Cart" button for the corresponding item and reset its quantity to zero
    items.forEach(function (itm) {
        let item_name = itm.querySelector(".si-content h3").innerText;
        
        if(item_name == name){
            itm.querySelector(".actions input").value = 0
            itm.querySelector(".actions button").removeAttribute("disabled")
            itm.querySelector(".actions button").innerText = "Add"
        }
    })
}
