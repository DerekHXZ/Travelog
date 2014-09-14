import json
from plaid import Client

class Plaid:

    def __init__(self, clientId, clientSecret):
        self.client = Client(client_id=clientId, secret=clientSecret)

    def connect(self, accountType, username, password, email):
        connect = self.client.connect(account_type=accountType, username=username, password=password, email=email)
        if connect.ok:
            json_response = json.loads(connect.content)
            return json_response['access_token'];

    def answerMFA(self, accountType, mfaAnswer):
        step = self.client.step(account_type=accountType, mfa=mfaAnswer)
        if step.ok:
            transactions = json.loads(step.content)

        trans = self.client.transactions
        print(trans)
