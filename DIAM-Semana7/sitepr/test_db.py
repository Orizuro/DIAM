
from django.db.models import options
from votacao.models import Questao, Opcao
from django.utils import timezone

def main(): 
    listQuestions()

    print('\nb. Mostrar as opções da questão em que o texto começa com “Gostas de…”:')
    options = listOptionsStartignWith()

    listOptionsStartignWithAndVoteSuperior(options)
    last3YearsPubs()
    calculateTotalVotes()
    showMostVotedOptions()

#DONE
def listQuestions(): 
    print("\na) Listar todas as opções:")
    for question in Questao.objects.all():
       print(question) 

#DONE
def listOptionsStartignWith():
    options = {}
    filteredQuestions = Questao.objects.filter(questao_texto__startswith="Gostas de")
    for question in filteredQuestions:
        options[question] = question.opcao_set.all()
        print(question.opcao_set.all())
    return options 

#DONE
def listOptionsStartignWithAndVoteSuperior(options):
    print("\nc) Mostrar as opções com número de votos superior a 2 da questão em que o texto começa com “Gostas de…”:")
    for _, values in options.items(): 
        for value in values:
            if value.votos > 2:
                print('Opção: ' + str(value))

#DONE
def last3YearsPubs():
    print("\nd) Mostrar uma lista das questões publicadas nos últimos 3 anos:")
    current_year = timezone.now().year
    for question in Questao.objects.all():
        if(question.pub_data.year > current_year - 3):
            print(question.questao_texto)


#DONE
def calculateTotalVotes():
    print("\ne) Calcular e mostrar o número total de votos que estão registados na base de dados: ")
    sum = 0
    for option in Opcao.objects.all():
        sum += option.votos
    
    print("O número total de votos é: " + str(sum))

#DONE
def showMostVotedOptions():
    print('\nf) Percorrer todas as questões da DB e, para cada uma, mostrar o texto da questão e o da opção que tiver mais votos:')

    for question in Questao.objects.all():
        print(question.questao_texto)

        # Tranform Option into list of votes
        max_vote = 0
        max_option = None
        for question in question.opcao_set.all():
            if(question.votos > max_vote):
                max_vote = question.votos
                max_option = question.opcao_texto
        
        # Get max from the list of votes
        print("Opção mais votada: " + str(max_option))

main()
