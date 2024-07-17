(function() {
  function setCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + days*24*60*60*1000); // days * hours * minutes * seconds * milliseconds
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
  }
  
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  document.getElementById('close-sub-btn').addEventListener('click', function() {
    // Get the current interval from the cookie, default to 7 days if not set
    let interval = getCookie('hideRedSubInterval');
    if (!interval) {
      interval = 1; // initial interval of 1 days
    } else {
      interval = parseInt(interval);
    }
    
    if (interval > 28) {
      // If the interval is greater than 28 days, set it to 1 year
      interval = 180;
    }

    // Set a cookie to hide the red block for the current interval
    setCookie('hideRedSubBlock', 'true', interval);
    
    // Add one week to the interval
    var newInterval = interval + 7;
    setCookie('hideRedSubInterval', newInterval, newInterval);
  
    // Add the hide class to trigger the slide-up animation
    const redBlock = document.getElementById('red-sub-block');
    redBlock.classList.add('transition', 'transform', 'duration-500', '-translate-y-full', 'opacity-0');
  
    // Hide the red block after the animation duration
    setTimeout(function() {
      redBlock.style.display = 'none';
    }, 500); // Match this to the duration of the animation
  });
  
  // Check if the cookie is set, and hide the red block if it is
  if (getCookie('hideRedSubBlock')) {
    document.getElementById('red-sub-block').style.display = 'none';
  }

  // when docuemnt ready
  document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('open-sub-btn');

    openBtn.addEventListener('click', function() {
      const subPopup = document.querySelector('.subscribe-popup');
      subPopup.classList.remove('hidden');
    });
  })
  
})();
