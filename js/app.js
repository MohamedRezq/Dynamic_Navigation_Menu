document.addEventListener('DOMContentLoaded', buildNavBar);
document.addEventListener('DOMContentLoaded', ActiveSection);
document.addEventListener('DOMContentLoaded', ActiveNavBar);
document.addEventListener('DOMContentLoaded', linksBar);

// Build the dynamic navigation menu
function buildNavBar (){
	//create a node to contain the un-ordered list element of the links
	let linksList = document.getElementById("navbar__list");
	//create a nodeList having all sections in the page as child nodes of it
	let sectionList = document.querySelectorAll('section');
	for (let i = 0; i < sectionList.length; i++) {
		//Create listItem node
		let listItem = document.createElement('li');
		//create HyperLink node
		let linkToSection = document.createElement('a');
		//Get the link name according to the value of "data-nav" in each section
		let sectionName = sectionList[i].getAttribute('data-nav');
		//let sectionNamePart = sectionName.replace(/\s/g, '').toLowerCase();
		linkToSection.href = "#"+sectionName;
		//linkToSection.setAttribute('href',"#"+sectionName);
		linkToSection.id = "linkNumber"+[i+1];
		//linkToSection.setAttribute('id',"linkNumber" + [i+1]);
		linkToSection.innerText=sectionName;
		//Append the hyperlink element to the listItem element
		listItem.appendChild(linkToSection);
		//Append the listItem element to the un-ordered list element
    linksList.appendChild(listItem);
		//Add Click Event to scroll to the section
		linkToSection.addEventListener("click", function(){
			Scrolling(i+1)
		});
	};
}

// Make the current section (at the top of viewport) active
function ActiveSection (){
    window.addEventListener('scroll', function() {
		// create a nodeList containing all the sections in the page "landing_container"
		let sectionsList = document.getElementsByClassName('landing__container');
		for (let i = 0; i < sectionsList.length; i++) {
			let sectionPosition = sectionsList[i].getBoundingClientRect();
			let sectionOffset = sectionPosition.top;
				if (sectionOffset <= window.innerHeight/2){
					// Specify the active section by the class "your-active-class"
					let activeSection = document.getElementsByClassName("your-active-class");
					//De-activate the not-selected class by removing it from class "your-active-class
					sectionsList[0].className = sectionsList[0].className.replace (" your-active-class", "");
					//Activate the current section by assigning it to class "your-active-class"
					sectionsList[i].className += " your-active-class";
          //Specify the current section
					let currentSection = document.getElementsByClassName("active");
						if (currentSection.length > 0) {
							currentSection[0].className = currentSection[0].className.replace(" active", "");
						}
          //Activate the current link (listItem) according to the currently viewed section
					let links = document.getElementById("navbar__list").querySelectorAll('li');
					links[i].className += " active";
				};
		};
	});
}

// Make the active section's tab active in the navigation bar
function ActiveNavBar (){
	//creaste a nodeList to contain all the links
	let linksList = document.getElementById("navbar__list");
	//Select only the listItems from the linksList
	let linksItems = linksList.querySelectorAll('li');
	for (let i = 0; i < linksItems.length; i++) {
  		linksItems[i].addEventListener("click", function() {
			let currentLink = document.getElementsByClassName("active");
    		if (currentLink.length > 0) {
      			currentLink[0].className = currentLink[0].className.replace(" active", "");
    		}
    	this.className += " active";
 		});
	};
}

// ScrollTo event
function Scrolling (sectionIndex) {
	//get the section element needed
	let section = document.getElementById('section'+sectionIndex);
	//get the offset top of the desired section
	let sectionPosition = section.offsetTop;
	window.scrollTo({
		left: 0,
		top: sectionPosition,
		behavior: 'smooth'
	});
	SmallMenu();
}


// Create Links menu for responsive mode
function linksBar() {
  	var x = document.getElementById("navbar__list");
 	if (x.className === "navbar__menu") {
    	x.className += " responsive";
  	} else {
    	x.className = "navbar__menu";
  	}
}
