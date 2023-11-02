# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import EthereumAccount
from .serializers import EthereumAccountSerializer
from web3 import Web3, Account
import requests

class GenerateEthereumAccount(APIView):
    def post(self, request):
        # Extract user_id from the request data (ensure user_id is provided)
        user_id = request.data.get('user_id')
        if user_id is None:
            return Response({"message": "user_id is required in the request data."}, status=status.HTTP_400_BAD_REQUEST)

        # Connect to an Ethereum node (e.g., Infura)
        w3 = Web3(Web3.HTTPProvider('https://wider-indulgent-brook.discover.quiknode.pro/67c3e69fe1b270b5f51fa0d46cc048a9963e9a21/'))

        # Generate an Ethereum account
        account = Account.create()
        private_key = account.key
        address = account.address

        # Save the Ethereum account to the database, associated with the provided user_id
        try:
            ethereum_account = EthereumAccount.objects.create(user_id=user_id, address=address, private_key=private_key.hex())
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize and return the Ethereum account details
        serializer = EthereumAccountSerializer(ethereum_account)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class EthereumBalance(APIView):
    def get(self, request, address):
        # Connect to an Ethereum node (e.g., Infura)
        w3 = Web3(Web3.HTTPProvider('https://wider-indulgent-brook.discover.quiknode.pro/67c3e69fe1b270b5f51fa0d46cc048a9963e9a21/'))

        try:
            balance_wei = w3.eth.get_balance(address)
            balance_eth = w3.from_wei(balance_wei, 'ether')
            return Response({"address": address, "balance_wei": balance_wei, "balance_eth": balance_eth}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class EthereumTransactionHistory(APIView):
    def get(self, request, address):
        # Replace with your Etherscan API key
        api_key = "7DI9U879W1P9613SHPVUEKMXF7WDT85D5X"

        # Etherscan API endpoint for getting the transaction list
        api_url = f"https://api.etherscan.io/api?module=account&action=txlist&address={address}&startblock=0&endblock=99999999&sort=desc&apikey={api_key}"

        try:
            response = requests.get(api_url)
            if response.status_code == 200:
                data = response.json()
                if data["status"] == "1":
                    transactions = data["result"]
                    return Response(transactions, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Etherscan API response status is not '1'."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": "Failed to connect to Etherscan API."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)