(function() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC

  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
  
  let isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark)
  {
    // Show dark icon
    themeToggleLightIcon.classList.remove('hidden');
    themeToggleDarkIcon.classList.add('hidden');
    document.documentElement.classList.add('dark');
  } else {
    themeToggleLightIcon.classList.add('hidden');
    themeToggleDarkIcon.classList.remove('hidden');
    
    document.documentElement.classList.remove('dark');
  }

  // Listen for toggle button click
  themeToggleBtn.addEventListener('click', toggleMode);

  function toggleMode() {
    // Toggle icon
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // If is set in localstorage
    if (localStorage.getItem('theme')) {
      // If light, make dark and save in localstorage
      if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } else {
      // If not in localstorage
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    }
  }

  // const navbarMenuToggle = document.getElementById('navbar-menu-toggle');
  // const navbarMenu = document.getElementById('navbar-menu');
  // const navbarLangToggle = document.getElementById('navbar-lang-toggle');
  // const navbarLang = document.getElementById('navbar-lang');

  // document.addEventListener('click', function (event) {
  //   const target = event.target;
  //   if (navbarMenuToggle.contains(target)) {
  //     navbarLang && navbarLang.classList.add('hidden');
  //     navbarMenu && navbarMenu.classList.toggle('hidden');
  //   } else if (navbarLangToggle.contains(target)) {
  //     navbarMenu && navbarMenu.classList.add('hidden');
  //     navbarLang && navbarLang.classList.toggle('hidden');
  //   } else {
  //     navbarMenu && navbarMenu.classList.add('hidden');
  //     navbarLang && navbarLang.classList.add('hidden');
  //   }
  // });
})();
