
///dummy post to check acces of user
const posts = [
    {
      email: 'dkfaizaan@gmail.com',
      title: 'Post 1'
    },
    {
      username: 'dkfaizaan1@gmail.com',
      title: 'Post 2'
    }
  ]

export const getPost = async (req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.json(posts.filter(post => post.email === req.user.email))
}