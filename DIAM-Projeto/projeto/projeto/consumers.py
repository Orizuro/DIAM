from django.contrib.auth import get_user
from study_partner.models import Channel, Message, Student
from study_partner.constants import WebSocketMessageType
from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
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
        message_type = text_data_json["type"]

        if message_type == WebSocketMessageType.MESSAGE:
            self.send_message(text_data_json)

        if message_type == WebSocketMessageType.TOGGLE_LIKE:
            msg_id = text_data_json["content"] 

            msg = Message.objects.get(id=msg_id) 
            user = self.scope["user"]

            # Toggle like
            if user in msg.liked_by.all():
                msg.liked_by.remove(user)
            else:
                msg.liked_by.add(user)

            # Count likes
            likes = msg.liked_by.count()

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {
                    "type": "toggle.like",
                    "content": msg_id,
                    "total_likes": likes,
                    "liked_by": list(msg.liked_by.values_list("username", flat=True))
                })


    def chat_message(self, event):
        user = event["sender"]
        created_at = event["created_at"]

        message = event["content"]
        self.send_json({
            "type": WebSocketMessageType.MESSAGE, 
            "content": message, 
            "sender": user,
            "created_at": created_at,
        })

    def send_message(self, text_data_json):
        message = text_data_json["content"]
        channel = Channel.objects.get(uc=self.room_name)
        user = self.scope["user"]

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


    def toggle_like(self, event):
        self.send_json({
            "type": WebSocketMessageType.TOGGLE_LIKE, 
            "message_id": event["content"], 
            "total_likes": event["total_likes"],
            "liked_by": event["liked_by"],
        })
