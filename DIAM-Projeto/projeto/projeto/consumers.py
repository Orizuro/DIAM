from django.contrib.auth import get_user
from study_partner.models import Channel, Message
from study_partner.constants import WebSocketMessageType
from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
import json

class ChatConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["channel_code"]
        self.room_group_name = f"chat_{self.room_name}"

        if not Channel.objects.filter(uc=self.room_name).exists(): 
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
        })

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.room_group_name, self.channel_name)
        print("Disconnected with code: ", close_code)

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat.message", "message": message}
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]

        user = self.scope["user"] 

        channel = Channel.objects.get(uc=self.room_name)

        # Create a new message 
        msg = Message(user=user, to=channel, content=message)

        # Save in the database
        msg.save()

        # Send message to WebSocket
        self.send(
            text_data=json.dumps({"type": WebSocketMessageType.MESSAGE, "message": message})
        )
