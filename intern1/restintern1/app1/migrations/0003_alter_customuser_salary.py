# Generated by Django 4.1.13 on 2023-11-21 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0002_customuser_salary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='salary',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10),
        ),
    ]
