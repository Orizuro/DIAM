from django.core.management.base import BaseCommand
from study_partner.models import Uc, Channel

class Command(BaseCommand):
    help = 'Cria um conjunto de Unidades Curriculares (UCs)'

    def handle(self, *args, **kwargs):
        ucs = [
            {
                "code": "001",
                "name": "Programação I",
                "description": "Introdução aos conceitos básicos de programação utilizando uma linguagem de alto nível. Estruturas de controlo, variáveis, funções e depuração."
            },
            {
                "code": "002",
                "name": "Matemática Discreta",
                "description": "Estudo de estruturas matemáticas fundamentais para a ciência computacional, incluindo lógica, conjuntos, grafos e relações."
            },
            {
                "code": "003",
                "name": "Estruturas de Dados",
                "description": "Análise e implementação de estruturas de dados como listas, pilhas, filas, árvores e grafos. Complexidade algorítmica."
            },
            {
                "code": "004",
                "name": "Sistemas de Informação",
                "description": "Fundamentos de sistemas de informação nas organizações. Modelação de dados, processos de negócio e integração de sistemas."
            },
            {
                "code": "005",
                "name": "Redes de Computadores",
                "description": "Princípios básicos das redes de computadores. Modelos OSI e TCP/IP, endereçamento, protocolos e segurança."
            },
        ]

        for uc in ucs:
            name = uc['name']
            new_uc, created = Uc.objects.get_or_create(code=uc["code"], defaults={
                "name": name,
                "description": uc["description"]
            })

            Channel.objects.create(
                uc=new_uc,
                name=f"Canal {name}",
                description=f"Discussões sobre {name}"
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f'UC "{uc["name"]}" criada com sucesso.'))
            else:
                self.stdout.write(self.style.WARNING(f'UC "{uc["name"]}" já existe.'))
