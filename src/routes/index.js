const HandlerHttp = require('./handlerHttp')

module.exports = (router) => {
  // Post router
  const {
    HandlerCreateLawer,
    HandlerGetLawers,
    HandlerGetLawerById,
    HandlerUpdateLawer,
    HandlerDeleteLawer,
  } = new HandlerHttp()

  // Route Post With Authorization
  router.delete('/api/deleteLawer/:id', HandlerDeleteLawer)
  router.put('/api/updateLawer/:id', HandlerUpdateLawer)
  router.get('/api/getLawerById/:id', HandlerGetLawerById)
  router.get('/api/getLawers', HandlerGetLawers)
  router.post('/api/createLawer', HandlerCreateLawer)
}
