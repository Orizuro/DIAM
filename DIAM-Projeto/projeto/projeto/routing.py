from django.urls import re_path
from . import consumers 

websocket_urlpatterns = [
    re_path(r"^channel/(?P<channel_name>\w+)/$", consumers.ChatConsumer.as_asgi()),
]
