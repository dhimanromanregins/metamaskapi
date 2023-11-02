# serializers.py
from rest_framework import serializers
from .models import EthereumAccount

class EthereumAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = EthereumAccount
        fields = ('user', 'address', 'private_key')
