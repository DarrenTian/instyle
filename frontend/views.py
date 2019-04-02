from django.shortcuts import render

def style(request, style_id):
	return render(request, 'style/style.html')