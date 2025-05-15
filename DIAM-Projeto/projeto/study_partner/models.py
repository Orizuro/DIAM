from django.db import models
from django.contrib.auth.models import User 


# class Session(models.Model):
#     pass

class Uc(models.Model):
    code = models.IntegerField(primary_key=True, unique=True)
    name = models.CharField(max_length = 100) 
    description = models.TextField()
    link = models.TextField()

class Channel(models.Model):
    uc = models.OneToOneField(Uc, on_delete=models.CASCADE)
    name = models.CharField(max_length=100) 
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    channels = models.ManyToManyField(Channel)
    first_name = models.CharField(max_length=100) 
    last_name = models.CharField(max_length=100) 
    course = models.CharField(max_length=50) 

class Message(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    to = models.OneToOneField(Channel, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


