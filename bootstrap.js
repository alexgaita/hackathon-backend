const { PORT } = require('./src/utils/constants')

require('./index').app()
    .then(application => {
        application.listen(5001, () => {
            console.log(`App listening on port: 5001`)
        })
    })