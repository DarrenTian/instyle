from django.shortcuts import render

def spa(request):
	return render(request, 'main.html')

def ac(request):
	return render(request, 'ac.html')