import fastify from "fastify";

const app = fastify()

app.get('/', () => {
    return 'Hello NLW Unite'
})

app.get('/test', () => {
    return 'Test NLW Unite'
})
app.listen({port: 3333}).then(r => {
    console.log('HTTP server running...')
})