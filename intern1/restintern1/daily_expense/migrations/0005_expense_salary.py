# Generated by Django 4.1.13 on 2023-11-21 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('daily_expense', '0004_remove_expense_salary'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='salary',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
