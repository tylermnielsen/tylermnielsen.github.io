/*jshint multistr: true */
/*jshint esversion: 6 */

//get a div with class header and contents of title
const header = document.getElementById("header");

let page = header.innerHTML.trim();
let title = page.substring(0,page.lastIndexOf(" "));
let filename = page.substring(page.lastIndexOf(" ")+1);


header.innerHTML = `<h1><a href="index.html" style="text-decoration: none;">[|]</a> ${title}</h1> \
<nav>\
    <ul>\
        <li><a href="index.html" id="index">Home</a></li>\
        <li><a href="vpvideos.html" id="vpvideos">Generative Art</a></li>\
    </ul> \
</nav>`;

document.getElementById(filename).classList.add("active");


//get a div with class footer
const footer = document.getElementById("footer");

footer.innerHTML = '<div id="links"> \
<a href="https://github.com/SnailDragon"><img src="images/githublogo3.png" width="auto" height="30px"></a> \
<a href="https://www.youtube.com/channel/UCkOzZfpniwkD6r1oWffYNcg" target="_blank"><img src="images/youtube.png" width="auto" height="30px"></a> \
<a href="https://www.linkedin.com/in/tyler-nielsen-296826228" target="_blank"><img src="images/linkedin.png" width="auto" height="30px"></a> \
<a href="https://leetcode.com/tylernielsenn/" target="_blank"><img src="images/leetcode.png" width="auto" height="30px"></a> \
</div> \
\
<br> \
Updated 2022 ';
