const sections = document.querySelectorAll('.card');
const nav = document.querySelector("nav");
const backToTopBtn = document.querySelector("#back_to_top");

// CREATE THE NAVIGATION LIST
const ulMenu = document.createElement('ul');
// Add id menu to the ul
ulMenu.setAttribute("id", "menu");
// Add menu to the header nav
nav.append(ulMenu);
// Create content of menu
for (let i = 0; i < sections.length; i++) {
  // Look for the sections - Get the ID of sections
  const sectionId = sections[i].id;
  // Create LI items, add the links and display the title which is in the data-title attribute
  const sectionTitle = sections[i].dataset.title;
  ulMenu.innerHTML += '<li><a href="#' + sectionId + '">' + sectionTitle + '</a></li>';

}


// ADD ACTIVE STATE TO THE MENU ITEM
function makeActive() {
  for (const section of sections) {
    const card = section.getBoundingClientRect();
    if (card.top <= 300 && card.bottom >= 100) {
      const sectionTitle = section.dataset.title;
      const navItem = document.querySelectorAll("#menu li");

      // Check if there is a nav item
      if (navItem !== null) {
        for (let i = 0; i < navItem.length; i++) {
          // and add active class to the nav item if it match with the current visible section or remove if not
          if (navItem[i].textContent == sectionTitle) {
            navItem[i].classList.add("active");
          } else {
            navItem[i].classList.remove("active");
          }
        }
      }
    }
  }
}

// REMOVE ACTIVE STATE TO THE MENU ITEMS
function removeActive() {
  // remove the active class if any of the blog section are visible
  const activeItems = document.querySelectorAll(".active");
  if (activeItems !== null) {
    for (let i = 0; i < activeItems.length; i++) {
      activeItems[i].classList.remove("active");
    }
  }
}

// ALL WE NEED TO UPDATE WHEN WE SCROLL
function updateOnScroll() {
  const header = document.querySelector("header");
  const blogs = document.querySelector('#blog-recents');
  const headerPos = header.getBoundingClientRect();
  const blogsPos = blogs.getBoundingClientRect();

  // Add css class to header to change the bg color when is scrolled
  if (headerPos.y < -100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Add active class to the menu items only if the blog section is visible
  if (blogsPos.top <= 100 && blogsPos.bottom >= 0) {
    makeActive();
  } else {
    removeActive();
  }

  // BACK TO TOP BUTTON
  // viewport height
  var viewportHeight = window.innerHeight;
  if (viewportHeight / 2 < -(headerPos.top)) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
}

// BACK TO TOP
function backToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

// OPEN CLOSE THE MOBILE NAV
function displayMenu() {
  nav.classList.toggle('open');
}

function hideMenu() {
  nav.classList.remove('open');
}

function smoothScroll(e) {
	// e.target is the clicked element
	if(e.target && e.target.nodeName == "A") {
    // remove the native html behavior
    e.preventDefault();
		// get the id of the target element
    const targetId = document.getElementById(e.target.innerHTML.toLowerCase());
		// get the position of the target element related to the browser window
    const bodyPos = document.body.getBoundingClientRect();
    const targetIdPos = targetId.getBoundingClientRect();
    const offset = targetIdPos.top - bodyPos.top;
    window.scroll({
      top: offset,
      left: 0,
      behavior: 'smooth'
    });
	}
};

function clickOnMenuItem(e){
  hideMenu();
  smoothScroll(e);
}


// Scroll to top btn
backToTopBtn.addEventListener("click", backToTop);

// Open the mobile nav
const openMenu = document.querySelector('#open_menu');
openMenu.addEventListener("click", displayMenu);
// Close the mobile nav on click a nav link
const menuItem = document.querySelector('#menu');
menuItem.addEventListener("click", clickOnMenuItem);

// UPDATE ON SCROLL
document.addEventListener('scroll', updateOnScroll);
// UPDATE ON LOAD
updateOnScroll();
