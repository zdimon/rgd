from .models import *

def categories_processor(request):
    categories = Theme.objects.all()  
    return {}          
    return {'categories': categories}