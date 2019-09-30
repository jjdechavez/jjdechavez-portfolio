import jump from 'https://cdnjs.cloudflare.com/ajax/libs/jump.js/1.0.2/jump.min.js';

const project = document.querySelector('.project');
const landing = document.querySelector('.landing');
const btnScrollDown = document.querySelector('.scroll-down');
const btnUpArrow = document.querySelector('.up-arrow');

sal({
  once: false,
});

btnScrollDown.addEventListener('click', () => {
  jump(project, {
    duration: 1800,
    offset: 0,
    callback: undefined,
    a11y: false 
  });
});

btnUpArrow.addEventListener('click', () => {
  jump(landing, {
    duration: 1800,
    offset: 0,
    callback: undefined,
    a11y: false 
  });
});