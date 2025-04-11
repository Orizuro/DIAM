from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *  # (1) Importações relacionadas com a serialização dos dados.


@api_view(['GET', 'POST'])  # (2) Cada view é anotada de acordo com o tipo de pedidos que gere: neste caso a view questions gere pedidos GET e POST.
def questions(request):

    if request.method == 'GET':  # (3) Se o métLodo de request for GET então devolve uma lista com todas as questões serializadas
        question_list = Questao.objects.all()
        serializer = QuestaoSerializer(question_list, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':  # (3) Se o métoldo de request for POST, isto é, para criação de uma nova questão, os dados de request.data originados pelo
                                    #     React (em formato JSON), são obtidos e serializados para os converter em Python. Finalmente, se a serialização for
                                    #     válida, é gravada a nova questão criada.

        serializer = QuestaoSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])  # (2) e (4)   Se o métoldo de request for PUT, isto é, para a atualização de uma questão existente, obtém os dados de
                              #             request.data vindos do React, serializa-os para os converter em Python e, se a serialização for válida,
                              #             grava a questão existente com as alterações pretendidas.
def question_detail(request, question_id):
    try:
        question = Questao.objects.get(pk=question_id)
    except Questao.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':  # (4) Se o métoLdo de request for DELETE, obtém a questão através do id vindo pelo request e apaga a questão com delete().
        serializer = QuestaoSerializer(question, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def options(request, question_id):
    if request.method == 'GET':
        question = Questao.objects.get(pk=question_id)
        option_list = question.opcao_set.all()
        serializer = OpcaoSerializer(option_list, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = OpcaoSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def option_detail(request, option_id):
    try:
        option = Opcao.objects.get(pk=option_id)
    except Opcao.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = OpcaoSerializer(option, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'DELETE':
        option.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_400_BAD_REQUEST)
