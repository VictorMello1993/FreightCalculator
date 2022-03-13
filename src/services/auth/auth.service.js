export const authenticatedUser = (values) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Autenticando')
      resolve();
    }, 3000)
  })
}