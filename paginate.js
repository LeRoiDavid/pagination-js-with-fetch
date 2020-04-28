let data
let albums = [];
const size = 50
const itemPerPage = 8
let currentPage = 0
let pages

let row = document.querySelector('.paginate')
let pagination_menu = document.querySelector('.pagination_menu')


fetch('https://jsonplaceholder.typicode.com/photos')
  .then(response => response.json())
  .then(json => { createDiv(json)})

class Album{
    constructor(albumId, id, title, url, thumbnailUrl){
        this.albumId = albumId;
        this.id = id;
        this.title = title;
        this.url = url;
        this.thumbnailUrl = thumbnailUrl
    }
}

var createDiv = function(json) {
    let html = ''
    for(let i = 0; i < size; i++){
        albums.push(new Album(json[i].albumId, json[i].id, json[i].title, json[i].url, json[i].thumbnailUrl))
    }
    albums.forEach((album) => {
        html += `<div class="col-md-3 col-sm-4 hide"><img src="${album.url}" width="90%" alt="" srcset=""><p>${album.title}</p></div>`
    })
    row.innerHTML = html

    createPaginationMenu()
}

var createPaginationMenu = function(){
    pages = Math.ceil(size / itemPerPage -1)
    let li = ''
    for(let i = 0; i <= pages; i++){
        li += `<li class="page-item "><a class="page-link nav-index">${i}</a></li>`
    }
    let html = `
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item"><a class="page-link prev" href="#">Previous</a></li>
            ${li}
            <li class="page-item"><a class="page-link next" href="#">Next</a></li>
        </ul>
    </nav>
    `
    pagination_menu.innerHTML = html

    let prev = document.querySelector('.prev')
    prev.addEventListener('click', goToPrevious)
    let next = document.querySelector('.next')
    next.addEventListener('click', gonToNextPage)
    displayPage(currentPage)
    let nav_index = document.querySelectorAll('.nav-index')
    nav_index.forEach((index) => {
        document.addEventListener('click', onSelectIndex)
    })
}

let displayPage = function(indexPage){
   
    let divs = row.children
    let maxIndex = indexPage * itemPerPage 
    let divVisible = document.querySelectorAll('.visible')

    if(divVisible.length > 1){
        for (let i = 0; i < divVisible.length; i++) {
            const element = divVisible[i];
            element.classList.remove('visible')
        }
    }

    for (let index = maxIndex; index < (maxIndex + itemPerPage); index++) {

        if(index  < divs.length + 2){
            console.log(index)
            const element = divs[index];
            element.classList.add('visible')
        }
    }
}

let onSelectIndex = function(e){
    let pageNumber = parseInt(e.target.textContent, 10)
    if(pageNumber == currentPage) return
    currentPage = pageNumber
    let active = document.querySelector('.active')
    if(active){
        active.classList.remove('active')
    }
    e.target.parentNode.classList.add('active')
    displayPage(pageNumber)
}

let goToPrevious = function(){
    if(currentPage > 0) {
        currentPage--
        displayPage(currentPage)
        
    } 
}
let gonToNextPage = function(){
    if(currentPage < pages) displayPage(currentPage++)
}
