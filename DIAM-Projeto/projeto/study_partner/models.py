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
    reputation = models.IntegerField(default=0)

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    to = models.ForeignKey(Channel, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    users_who_liked = models.ManyToManyField(User, related_name='liked_messages', blank=True)

    @property
    def likes(self):
        return self.users_who_liked.count()

class Session(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    date_time = models.DateTimeField()
