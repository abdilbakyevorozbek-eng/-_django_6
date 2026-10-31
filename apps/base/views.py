
from django.shortcuts import render
from .models import Settings, Slide, Car, Contact, Feature


def index(request):
    settings = Settings.objects.first()
    slides = Slide.objects.first()
    cars = Car.objects.all()
    features = Feature.objects.all()

    if request.method == "POST":
        name = request.POST.get("name", "")
        phone = request.POST.get("phone", "")

        Contact.objects.create(
            name=name,
            phone=phone
        )

    return render(request, 'index.html', locals())


    