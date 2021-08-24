// CREATE THE NAVIGATION LIST
// Look for the sections - Get the ID of sections
// Create LI items, add the links and display the title which is in the data-title attribute

let section = document.querySelectorAll('.card');

for(let i = 0; i < section.length; i++){

    let sectionId     = section[i].id;
    sectionTitle  = section[i].dataset.title;

    document.getElementById("menu").innerHTML +=  '<li><a href="#'+sectionId+'">'+sectionTitle+'</a></li>';




}



// DISPLAY NAVIGATION ACTIVE STATE

// Add "active" class to the nav element - if the section is in the viewport the nav element need to have the active status

// Get the element, add a click listener...
document.getElementById("menu").addEventListener("click", function(e) {
	// e.target is the clicked element!
	// If it was a link item
	if(e.target && e.target.nodeName == "A") {
		// List item found!  Output the ID!
    console.log(e.target);

    // remove the active class
    const elems = document.querySelectorAll(".active");

    if(elems !==null){
      for(let i = 0; i < elems.length; i++){
        elems[i].classList.remove("active");
      }
    }
    // add the active class to the new navigation item
    e.target.parentNode.className = 'active';

    // Add an active state to the active section content, and reduce the opacity of the others sections
    let activeSection  = e.target.attributes.href.value;
    activeSection = activeSection.substring(1);
    document.getElementById(activeSection).classList.add('active');
	}
});


// SCROLLING ANIMATION
function update() {
  const header = document.querySelector("header");
  const box = header.getBoundingClientRect();
  console.log(box.y);
  if(box.y < -100){
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
document.addEventListener('scroll', update);
update();

// Add smooth scrolling to the page
