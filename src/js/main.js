const dom = {
    userName: document.querySelector('.searchUser .username'),
    userNameRepos: document.querySelector('.listResult h3 #userNameRepos'),
    btnSearch: document.querySelector('.searchUser .btnSearch'),
    totalOfRepository: document.querySelector('.listResult h3 .countRepos'),
    listContainer: document.querySelector('.listResult .listContainer')
}

function searchRepository(user) {

    axios.get('https://api.github.com/users/' + user + '/repos')
        .then(function(response) {
            var data = response.data;
            showRepository(user, data);
        })
        .catch(function(error) {
            alert('Erro de Busca. \n\Verifique se o nome de usuário esta correto.')
            console.warn('Falha na Requisição. ' + error);
        });
}

dom.btnSearch.onclick = function() {
    //pegando o valor do input e passando como parâmetro da function de busca.
    var userGitHub = dom.userName.value;

    searchRepository(userGitHub);

    dom.userName.value = '';
}

function showRepository(user, list) {

    //começar com o valor inicial da lista vazio.
    dom.listContainer.innerHTML = '';
    dom.totalOfRepository.innerHTML = '';
    dom.userNameRepos.innerHTML = '';
    
    //percorrendo o array da requisição e adicionando o valor em um elemento li.
    for(item of list) {
        var listLink = document.createElement('a');
        listLink.setAttribute('href', 'https://github.com/'+ user + '/' + item.name);

        var listItem = document.createElement('li');
        var listText = document.createTextNode(`${item.name}`);

        
        listItem.appendChild(listText);
        listLink.appendChild(listItem);
        dom.listContainer.appendChild(listLink);
    }

    var userNameRepos = document.createTextNode('de ' + user);
    dom.userNameRepos.appendChild(userNameRepos);   
    
    //exibindo o valor total de repositorios.
    var total = document.createTextNode(list.length);
    dom.totalOfRepository.appendChild(total);
}
