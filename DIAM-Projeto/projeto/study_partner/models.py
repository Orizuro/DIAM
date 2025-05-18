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
    channels = models.ManyToManyField(Channel)
    first_name = models.CharField(max_length=100) 
    last_name = models.CharField(max_length=100) 
    course = models.CharField(max_length=50) 

class Message(models.Model):
    sender = models.ForeignKey(Student, on_delete=models.DO_NOTHING)
    to = models.ForeignKey(Channel, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Session(models.Model):
    uc = models.ForeignKey(Uc, on_delete=models.CASCADE)
    total_participants = models.IntegerField()
    date_time = models.DateTimeField()


