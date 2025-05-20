from django.core.management.base import BaseCommand
from study_partner.models import Uc, Channel
from django.contrib.auth import get_user_model

def create_ucs(self):
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

        if created:
            Channel.objects.create(
                uc=new_uc,
                name=f"Canal {name}",
                description=f"Discussões sobre {name}"
            )
            self.stdout.write(self.style.SUCCESS(f'UC "{uc["name"]}" criada com sucesso.'))
        else:
            self.stdout.write(self.style.WARNING(f'UC "{uc["name"]}" já existe.'))

def create_users(self):
    User = get_user_model()
    defaultPass = 'passe'


    adminUsers = {
        "misael_admin": {"email": "maaoo@iscte-iul.pt"},
        "cata_admin": {"email": "cscaa11@iscte-iul.pt" },
        "sasha_admin": {"email": "apnel1@iscte-iul.pt"}
    }

    users = {}

    for username, args in adminUsers.items():
        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username, args['email'], defaultPass)
            self.stdout.write(self.style.SUCCESS(f'Superuser "{username}" criada com sucesso!'))
        else:
            self.stdout.write(self.style.WARNING(f'Superuser "{username}" Já existe.'))


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        create_users(self)
        create_ucs(self)

