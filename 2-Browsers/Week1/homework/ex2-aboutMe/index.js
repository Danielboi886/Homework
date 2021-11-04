'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/2-Browsers/Week1#exercise-2-about-me

1. Using JavaScript, change the body tag's style so it has a font-family of 
   "Arial, sans-serif".
2. Using JavaScript, replace each of the spans (`nickname`, fav-food`, 
   `hometown`) with your own information.
3. In JavaScript, iterate through each `<li>` and change the class to 
   `list-item`.
------------------------------------------------------------------------------*/

document.body.style.fontFamily = 'Arial, sans-serif';
document.querySelector('#nickname').textContent = 'Dannyboi';
document.querySelector('#fav-food').textContent = 'Pineapple';
document.querySelector('#hometown').textContent = 'ChungKing';
const li = document.getElementsByTagName('li');
console.log(li);
for (let i = 0; i < li.length; i++) {
  li[i].classList.add('list-item');
}
