async function getPokemon(search) {
    let pokeData
    if (typeof (search) === 'string')
        pokeData = await axios.get(`http://localhost:8080/pokemon/query?name=${search}`)
    else if (typeof (search) === 'number')
        pokeData = await axios.get(`http://localhost:8080/pokemon/get/${search}`)
    pokeImg.src = pokeData.data.front_pic
    pokeID.innerText = pokeData.data.id
    pokeName.innerText = pokeData.data.name
    pokeHeight.innerText = pokeData.data.height * 10 + 'cm'
    pokeWeight.innerText = pokeData.data.weight / 10 + 'kg'
    pokeImg.addEventListener('mouseover', () => { pokeImg.src = pokeData.data.back_pic })
    pokeImg.addEventListener('mouseout', () => { pokeImg.src = pokeData.data.front_pic })
    for (let type of pokeData.data.types) {
        addListElement(type.type.name)
        // pokeTypes.lastChild.addEventListener('click', getListByType)
    }
}
async function findPokemon(search) {
    try {
        const pokeData = await axios.get(`http://localhost:8080/pokemon/get/${search}`)
        getPokemon(pokeData.data.id)
    } catch (error) {
        alert(error)
    }
}

function addListElement(string) {
    const typeElement = document.createElement('li')
    typeElement.innerText = string
    pokeTypes.append(typeElement)
}
searchButton.addEventListener('click', () => getPokemon(search.value))
loginButton.addEventListener('click', async () => {
    if (login.value === '') return
    try {
        const username = await axios.post(`http://localhost:8080/user/${login.value}/info`)
        userName.innerText = username.data.username
    }
    catch (err) {
        alert(err)
    }
})
catchButton.addEventListener('click', async () => {
    try {
        const response = await axios.put(`http://localhost:8080/pokemon/catch/${pokeID.innerText}`, {}, { headers: { username: userName.innerText } })
        if (response.data)
            alert('pokemon caught!')
    }
    catch (error) {
        console.error(error);
    }
})
releaseButton.addEventListener('click', async () => {
    try {
        const response = await axios.delete(`http://localhost:8080/pokemon/release/${pokeID.innerText}`, {}, { headers: { username: userName.innerText } })
        if (response.data)
            alert('pokemon relaesed!')
    }
    catch (error) {
        console.error(error);
    }
})
caughtPokemon.addEventListener('click', async () => {
    try {
        const response = await axios.get(`http://localhost:8080/pokemon/`, { headers: { username: userName.innerText } })
        response.data.forEach(pokemonObj => {
            const pokemonElement = document.createElement('li')
            pokemonElement.innerText = pokemonObj.name
            pokemonList.append(pokemonElement)
        });
    }
    catch (error) {
        console.error(error);
    }
})
