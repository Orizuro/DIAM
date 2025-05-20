from .models import Channel, Message, Session, Student, Uc
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status 
from rest_framework.response import Response 
from django.contrib.auth.models import User 
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from datetime import datetime
from dateutil.parser import parse
from django.shortcuts import get_object_or_404


@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if username is None or password is None:
        return Response({'error': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username = username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User ' + user.username + ' created successfully'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    isAdmin = user.is_staff or user.is_superuser

    if user is not None:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
                'message': 'Logged in successfully', 
            'user': {'username': user.username, 'token': token.key, 'isAdmin': isAdmin}
            })
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)

    return Response({'message': 'Logged out successfully'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    return Response({'username': request.user.username})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_messages(request):
    channel_code = request.GET["channel_id"]
    channel = Channel.objects.get(uc=channel_code)
    messages = Message.objects.filter(to=channel)

    data = {}
    for message in messages:
        user = message.sender

        is_admin = user.is_staff or user.is_superuser

        if is_admin:
            first_name = "Admin"
            last_name = user.username
        else:
            student = Student.objects.get(user=user)
            first_name = student.first_name
            last_name = student.last_name

        msg = {
            "sender": user.username,
            "first_name": first_name,
            "last_name": last_name,
            "content": message.content,
            "created_at": message.created_at,
            "total_likes": message.liked_by.count(), 
            "liked_by": list(message.liked_by.values_list("username", flat=True))
        }
        data[message.id] = msg

    return Response({'messages': data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_session(request):
    try:
        uc_code = request.data.get("uc")
        date_time = request.data.get("date_time")


        if not (uc_code and date_time):
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uc = Uc.objects.get(code=uc_code)
        except Uc.DoesNotExist:
            return Response({"error": "UC not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            channel = Channel.objects.get(uc=uc)
        except Uc.DoesNotExist:
            return Response({"error": "Channel not found"}, status=status.HTTP_404_NOT_FOUND)

        selected_date = parse(date_time)

        print(channel.uc.name)
        print(selected_date)

        session = Session.objects.create(
            user=request.user,
            channel=channel,
            date_time = selected_date
        )
        print(session.date_time)


        return Response({"message": "Session created successfully!"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_session(request):
    try:
        session_id = request.data.get("session_id")

        session = Session.objects.get(id=session_id)

        if not session:
            return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)

        session.delete()
        return Response({"message": "Session deleted successfully!"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def create_uc(request):
    try:
        code = request.data.get("code")
        name = request.data.get("name")
        description = request.data.get("description")

        if not all([code, name, description]):
            return Response(
                {"error": "Missing code, name, or description"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if Uc.objects.filter(code=code).exists():
            return Response(
                {"error": "UC with this code already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create UC
        uc = Uc.objects.create(
            code=code,
            name=name,
            description=description
        )

        # Create corresponding Channel (OneToOne)
        Channel.objects.create(
            uc=uc,
            name=f"Canal {uc.name}",
            description=f"Discussões sobre {uc.name}"
        )

        return Response(
            {
                "message": "UC and Channel created successfully!",
                "uc": {
                    "code": uc.code,
                    "name": uc.name,
                    "description": uc.description
                }
            },
            status=status.HTTP_201_CREATED
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def delete_uc(request):
    try:
        code = request.data.get("code")

        if not code:
            return Response({"error": "Missing UC code"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uc = Uc.objects.get(code=code)
        except Uc.DoesNotExist:
            return Response({"error": "UC not found"}, status=status.HTTP_404_NOT_FOUND)

        uc.delete()

        return Response({"message": "UC deleted successfully!"})

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_ucs(request):
    try:
        ucs = Uc.objects.all()
        data = []

        for uc in ucs:
            uc_data = {
                "code": uc.code,
                "name": uc.name,
                "description": uc.description,
            }
            data.append(uc_data)

        return Response({"ucs": data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_channels(request):
    try: 
        student = Student.objects.get(user=request.user)
        channels = student.channels.all()

        data = []
        for channel in channels:
            channel_dict = {
                "id": channel.id,
                "name": channel.name,
                "description": channel.description,
                "created_at": channel.created_at,
            }
            data.append(channel_dict)

        return Response({"channels": data})

    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_sessions(request):
    uc_code = request.data.get("uc")
    date = request.data.get("date")
    username = request.data.get("username")

    filters = {}

    if uc_code:
        filters['channel__uc__code'] = uc_code
    if username:
        user_obj = User.objects.get(username=username)
        filters['user'] = user_obj

    if not filters and not date:
        return Response(
            {"error": "At least one filter (uc, username or date) is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    sessions = Session.objects.filter(**filters)

    if date:
        try:
            selected_date = parse(date).date()
            sessions = sessions.filter(date_time__date=selected_date)

        except:
            return Response(
                {"error": "Invalid date format. Use YYYY-MM-DD"},
                status=status.HTTP_400_BAD_REQUEST
            )

    data = []
    for session in sessions:
        session_dict = {
            "session_id": session.id,
            "uc_name": session.channel.uc.name,
            "uc_code": session.channel.uc.code,
            "user": request.user.username,
            "date_time": session.date_time,
        }

        data.append(session_dict)

    return Response({"sessions": data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_channel_by_session(request):
    date = request.data.get("date")
    print(date)

    if not date:
        return Response(
            {"error": "At least one filter (uc, username or date) is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        selected_date = parse(date).date()
        sessions = Session.objects.filter(date_time__date=selected_date, user=request.user)

    except:
        return Response(
            {"error": "Invalid date format. Use YYYY-MM-DD"},
            status=status.HTTP_400_BAD_REQUEST
        )

    data = []
    for session in sessions:
        session_dict = {
            "user": session.user.username,
            "code": session.channel.uc.code,
            "name": session.channel.uc.name,
            "description": session.date_time,
        }

        data.append(session_dict)

    return Response({"channels": data})
