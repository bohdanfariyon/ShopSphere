from rest_framework import serializers
from core.models import Product, Category, Review

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
        read_only_fields = ['id', 'name']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'rating', 'comment', 'product', 'created_at']
        read_only_fields = ['id', 'created_at']

class ProductReviewSerializer(serializers.ModelSerializer):
    """Serializer для відображення відгуків у продукті"""
    class Meta:
        model = Review
        fields = ['id', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'created_at']



class ListProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'discount', 'category']
        read_only_fields = ['id', 'name', 'price', 'discount', 'category']

class DetailProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ListProductSerializer.Meta.fields + ['description', 'reviews']
        read_only_fields = ['id', 'name', 'price', 'discount', 'category', 'description', 'reviews']