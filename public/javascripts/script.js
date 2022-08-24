const modalAdd = document.querySelector('.modal');
const modalEdit = [...document.querySelectorAll('.modal2')];
const modalDel = [...document.querySelectorAll('.modal3')]
const overlay = document.querySelector('.overlay');
const overlay2 = [...document.querySelectorAll('.overlay2')];
const overlay3 = [...document.querySelectorAll('.overlay3')]
const addMovieBtn = document.querySelector('.addmovie')
const closeModalBtn = document.querySelector('.close-modal');
const closeModalBtn2 = [...document.querySelectorAll('.close-modal2')];
const closeModalBtn3 = [...document.querySelectorAll('.close-modal3')]
const edit = [...document.querySelectorAll('.editBtn')];
const del = [...document.querySelectorAll('.delBtn')];
const delNo = [...document.querySelectorAll('.delNo')];

addMovieBtn.addEventListener('click', () => {
    modalAdd.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

edit.map((el, i) => {
    el.addEventListener('click', () => {
        modalEdit[i].classList.remove('hidden');
        overlay2[i].classList.remove('hidden');
    })
});

del.map((el, i) => {
    el.addEventListener('click', () => {
        modalDel[i].classList.remove('hidden');
        overlay3[i].classList.remove('hidden');
    });
});

closeModalBtn.addEventListener('click', () => {
    modalAdd.classList.add('hidden');
    overlay.classList.add('hidden');
});

closeModalBtn2.map((el, i) => {
    el.addEventListener('click', () => {
        modalEdit[i].classList.add('hidden');
        overlay2[i].classList.add('hidden');
    });
});

closeModalBtn3.map((el, i) => {
    el.addEventListener('click', () => {
        modalDel[i].classList.add('hidden');
        overlay3[i].classList.add('hidden');
    });
});

overlay.addEventListener('click', () => {
    modalAdd.classList.add('hidden');
    overlay.classList.add('hidden');
});

overlay2.map((el, i) => {
    el.addEventListener('click', () => {
        modalEdit[i].classList.add('hidden');
        overlay2[i].classList.add('hidden');
    });
});

overlay3.map((el, i) => {
    el.addEventListener('click', () => {
        modalDel[i].classList.add('hidden');
        overlay3[i].classList.add('hidden');
    });
});

delNo.map((el, i) => {
    el.addEventListener('click', () => {
        modalDel[i].classList.add('hidden');
        overlay3[i].classList.add('hidden');
    });
});
