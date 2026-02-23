
1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans: Difference between getElementById, getElementsByClassName, querySelector, and querySelectorAll:

* getElementById() → selects one element by its id. It returns a single element and is very fast.

* getElementsByClassName() → selects all elements with a given class name. It returns a live 
  HTMLCollection (updates automatically if DOM changes).

* querySelector() → returns first matching element using CSS selector.

* querySelectorAll() → returns all matching elements (static NodeList).



2. How do you create and insert a new element into the DOM?

Ans: To create and insert a new element into the DOM, you follow three steps:

* Create the element using document.createElement().

* Add content or attributes (like text, class, id).

* Insert the element into the DOM using methods like appendChild() or append().

Example:
const p = document.createElement("p"); // create
p.innerText = "Hello World";           // add content
document.body.appendChild(p);          // insert

This will create a new <p> element and add it to the webpage.



3. What is Event Bubbling? And how does it work?

Ans: Event Bubbling is a process where an event that happens on a child element automatically propagates upward through its parent elements.

How it works:
When you click a nested element, the event first runs on the target element, then moves step by step to its parent, then to higher ancestors (like body and document).

Order example:
child → parent → body → document

Example:
child.addEventListener("click", () => {
  console.log("Child clicked");
});

parent.addEventListener("click", () => {
  console.log("Parent clicked");
});

If the child is clicked, both messages appear because the event bubbles up to the parent.



4. What is Event Delegation in JavaScript? Why is it useful?

Ans: Event Delegation is a technique where you attach a single event listener to a parent element to handle events for its child elements using event bubbling.

Instead of adding separate listeners to many child elements, the parent listens for the event and checks which child triggered it.

Why it is useful:
* Improves performance (fewer event listeners);
* Reduces code repetition;
* Works for dynamically added elements;
* Makes code cleaner and easier to manage;

Example:
document.getElementById("parent").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    console.log("Button clicked");
  }
});

Here, one listener on the parent handles clicks for all .btn children.



5. What is the difference between preventDefault() and stopPropagation() methods?

Ans: The two methods are used to control event behavior, but they do different things.

* preventDefault() stops the browser’s default action.
Example: prevents form submission or link navigation.

* stopPropagation() stops the event from bubbling up to parent elements.

In short:
* preventDefault() → stops default browser behavior

* stopPropagation() → stops event bubbling

Example:
link.addEventListener("click", (e) => {
  e.preventDefault();     // link will not navigate
  e.stopPropagation();    // event will not bubble to parent
});











