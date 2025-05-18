from django.contrib.auth import get_user
from study_partner.models import Channel, Message, Student
from study_partner.constants import WebSocketMessageType
from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from datetime import datetime
import json

class ChatConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["channel_code"]
        self.room_group_name = f"chat_{self.room_name}"

        try:
            channel = Channel.objects.get(uc=self.room_name)
        except Channel.DoesNotExist:
            self.accept()
            self.send_json({
                "type": WebSocketMessageType.ERROR,
                "message":  f"This channel '{self.room_name}' does not exists",
            })

            self.close()
            return

        async_to_sync(self.channel_layer.group_add)(self.room_group_name, self.channel_name)

        self.accept()

        self.send_json({
            "type": WebSocketMessageType.CONNECTION_SUCCESS,
            "message": "Hey there! You've successfully connected!",
            "channel_name": channel.name,
        })

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.room_group_name, self.channel_name)
        print("Disconnected with code: ", close_code)

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["content"]
        user = self.scope["user"]

        is_admin = user.is_staff or user.is_superuser
        
        if is_admin: 
            first_name = "Admin"
            last_name = user.username 

        else:
            student = Student.objects.get(user=user)
            first_name = student.first_name 
            last_name = student.last_name 

        channel = Channel.objects.get(uc=self.room_name)

        msg = Message(sender=user, to=channel, content=message)
        msg.save()

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {
                    "type": "chat.message", 
                    "content": message, 
                    "sender": user.username,
                    "created_at": msg.created_at.isoformat(),
                }
        )

    def chat_message(self, event):
        message = event["content"]
        user = event["sender"]
        created_at = event["created_at"]
        
        self.send_json({
            "type": WebSocketMessageType.MESSAGE, 
            "content": message, 
            "sender": user,
            "created_at": created_at,
        })
