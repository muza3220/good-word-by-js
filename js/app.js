// selecting ELEMENTS
const elUsersList = selector('.users_list')
const elPostsList = selector('.posts_list')
const elCommentsList = selector('.comments_list')

// selecting TEMPLATES
const elUserTemplate = selector('#users_template').content
const elPostTemplate = selector('#posts_template').content
const elCommentTemplate = selector('#comments_template').content

async function fetchedUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    
    // RUNNING helper function
    renderUsers(data, elUsersList)
}

// PRIMERY FUNCTION
fetchedUsers()


// HELPER FUNCTIONS
function renderUsers(arr, element) {
    element.innerHTML = null

    const usersFragment = document.createDocumentFragment()
    arr.forEach(user => {
        const usersTemplate = elUserTemplate.cloneNode(true)

        const userItem = selector('.user__item', usersTemplate)
        userItem.dataset.userItemId = user.id
        selector('.user__name', usersTemplate).textContent = user.name + ' ' + `(${user.username})`
        selector('.email__space', usersTemplate).textContent = user.email
        selector('.street__space', usersTemplate).textContent = user.address.street
        selector('.suite__space', usersTemplate).textContent = user.address.suite
        selector('.city__space', usersTemplate).textContent = user.address.city
        selector('.zipcode__space', usersTemplate).textContent = user.address.zipcode
        selector('.geo__space', usersTemplate).textContent = 'map'
        selector('.geo__space', usersTemplate).setAttribute('href', 'https://www.google.com/maps/place/' + user.address.geo.lat + ',' + user.address.geo.lng)
        selector('.phone__link', usersTemplate).setAttribute('href', 'tel:' + user.phone)
        selector('.phone__space', usersTemplate).textContent = user.phone
        selector('.website__link', usersTemplate).textContent = user.website
        selector('.website__link', usersTemplate).setAttribute('href', 'https://' + user.website)
        selector('.company__name__space', usersTemplate).textContent = user.company.name
        selector('.company__phrase__space', usersTemplate).textContent = user.company.catchPhrase
        selector('.company__bs__space', usersTemplate).textContent = user.company.bs



        usersFragment.appendChild(usersTemplate)

        userItem.addEventListener('click', evt => {
            const targetItem = evt.target.closest('li')
            elCommentsList.innerHTML = null

           

            // POSTS async function
            async function fetchPosts() {
                elPostsList.innerHTML = null
                const response = await fetch('https://jsonplaceholder.typicode.com/posts')
                const data = await response.json()

                const postsFragment = document.createDocumentFragment()
                data.forEach((post )=> {
                    if(post.userId == targetItem.dataset.userItemId) {
                        const postsTemplate = elPostTemplate.cloneNode(true)
                        const postItem = selector('.post__item', postsTemplate)
                        postItem.dataset.postItemId = post.id
                        selector('.post__title', postsTemplate).textContent = post.title
                        const userName = selector('.post__body', postsTemplate)
                        userName.textContent = post.body

                        postsFragment.appendChild(postsTemplate)
                        
                        postItem.addEventListener('click', evt => {
                            const postItem = evt.target.closest('li')

                            //COMMENTS async function
                            async function fetchComments() {
                                elCommentsList.innerHTML = null
                                const response = await fetch('https://jsonplaceholder.typicode.com/comments')
                                const data = await response.json()
                                
                                //COMMENTS fragment
                                const commentsFragment = document.createDocumentFragment()
                                data.forEach(comment => {
                                    if(comment.postId == postItem.dataset.postItemId) {
                                        const commentsTemplate = elCommentTemplate.cloneNode(true)
                                        selector('.comment__name', commentsTemplate).textContent = comment.name
                                        selector('.comment__body', commentsTemplate).textContent = comment.body
                                        selector('.comment__email', commentsTemplate).textContent = comment.email
                                        selector('.comment__email', commentsTemplate).setAttribute('href', 'https://' + comment.email)

                                        commentsFragment.appendChild(commentsTemplate)
                                    }
                                })
                                elCommentsList.appendChild(commentsFragment)
                            }
                            //COMMENTS async function RUNNING
                            fetchComments()
                        })
                    }
                })
                elPostsList.appendChild(postsFragment)
            }
            // POSTS async function RUNNING
            fetchPosts()
        })
    })
    elUsersList.appendChild(usersFragment)
}
