const main = document.getElementById('window')
const pages = document.getElementById("git-pages")
const draw = (avatars, username, name) => {
    if (!name) { name = username }
    main.innerHTML = `<a href="https://github.com/${username}" class="profile" target="_blank">
    <img src="${avatars}" alt="">
    <div class="s-profile">
        <h1>${name}</h1>
        <p>${username}</p>
    </div>
</a>`
}


const find = async (username) => {
    main.innerHTML = ` <div class="profile .loading"><div class="con-loader"><div class="loader"></div></div></div>`
    try {
        let userData = await fetch(`https://api.github.com/users/${username}`)
        userData = await userData.json()
        console.log(userData)
        draw(userData.avatar_url, userData.login, userData.name)
        document.getElementById('git-pages').value = ""
    } catch (err) {
        console.error(err)
        window.alert(err)
        main.innerHTML = ""
    }
}

document.querySelector('form').addEventListener("submit", (ev) => {
    ev.preventDefault()
    url = pages.value
    githubUsername = url.split('/')[2].split('.')[0]
    find(githubUsername)
})