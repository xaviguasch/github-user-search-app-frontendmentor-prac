const form = document.querySelector('#form')
const search = document.querySelector('#search')
const card = document.querySelector('.card')
const footer = document.querySelector('.footer')
const errorMsg = document.querySelector('.error-message')

let avatar = document.querySelector('#avatar')
let fullName = document.querySelector('.full-name')
let githubHandle = document.querySelector('.github-handle')
let date = document.querySelector('.date')
let biography = document.querySelector('.bio')
let reposSel = document.querySelector('#repos')
let followersSel = document.querySelector('#followers')
let followingSel = document.querySelector('#following')
let locationOrPlace = document.querySelector('#location')
let blogSel = document.querySelector('#blog')
let twitterSel = document.querySelector('#twitter')
let companySel = document.querySelector('#company')

const showError = (error) => {
  search.textContent = ''
  errorMsg.classList.add('show')
  card.classList.add('hidden')
  footer.classList.add('hidden')
}

async function getData(user) {
  const API = 'https://api.github.com/users/'

  const request = await fetch(API + user)

  if (!request.ok) {
    throw new Error(request.status)
  } else {
    const data = await request.json()
    return data
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
  let {
    login,
    name,
    avatar_url,
    created_at,
    bio,
    public_repos,
    followers,
    following,
    location,
    blog,
    twitter_username,
    company,
  } = data

  card.classList.remove('hidden')
  footer.classList.remove('hidden')
  errorMsg.classList.remove('show')

  fullName.textContent = login
  githubHandle.textContent = name ? `@${name}` : 'not available'
  avatar.src = avatar_url

  date.textContent = fromISOStringToLongDate(created_at)
  biography.textContent = bio ? bio : 'Bio not available'
  reposSel.textContent = public_repos
  followersSel.textContent = followers
  followingSel.textContent = following

  if (!location) {
    locationOrPlace.textContent = 'Not available'
    locationOrPlace.parentElement.style.opacity = 0.5
  } else {
    locationOrPlace.textContent = location
    locationOrPlace.parentElement.style.opacity = 1
  }

  if (!blog) {
    blogSel.textContent = 'Not available'
    blogSel.parentElement.style.opacity = 0.5
  } else {
    blogSel.textContent = blog
    blogSel.href = blog
    blogSel.parentElement.style.opacity = 1
  }

  if (!twitter_username) {
    twitterSel.parentElement.style.opacity = 0.5
    twitterSel.textContent = 'Not available'
  } else {
    twitterSel.textContent = twitter_username
    twitterSel.parentElement.style.opacity = 1
    twitterSel.href = `https://twitter.com/${twitter_username}`
  }

  if (!company) {
    companySel.parentElement.style.opacity = 0.5
    companySel.textContent = 'Not available'
  } else {
    companySel.textContent = `@${company}`
    companySel.parentElement.style.opacity = 1
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const username = search.value

  getData(username)
    .then((data) => fillCardWithData(data))
    .catch((err) => showError(err))
})

// Removes error message when you focus on the input
search.addEventListener('focus', () => errorMsg.classList.remove('show'))
