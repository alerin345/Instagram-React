window.addEventListener('load', () =>{
  let isModalOpen = false;
  let modal = document.querySelector('.modal');
  let btn = document.querySelector('.options');
  let form = document.querySelector('.likes')
  let btnOut = document.querySelector('.btnOut');
  btn.addEventListener('click', (e) => {
    modal.style.display = "block";
  });
  btnOut.addEventListener('click', (e) => {
    modal.style.display = "none";
  });
})
