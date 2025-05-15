from votacao.models import Questao, Opcao
from django.utils import timezone
import datetime

import json

# apaga os registos nas tabelas da BD
def delete_questions():
    questoes = Questao.objects.all()
    for questao in questoes:
        questao.delete()

# criar questões de exemplo (com base em JSON)
def create_questions(questions_json):
    for questao in questions_json["questoes"]:
        print(questao)

        if(questao['texto'] != "És de que clube?"):
            q = Questao.objects.create(questao_texto=questao["texto"], pub_data=timezone.now())
        else:
            q = Questao.objects.create(
                questao_texto=questao["texto"], 
                pub_data=timezone.now() - datetime.timedelta(weeks=200))

        for opcao in questao["opcoes"]:
            q.opcao_set.create(opcao_texto=opcao, votos=0)

# mostrar - assume que os __str__ existem nos modelos de dados
def show_questions():
    for questao in Questao.objects.all():
        print(questao)



## main ##
    #delete_questions()

with open('questoes_exemplo.json', encoding='utf-8') as json_file:
    QUESTOES = json.load(json_file)

delete_questions()

create_questions(QUESTOES)

show_questions()
