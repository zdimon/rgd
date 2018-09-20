from .models import *

def categories_processor(request):
    categories = Theme.objects.all()            
    return {'categories': categories}