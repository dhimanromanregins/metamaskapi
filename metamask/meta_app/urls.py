# urls.py
from django.urls import path
from .views import GenerateEthereumAccount, EthereumBalance,EthereumTransactionHistory

urlpatterns = [
    path('generate-ethereum-account/', GenerateEthereumAccount.as_view(), name='generate-ethereum-account'),
    path('ethereum-balance/<str:address>/', EthereumBalance.as_view(), name='ethereum-balance'),
    path('ethereum-transaction-history/<str:address>/', EthereumTransactionHistory.as_view(), name='ethereum-transaction-history'),
]
