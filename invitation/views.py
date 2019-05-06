from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from invitation.serializers import InvitationSerializer

class InvitationCreate(APIView):
    """ 
    Creates the invitation. 
    """
    def post(self, request, format='json'):
        invitationS = InvitationSerializer(data=request.data)
        if invitationS.is_valid():
            user = invitationS.save()
            return Response({}, status=status.HTTP_201_CREATED)

        return Response(invitationS.errors, status=status.HTTP_400_BAD_REQUEST)
