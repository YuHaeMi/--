from django.db import models

# Create your models here.
class Diary(models.Model):
	diary_title = models.CharField(max_length=100)
	diary_contents = models.TextField()
	diary_date = models.DateField(unique=True)
	diary_weather = models.CharField(max_length=50)
	diary_mood = models.CharField(max_length=50)