const { Router } = require('express');
const router = Router();

// Page d'accueil
router.get('/', (request, response) => {
    response.send('Hello And Welcome To The Project Apihour GraphQL !');
});


module.exports = router;