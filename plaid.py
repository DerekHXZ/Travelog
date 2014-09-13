import json
from plaid import Client

client = Client(client_id='***', secret='***')
connect = client.connect(account_type='bofa', username='***', password='***', email='john@whatever.com')

if connect.ok:
    json_response = json.loads(connect.content)

    print json_response['mfa'][0] # Should be something like "What's your mother's maiden name?"

    step = client.step(account_type='bofa', mfa='Smith')
    if step.ok:
        transactions = json.loads(step.content)


def getTransactions():
    trans = client.transactions
    print(trans)
