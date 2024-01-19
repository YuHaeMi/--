from django.shortcuts import render, HttpResponse, redirect
from django.views.decorators.csrf import csrf_exempt
from .models import Diary
import json
import requests

# Create your views here.
def index(request):
	return HttpResponse('this is index')

def read(request):
	print('*******************')
	get_data = Diary.objects.all()
	send_data = {}
	send_data["diary"] = []
	for i in range(get_data.count()):
		send_data["diary"].append({
			"id" :get_data[i].id,
			"date" :f"{get_data[i].diary_date}",
			"weather" :get_data[i].diary_weather,
			"mood" :get_data[i].diary_mood,
			"title" :get_data[i].diary_title,
			"body" :get_data[i].diary_contents
		})
	with open("../../Frontend/js/diary.json", "w") as file:
		json.dump(send_data, file, indent="\t")
	return HttpResponse(json.dumps(send_data))


def create(request):
	print("##############")
	get_data = {"date": request.GET["date"], "weather": request.GET["weather"], "mood": request.GET["mood"], "title": request.GET["title"], "body": request.GET["body"]}
	# print(get_data)
	diary = Diary()
	diary.diary_title = get_data["title"]
	diary.diary_contents = get_data["body"]
	diary.diary_date = get_data["date"]
	diary.diary_weather = get_data["weather"]
	diary.diary_mood = get_data["mood"]
	diary.save()
	url = '/read/'
	return redirect(url)


def delete(request):
	get_data = request.GET["date"]
	print(get_data)
	diary = Diary.objects.filter(diary_date=get_data)
	diary.delete()	
	print(diary)
	url = '/read/'
	return redirect(url)

def update(request):
	get_data = {"date": request.GET["date"], "weather": request.GET["weather"], "mood": request.GET["mood"], "title": request.GET["title"], "body": request.GET["body"]}
	diary = Diary.objects.filter(diary_date=get_data["date"])
	diary.update(diary_title=get_data["title"], diary_contents=get_data["body"], diary_weather=get_data["weather"], diary_mood=get_data["mood"])
	url = '/read/'
	return redirect(url)