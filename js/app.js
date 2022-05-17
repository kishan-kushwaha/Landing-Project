/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections= document.querySelectorAll('section')
const navigation = document.getElementById('navbar__list')


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


// build the nav
sections.forEach(element => {
  const sectionName = element.getAttribute('data-nav');
  const sectionId = element.getAttribute('id');
  const navElement = `<li class='menu__link ${element.className}' data-link=${sectionId}><a href="#${sectionId}">${sectionName}</li>`
  navigation.insertAdjacentHTML('beforeend', navElement)
})





// Scroll to section on link click
navigation.addEventListener('click', event => {
  event.preventDefault()
  const parent = event.target.hasAttribute('data-link')
    ? event.target
    : event.target.parentElement
  const elementToScrollTo = document.getElementById(parent.dataset.link)
  elementToScrollTo.scrollIntoView({block: 'end', behavior: 'smooth'})
})






// Set sections as active
const activeSession = entries => {
  entries.forEach(entry => {
    const navElement = document.querySelector(
      `.menu__link[data-link='${entry.target.id}']`,
    )
    const section = document.getElementById(entry.target.id)

    if(!(entry && entry.isIntersecting)){
      if (navElement.classList.contains('active')) {
        navElement.classList.remove('active')
      }
    }
    else{
      navElement.classList.add('active')
      section.classList.add('active')
    }

 
  })
}





// choice for the result
const choice = {
  root: null,
  rootMargin: '0px',
  threshold: 0.7,
}



// for make  the nav links are active  we set the result with choice
const result = new IntersectionObserver(activeSession, choice)
sections.forEach(element => {
 result.observe(document.getElementById(element.id))
})
