import json
from plaid import Client

client
connect
def setClient(clientId, clientSecret):
    client = Client(client_id=clientId, secret=clientSecret)

def connect(accountType, username, password, email):
    connect = client.connect(account_type=accountType, username=username, password=password, email=email)
    if connect.ok:
        json_response = json.loads(connect.content)

        return json_response['mfa'][0] # Should be something like "What's your mother's maiden name?"

def answerMFA(accountType, mfaAnswer):
    step = client.step(account_type=accountType, mfa=mfaAnswer)
    if step.ok:
        transactions = json.loads(step.content)

    trans = client.transactions
    print(trans)
