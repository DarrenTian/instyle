from invitation.models import Invitation
from rest_framework import serializers

class InvitationSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Invitation
		fields = ['email']