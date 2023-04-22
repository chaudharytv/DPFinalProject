/* Get the list element */
let list = document.querySelector("ul");

/* Add an event listener for when a list item is clicked */
list.addEventListener("click", function(event) {
    /* Check if the clicked element is a list item */
    if (event.target.tagName === "LI") {
        /* Change the background color of the clicked element */
        event.target.style.backgroundColor = "#2196f3";
        event.target.style.color = "#fff";
    }
});
