from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Create a superuser automatically'

    def handle(self, *args, **kwargs):
        User = get_user_model()

        users = {
            "misael": {"email": "maaoo@iscte-iul.pt", "pass": "misael"},
            "cata": {"email": "cscaa11@iscte-iul.pt" , "pass": "cata"},
            "orizuro": {"email": "apnel1@iscte-iul.pt", "pass": "orizuro"}
        }

        for username, args in users.items():
            if not User.objects.filter(username=username).exists():
                User.objects.create_superuser(username, args['email'], args['pass'])
                self.stdout.write(self.style.SUCCESS(f'Superuser "{username}" created successfully!'))
            else:
                self.stdout.write(self.style.WARNING(f'Superuser "{username}" already exists.'))
