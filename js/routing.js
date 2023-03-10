/* 
    Handles all the routing for the site

    Logic:
        Reduce the opacity of the body so page transitions nicely.
        Update the window location which loads new page.
        Reset the opacity on the body of the new page so screen can 
        fade in.

    Global styles required:  
        1.  body.fade-out (portfolio-main.css)       

    Important:
        resetBody() needs to be on every page or if revisiting a page it
        may still have the body faded out and nothing will show up.

    Post Prod Notes:  I forgot about CSS scroll-behaviour: smooth while developing
                      the site, so some of this recreates that functionality in JS.  

                      Also hosting the site on git-hub pages (and not using a custom domain)
                      really messed how the domain urls worked, so there's stuff in the code
                      to deal with that.
*/


// ADDED THIS TO HANDLE URLS FROM ANCHOR LINKS
function routeToUrl(url) {
  //console.log('RouteToUrl(): ', url);

    // Fade out screen
    document.querySelector('body').classList.add('fade');
    
    // // HACK FOR GITHUB PAGES
    // // Fix the URL when deployed on GitHubPages by adding in the repo name.
    // let destination = '';
    // if (location.protocol == "https:") {
    //     destination = '/Portfolio'
    // }       

    // update window location
    setTimeout(() =>{         
        window.location = url;
    },500);    
}



// General function to handle site navigation, either on-page or to a new page.
function handleLinkClick(e) {
  
  e.preventDefault();
 
  let fromMenu = false;
  let link = e.target.href;
  if (!link) {
    link = e.target.parentNode.href;
  }
  if (!link) {
    link = e.target.parentNode.parentNode.href;
    fromMenu = true;
  }
  
  // Figure out if we are staying on the same page or 
  // going to a different page.  This is assuming only the
  // index page has hash tag routing.
  
  const stayOnPage = (link.indexOf('#') > 0) ? true : false;

  if (stayOnPage) {
    const id = link.substring(link.indexOf('#'));
      
    const target = document.querySelector(id);

    // Scroll up or down the page.
    target.scrollIntoView({behavior: "smooth"});
    if (fromMenu) {
      showMenu();
    }    
  }
  else {
    /*  
      input = https://[username].github.io/projects/fte  
      output = projects/fte
    */
    let route = link.substring(link.indexOf('//') + 2);   // strip off the https://
    route = route.substring(route.indexOf('/')+1);      // strip everything up to first slash


    // Navigate with our custom fade transition.
    if (fromMenu) {
      showMenu();
    }
    navigateToPage('link', route);    
  } 

  return false;
}


// Navigate to a new page using a custom fade in/out transition.
function navigateToPage(source, dest) {    
    // Fade out screen
    document.querySelector('body').classList.add('fade');
    
    // HACK FOR GITHUB PAGES
    // Fix the URL when deployed on GitHubPages by adding in the repo name.
    let destination = '';    
    if (location.protocol == "https:" && location.href.includes('github') && !dest.includes('Portfolio')) {
        destination = '/Portfolio'
    }       
    
    const newLocation = `${destination}/${dest}`;    
    setTimeout(() =>{          
      window.location = newLocation;
    },500);    
}

// This needs to be on every page.
function resetBody() {    
    document.querySelector('body').classList.remove('fade');
}


/* 
    FULL SCREEN NAVIGATION MODAL
*/
const navModalData = [
    {
      name: 'Home',
      icon: 'home.svg',
      links: [
        {
          name: 'Home',
          label: '',
          url: '/'
        },
        {
          name: 'About',
          label: '',
          url: '/index.html#about'
        },
        {
          name: 'Projects',
          label: '',
          url: '/index.html#projects'
        },
        {
          name: 'Career',
          label: '',
          url: '/index.html#career'
        },
        {
          name: 'Contact',
          label: '',
          url: '/index.html#contact'
        },
      ]
    },
    {
      name: 'Projects',
      icon: 'map.svg',
      links: [
        {
          name: 'Nightlight',
          label: 'Project 1:',
          url: '/projects/nightlight'
        },
        {
          name: 'Field Time Entry',
          label: 'Project 2:',
          url: '/projects/fte'
        },
        {
          name: 'NAH Website',
          label: 'Project 3:',
          url: '/projects/nah'
        }, 
      ]
    },
    {
      name: 'Career',
      icon: 'briefcase.svg',
      links: [
        {
          name: 'NWM',
          label: 'Career 1:',
          url: '/career/nwm'
        },
        {
          name: 'NAH',
          label: 'Career 2:',
          url: '/career/nah'
        },
        {
          name: 'MJE',
          label: 'Career 3:',
          url: '/career/mje'
        }, 
        {
          name: 'Self',
          label: 'Career 4:',
          url: '/career/self'
        },         
      ]
    },
  ];
  function renderMenuPage(data) {
    
    // dom elements
    let sideBarHtml = `<div class='side-bar'>`; //document.querySelector('.side-bar');
    let itemColumnHtml = `<div class='menu-items-column'>`; //document.querySelector('.menu-items-column');

    iconsHtml = '';
    
    let pause = 50;
    data.map((item) => {
      // Add the icons
      iconsHtml += `<div class='row hidden' style='transition-delay: ${pause}ms'><img src='~/../img/icons/${item.icon}' alt='${item.name}'/><div>${item.name}</div></div>`;
      pause += 50;

      // Loop through the links
      itemsHtml = `<div class='row'>`;
      let delay = 50;
      item.links.map((link) => {
        const label = link.label ?? '';
        const text = link.name ?? '';
        const url = link.url ?? '';

        const labelHtml = `<div class='label'>${label}</div>`;
        const nameHtml = `<div class='name'>${text}</div>`;
        
        itemsHtml += `<a href='${url}' class='hidden' style='transition-delay: ${delay}ms' role="menuitem">
                        <div class='split-container'>
                          ${labelHtml}
                          ${nameHtml}
                        </div>                          
                      </a>
                      <div class='line hidden' style='transition-delay: ${delay}ms' ></div>`;
        
        delay += 50;
      });
      itemsHtml += '</div>';
      itemColumnHtml += itemsHtml;      
    });

    itemColumnHtml += `</div>`;
    sideBarHtml += iconsHtml + `</div>`;  
    
    
    let html = `<section id='site-map' class='menu' role='menu' aria-labelledby='menutoggle'>                
                  <div class='title'>Mountains and Code - Site Map</div>
                  <div class='close-nav' role='button'>X</div>
                  <div class='menu-container'>
                    ${sideBarHtml}
                    ${itemColumnHtml}
                  </div>
                </section>`;

    document.querySelector('.nav-modal').innerHTML = html;

    // Create Event Handlers
    document.querySelector('.close-nav').addEventListener('click', showMenu);
    const links = document.querySelectorAll('.menu-container .row a').forEach((el) =>{
      el.addEventListener('click', (e) => { 
        handleLinkClick(e); 
        showMenu();           // close the menu modal
      });
    });

    // Transition in
    setTimeout(() => {      
      document.querySelectorAll('a.hidden').forEach((el) => {
        el.classList.remove('hidden');
      });
    }, 100);

    setTimeout(() => {      
      document.querySelectorAll('.line.hidden').forEach((el) => {
        el.classList.remove('hidden');
      });
    }, 600);

    setTimeout(() => {      
      document.querySelectorAll('.row.hidden').forEach((el) => {
        el.classList.remove('hidden');
      });
    }, 900);    
  }
  function showMenu() {
    if (document.getElementById('site-map')) {
      document.querySelector('.nav-modal').style.opacity = 0;         // Fade out modal      
      document.querySelector('.nav-menu').classList.add('visible');   // Fade out menu button
      setTimeout(() => {
        document.querySelector('.nav-modal').innerHTML = '';          // Clear the modal
        console.log("modal cleared");  
      }, 500)
      
    }
    else {
      document.querySelector('.nav-modal').style.opacity = 1;         // Fade in modal
      renderMenuPage(navModalData);      
      document.querySelector('.nav-menu').classList.remove('visible');  // Fade out menu button
    }
  }


/* 
    FOOTER
*/

function renderFooter() {  
  let html = '';
  html +=  `<a href='/'>            
              <div class='mountains'>Mountains</div>
              <div class='andcode'>and code</div>            
            </a>`;
  
  const footer = document.querySelector('footer');
  if (footer) {        
    footer.innerHTML = html;
  }

  setTimeout(() => {
      // Wire up the home link button
      const headerHome = document.querySelector('footer a');
      headerHome.addEventListener('click', handleLinkClick);
  }, 10);  
}      
