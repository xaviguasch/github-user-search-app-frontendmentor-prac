const form = document.querySelector('#form')
const search = document.querySelector('#search')

let avatar = document.querySelector('#avatar')
let fullName = document.querySelector('.full-name')
let githubHandle = document.querySelector('.github-handle')
let date = document.querySelector('.date')
let bio = document.querySelector('.bio')
let repos = document.querySelector('#repos')
let followers = document.querySelector('#followers')
let following = document.querySelector('#following')
let locationOrPlace = document.querySelector('#location')
let blog = document.querySelector('#blog')
let twitter = document.querySelector('#twitter')
let company = document.querySelector('#company')

const showError = (error) => {
  console.log('do something with this errror: ', error)
}

async function getData(user) {
  const API = 'https://api.github.com/users/'

  try {
    const request = await fetch(API + user)
    if (!request.ok) {
      throw new Error(request.status)
    }
    const data = await request.json()
    return data
  } catch (error) {
    showError(error.message)
  }
}

const fromISOStringToLongDate = (date) => {
  let d = new Date(date)

  let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
  let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

  return `${day} ${month} ${year}`
}

const fillCardWithData = (data) => {
  fullName.textContent = data.login
  githubHandle.textContent = data.name
  avatar.src = data.avatar_url

  date.textContent = fromISOStringToLongDate(data.created_at)
  bio.textContent = data.bio
  repos.textContent = data.public_repos
  followers.textContent = data.followers
  following.textContent = data.following
  locationOrPlace.textContent = data.location
  blog.textContent = data.blog
  blog.href = data.blog
  twitter.textContent = data.twitter_username // implement greying out if there's no data
  company.textContent = `@${data.company}`
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const username = search.value

  getData(username).then((data) => fillCardWithData(data))
})
