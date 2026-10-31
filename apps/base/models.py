from django.db import models

# Create your models here.
class Settings(models.Model):
    title = models.CharField(max_length=255,verbose_name='Название сайта')
    logo = models.ImageField(upload_to='logo/',verbose_name='Логотип')
    description = models.TextField(verbose_name='Описание сайта')
    address = models.CharField(max_length=255,verbose_name='Адрес')
    phone = models.CharField(max_length=20,verbose_name='Телефон')
    email = models.EmailField(verbose_name='Email')
    instagram = models.URLField(blank=True,null=True,verbose_name='Instagram')

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = '1) Основная настройка'
        verbose_name_plural = '1) Основные настройки'

class Slide(models.Model):
    title = models.CharField(max_length=255, verbose_name='Заголовок слайда')
    image = models.ImageField(upload_to='slides/',verbose_name='изображение сайта ')
    description = models.TextField(verbose_name='Описание слайда')
    sales = models.CharField(max_length=255,verbose_name='машин продона')
    age = models.CharField(max_length=255,verbose_name='лет на рынке')
    ctients = models.CharField(max_length=255,verbose_name='Довольных клиентов')

    def __str__(self):
        return self.title
    class Meta :
        verbose_name = '2) слайд'
        verbose_name_plural = '2) слайды'

class Car(models.Model):
    title = models.CharField(max_length=255,verbose_name="Название машины")
    subtitle = models.CharField(max_length=255,verbose_name="Описание")
    price = models.CharField(max_length=255,verbose_name="Цена машины")
    image = models.ImageField(upload_to="car",verbose_name="Фото")

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Машина"
        verbose_name_plural = "Машины"

class Contact(models.Model):
    name =models.CharField(max_length=255,verbose_name="Имя")
    phone =models.CharField(max_length=255,verbose_name="Телефонный номер")

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Обратная связь"
        verbose_name_plural = "Обратные связи"


class Feature(models.Model):
    icon = models.CharField(max_length=50, verbose_name="Иконка")
    title = models.CharField(max_length=200, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")

    class Meta:
        verbose_name = "Преимущество"
        verbose_name_plural = "Преимущества"

    def __str__(self):
        return self.title
