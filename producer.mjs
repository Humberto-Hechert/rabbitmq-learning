import amqp from 'amqplib';

async function main() {
    const connection = await amqp.connect({
        host: 'localhost',
        port: 5672,
        username: 'admin',
        password: 'q1w2e3'
    })

    const channel = await connection.createChannel()

    await channel.assertQueue('minha_fila', {
        durable: true
    })

    for (let i = 0; i <= 100; i++) {
        channel.publish('', 'minha_fila', Buffer.from(`Minha mensagem ${i}`))
    }
    
    await channel.close()
    await connection.close()
    
}

main()