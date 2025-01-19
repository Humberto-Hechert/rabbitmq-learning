import amqp from 'amqplib';

async function exchange() {
    const connection = await amqp.connect({
        host: 'localhost',
        port: 5672,
        username: 'admin',
        password: 'q1w2e3'
    })

    const channel = await connection.createChannel()

    await channel.assertExchange('humberto_exchange', 'direct')

    await channel.assertQueue('humberto_push_notification', {
        durable: true
    })

    await channel.assertQueue('humberto_email_notification', {
        durable: true
    })

    await channel.bindQueue('humberto_push_notification', 'humberto_exchange', 'novaChave')
    await channel.bindQueue('humberto_email_notification', 'humberto_exchange', 'novaChave')

    channel.publish('humberto_exchange', 'novaChave', Buffer.from("Teste Mensagem Exchange"))

    await channel.close()
    await connection.close()
}

exchange()