# Generated by Django 3.2.25 on 2024-10-29 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_cart_cartitem_category_order_orderitem_product_review'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='discount_type',
            field=models.CharField(choices=[('percentage', 'Percentage'), ('fixed', 'Fixed Amount')], default='percentage', max_length=10),
        ),
    ]
