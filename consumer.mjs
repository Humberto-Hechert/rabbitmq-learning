import amqp from 'amqplib';

async function main() {
    const connection = await amqp.connect({
        host: 'localhost',
        port: 5672,
        username: 'admin',
        password: 'q1w2e3'
    })

    const channel = await connection.createChannel()

    channel.assertQueue('minha_fila', {
        durable: true
    })

    channel.prefetch(5)

    channel.consume('minha_fila', (data) => {
        console.log(data.content.toString())

        setTimeout(() => {
            channel.ack(data)
        }, 5000)
    })
}

main()