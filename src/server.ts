import fastify from "fastify";
import {z} from "zod";
import {PrismaClient} from "@prisma/client";

const app = fastify()
const prisma = new PrismaClient({
    log: ['query'],
})

app.get('/', (request, reply) => {
    console.log('🚀 - Hello NLW Unite - 🚀')

    return '🚀 - Hello NLW Unite - 🚀'
})

app.post('/events', async (request, reply) => {
    console.log(`✅ - Received. >> ${JSON.stringify(request.body)}`)
    const createEventSchema = z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable()
    })

    console.log('✅ - New event received.')

    const data = createEventSchema.parse(request.body)

    const event = await prisma.events.create({
        data: {
            title: data.title,
            details: data.details,
            maximumAttendees: data.maximumAttendees,
            slug: data.title.toString().toLowerCase().trimStart().trimEnd().replace(/\s+/g, '-')
        }
    })

    return `✅ - New event created >> ${reply.status(201).send({eventId: event.id})}`
})

app.listen({port: 3333}).then(r => {
    console.log('HTTP server running...')
})
