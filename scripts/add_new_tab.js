// find links with target="_blank" and add icon to them

links = document.querySelectorAll('a:not([target])');

links.forEach(link => { 
  // add icon 
  link.innerHTML += ' [↗]'; 
});