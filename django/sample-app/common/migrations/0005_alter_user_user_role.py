# Generated by Django 3.2.13 on 2022-10-14 13:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0004_auto_20221014_1310'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_role',
            field=models.TextField(choices=[('Admin', 'Admin'), ('Staff User', 'Staff'), ('Applicant', 'Applicant')]),
        ),
    ]
