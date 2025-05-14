from django.db import models
from django.contrib.auth.models import User 


class Session(models.Model):
    pass

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    firstName = models.CharField(max_length=100) 
    lastName = models.CharField(max_length=100) 
    course = models.CharField(max_length=50) 
    session = models.CharField(max_length=50) 

class Uc(models.Model):
    pass

class Message(models.Model):
    content = models.TextField()
    fromUser = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Channel(models.Model):
    pass

