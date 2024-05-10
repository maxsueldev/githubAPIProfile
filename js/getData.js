const apiGitHub = 'https://api.github.com/users/';
const user = 'maxsueldev';

const profileImage = document.querySelector('.perfil img');
const profileName = document.querySelector('.perfil .name');
const profileBio = document.querySelector('.perfil .bio');
const profileLocation = document.querySelector('.perfil .location');
const profileFollowers = document.querySelector('.followers');
const profileFollowing = document.querySelector('.following');
const linkPerfil = document.querySelector('.linkPerfil');
const qtdRepos = document.querySelector('.qtdRepos');
const login = document.querySelector('.login');
const twitter = document.querySelector('.twitter');

const divRepos = document.querySelector('.repos');

async function getDataUser() {
    const response = await fetch(apiGitHub + user);
    return response.json();
}

getDataUser().then(data => {
    const dataUser = setDataUser(data);
    renderDataUser(dataUser);
})

async function getDataRepos() {
    const response = await fetch(apiGitHub + user + '/repos');
    return response.json();
}

const dataRepos = getDataRepos().then(data => {
    const arrayRepos = [];
    data.forEach(element => {
        divRepos.innerHTML += htmlElementRepo(element); 
        arrayRepos.push(objectElementRepo(element));
    });
    return arrayRepos;
});

function setDataUser(data) {
    return {
        login: data.login,
        name: data.name,
        bio: data.bio,
        location: data.location,
        photo: data.avatar_url,
        followers: data.followers,
        following: data.following,
        link: data.html_url,
        qtdPublicRepos: data.public_repos,
        twitter: data.twitter_username
    };
}

function renderDataUser(dataUser) {
    document.title += ' ' + dataUser.name;
    profileImage.src = dataUser.photo;
    profileName.textContent = dataUser.name;
    profileBio.textContent = dataUser.bio;
    profileLocation.textContent = dataUser.location;
    profileFollowers.textContent = dataUser.followers;
    profileFollowing.textContent = dataUser.following;
    linkPerfil.href = dataUser.link,
    qtdRepos.textContent = dataUser.qtdPublicRepos;
    login.textContent = dataUser.login;
    twitter.textContent = dataUser.twitter;
}

const checkNull = function(value) {
    return value === null ? '' : value;
}

function htmlElementRepo(repoData) {
    return ` <div class="elementContainer">
                <a href="${repoData.html_url}" class="linkRepo" target="_blank">
                    <div class="repository">
                        <h1 class="name">${checkNull(repoData.name)}</h1>
                        <p class="description">${checkNull(repoData.description)}</p>
                        <p class="language">${checkNull(repoData.language)}</p>
                        <p class="homepage">${checkNull(repoData.homepage)}</p>
                    </div>
                </a>
            </div> `
}

function objectElementRepo(element) {
    return {
        name: element.name,
        description: element.description,
        language: element.language,
        homepage: element.homepage,
        linkRepo: element.html_url
    }
}

export { dataRepos, checkNull, divRepos };