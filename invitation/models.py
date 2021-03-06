# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib import admin

class Invitation(models.Model):
	INVITATION_TYPE = (
		('S', 'Self'),
		('F', 'Friend'),
	)

	email = models.CharField(max_length=200, default='')
	invitation_type = models.CharField(max_length=1, choices=INVITATION_TYPE, default='S')

	def __str__(self):
		return "%s" % self.email



class InvitationAdmin(admin.ModelAdmin):
    fields = ('email', 'invitation_type')
admin.site.register(Invitation, InvitationAdmin)