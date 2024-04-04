import fastify from "fastify";

const app = fastify()

app.post('/events', () => {
    
})

app.listen({port: 3333}).then(r => {
    console.log('HTTP server running...')
})
