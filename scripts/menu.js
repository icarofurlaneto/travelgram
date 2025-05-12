// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get the profile picture element (last item in the menu)
  const profilePic = document.querySelector('#primary-menu li:last-child img');
  const primaryMenu = document.getElementById('primary-menu');
  
  // Create a hamburger menu icon for mobile
  const hamburgerIcon = document.createElement('div');
  hamburgerIcon.id = 'hamburger-icon';
  hamburgerIcon.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12H21" stroke="#313131" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 6H21" stroke="#313131" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 18H21" stroke="#313131" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  hamburgerIcon.style.display = 'none';
  hamburgerIcon.style.cursor = 'pointer';
  
  // Get the logo element
  const logo = document.querySelector('#logo');
  
  // Insert hamburger icon after the logo and before the primary menu
  const nav = document.querySelector('nav');
  nav.insertBefore(hamburgerIcon, primaryMenu);
  
  // Move the profile picture list item to be next to the hamburger icon in mobile view
  const profilePicLi = document.querySelector('#primary-menu li:last-child');
  
  // Function to adjust the layout for mobile
  function adjustMobileLayout() {
    if (window.innerWidth <= 600) {
      // Create a container for the hamburger and profile pic if it doesn't exist
      let mobileControls = document.getElementById('mobile-controls');
      if (!mobileControls) {
        mobileControls = document.createElement('div');
        mobileControls.id = 'mobile-controls';
        mobileControls.style.display = 'flex';
        mobileControls.style.alignItems = 'center';
        mobileControls.style.gap = '16px';
        nav.appendChild(mobileControls);
      }
      
      // Clear existing content in mobile controls
      while (mobileControls.firstChild) {
        mobileControls.removeChild(mobileControls.firstChild);
      }
      
      // Move hamburger icon to the container
      mobileControls.appendChild(hamburgerIcon);
      
      // Only add the hamburger icon to the mobile controls
      // We don't need the profile picture anymore since it was causing the unwanted dot
      if (!primaryMenu.classList.contains('show')) {
        profilePicLi.style.display = 'none';
      }
    } else {
      // Remove mobile controls if screen is larger
      const mobileControls = document.getElementById('mobile-controls');
      if (mobileControls) {
        nav.insertBefore(hamburgerIcon, primaryMenu);
        mobileControls.remove();
      }
      profilePicLi.style.display = '';
    }
  }
  
  // Function to check screen width and show/hide hamburger icon
  function checkScreenWidth() {
    if (window.innerWidth <= 600) {
      hamburgerIcon.style.display = 'block';
    } else {
      hamburgerIcon.style.display = 'none';
      primaryMenu.classList.remove('show');
      document.body.classList.remove('menu-open');
      
      // Reset profile picture styling when screen is resized
      const profilePicLi = document.querySelector('#primary-menu li:last-child');
      profilePicLi.style.display = '';
      profilePicLi.style.justifyContent = '';
    }
  }
  
  // Toggle menu when hamburger icon is clicked
  hamburgerIcon.addEventListener('click', function() {
    primaryMenu.classList.toggle('show');
    document.body.classList.toggle('menu-open');
    
    // Ensure the profile picture is properly centered when menu is shown
    const profilePicLi = document.querySelector('#primary-menu li:last-child');
    if (primaryMenu.classList.contains('show')) {
      profilePicLi.style.display = 'flex';
      profilePicLi.style.justifyContent = 'center';
      
      // Update mobile controls when menu is shown
      adjustMobileLayout();
    } else {
      profilePicLi.style.display = '';
      profilePicLi.style.justifyContent = '';
      
      // Update mobile controls when menu is hidden
      adjustMobileLayout();
    }
  });
  
  // Toggle menu when profile picture is clicked on mobile
  profilePic.addEventListener('click', function(e) {
    if (window.innerWidth <= 600) {
      e.preventDefault();
      primaryMenu.classList.toggle('show');
      document.body.classList.toggle('menu-open');
      
      // Ensure the profile picture is properly centered when menu is shown
      const profilePicLi = document.querySelector('#primary-menu li:last-child');
      if (primaryMenu.classList.contains('show')) {
        profilePicLi.style.display = 'flex';
        profilePicLi.style.justifyContent = 'center';
        
        // Update mobile controls when menu is shown
        adjustMobileLayout();
      } else {
        profilePicLi.style.display = '';
        profilePicLi.style.justifyContent = '';
        
        // Update mobile controls when menu is hidden
        adjustMobileLayout();
      }
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    // Get the mobile controls container
    const mobileControls = document.getElementById('mobile-controls');
    
    if (
      window.innerWidth <= 600 &&
      primaryMenu.classList.contains('show') &&
      !primaryMenu.contains(e.target) &&
      e.target !== hamburgerIcon &&
      !hamburgerIcon.contains(e.target) &&
      (mobileControls && !mobileControls.contains(e.target))
    ) {
      primaryMenu.classList.remove('show');
      document.body.classList.remove('menu-open');
      
      // Reset profile picture styling
      const profilePicLi = document.querySelector('#primary-menu li:last-child');
      profilePicLi.style.display = '';
      profilePicLi.style.justifyContent = '';
      
      // Update mobile controls when menu is closed
      adjustMobileLayout();
    }
  });
  
  // Check screen width on load and resize
  window.addEventListener('resize', function() {
    checkScreenWidth();
    adjustMobileLayout();
  });
  
  // Initialize
  checkScreenWidth();
  adjustMobileLayout();
});
