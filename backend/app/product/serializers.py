from rest_framework import serializers

from core.models import Product, Category, Review



class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['id', 'name']
        read_only_fields = ['id', 'name']


class ListProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Product
        fields = ['id','name', 'price', 'discount', 'category']
        read_only_fields = ['id', 'name', 'price', 'discount', 'category'] 



class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id','rating', 'comment', 'created_at']
        read_only_fields = ['id', 'created_at']


class DetailProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    review = ReviewSerializer(many=True)
    class Meta:
        model = Product
        fields = ListProductSerializer.Meta.fields + ['description','review']
        read_only_fields = ['id','name', 'price', 'discount', 'category', 'description']
    
    def update(self, instance, validated_data):
        """Update recipe"""
        review_data = validated_data.pop('review', None)

        if review_data is not None:


            # Create new reviews
            reviews_to_add = [
                Review(rating=rew['rating'], comment=rew['comment'], user=self.context['request'].user)
                for rew in review_data
            ]
            Review.objects.bulk_create(reviews_to_add)
            instance.review.add(*reviews_to_add)

        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = ['id','rating', 'comment']
        read_only_fields = ['id']


