from rest_framework import viewsets, status
from rest_framework.response import Response
from invitation.models import Invitation
from invitation.serializers import InvitationSerializer

class InvitationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Invitation.objects.all().order_by('id')
    serializer_class = InvitationSerializer