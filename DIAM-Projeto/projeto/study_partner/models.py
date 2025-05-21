from django.db import models
from django.contrib.auth.models import User

class Uc(models.Model):
    code = models.CharField(primary_key=True, max_length=30)
    name = models.CharField(max_length = 100) 
    description = models.TextField()

class Channel(models.Model):
    uc = models.OneToOneField(Uc, on_delete=models.CASCADE)
    name = models.CharField(max_length=100) 
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100) 
    last_name = models.CharField(max_length=100) 
    course = models.CharField(max_length=50) 

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    to = models.ForeignKey(Channel, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    liked_by = models.ManyToManyField(User, related_name="liked_messages", blank=True)

class Session(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    date_time = models.DateTimeField()
