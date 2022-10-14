# Generated by Django 3.2.13 on 2022-10-14 12:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='organization',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='users', to='common.organization'),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_role',
            field=models.TextField(choices=[('Admin', 'Admin'), ('Staff User', 'Staff'), ('Applicant', 'Applicant')], default='Applicant'),
        ),
    ]
