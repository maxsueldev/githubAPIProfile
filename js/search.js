import { dataRepos, checkNull, divRepos } from './getData.js';

const inputSearch = document.querySelector('.pesquisa');
const filterButton = document.querySelector('.filter-image');
const containerDiv = document.querySelector('.container');
const fadeInDiv = document.querySelector('.fade-in');
const filtersSelectedDiv = document.querySelector('.filtersSelected');
const optionsFiltersSelected = document.querySelector('.filtersSelected .options');
const filtersSelectedClose = document.querySelector('.filtersSelected .close');
const modalClose = document.querySelector('.modalFilter .close');

const checkboxes = document.querySelectorAll('.box input[type="checkbox"]');
let spansFiltersSelected = document.querySelectorAll('.filtersSelected .options span');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        changeCheckbox(checkbox);

        searchRepos(inputSearch.value);
        updateSpansFilter();

        optionsFiltersSelected.children.length ?
            filtersSelectedDiv.classList.add('active') : filtersSelectedDiv.classList.remove('active');
    });
});

function changeCheckbox(checkbox) {
    if (checkbox.checked) {
        optionsFiltersSelected.innerHTML += `<span>${checkbox.name}</span>`;
    } else {
        spansFiltersSelected.forEach(span => {
            if (span.textContent == checkbox.name) optionsFiltersSelected.removeChild(span);
        });
    }
}

function updateSpansFilter() {
    spansFiltersSelected = document.querySelectorAll('.filtersSelected .options span');
}

function setArrayResults(repos, filters, word) {
    if (filters.length == 0) {
        return repos.filter(el => el.name !== null && el.name.toLowerCase().includes(word.toLowerCase()) ||
            el.description !== null && el.description.toLowerCase().includes(word.toLowerCase()) ||
            el.language !== null && el.language.toLowerCase().includes(word.toLowerCase()) ||
            el.homepage !== null && el.homepage.toLowerCase().includes(word.toLowerCase()) ||
            el.linkRepo !== null && el.linkRepo.toLowerCase().includes(word.toLowerCase()));
    } else {
        let stringArrayResults = 'repos.filter(el => ';
        filters.forEach((filter, index) => {
            if (index !== 0) stringArrayResults += ' && ';
            stringArrayResults += `el.${filter} !== null && el.${filter}.toLowerCase().includes(word.toLowerCase())`;
        });
        stringArrayResults += ');';

        return eval(stringArrayResults);
    }
}

function htmlElementRepo(dataRepo) {
    return ` <div class="elementContainer">
                <a href="${dataRepo.linkRepo}" class="linkRepo" target="_blank">
                    <div class="repository">
                        <h1 class="name">${checkNull(dataRepo.name)}</h1>
                        <p class="description">${checkNull(dataRepo.description)}</p>
                        <p class="language">${checkNull(dataRepo.language)}</p>
                        <p class="homepage">${checkNull(dataRepo.homepage)}</p>
                    </div>
                </a>
            </div> `;
}

function searchRepos(word) {
    let arrayResults;
    const filters = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) filters.push(checkbox.name);
    });

    dataRepos.then(repos => {
        arrayResults = setArrayResults(repos, filters, word);

        divRepos.innerHTML = '';

        arrayResults.forEach(element => {
            divRepos.innerHTML += htmlElementRepo(element);
        });
    });
}

filtersSelectedClose.addEventListener('click', () => {
    filtersSelectedDiv.classList.remove('active');

    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    optionsFiltersSelected.innerHTML = '';
    searchRepos(inputSearch.value);
});

inputSearch.addEventListener('keyup', (event) => {
    let wordToSearch = event.target.value;
    searchRepos(wordToSearch);
});

filterButton.addEventListener('click', () => {
    containerDiv.classList.add('modal-active');
});

modalClose.addEventListener('click', () => {
    containerDiv.classList.remove('modal-active');
});

fadeInDiv.addEventListener('click', () => {
    containerDiv.classList.remove('modal-active');
});

