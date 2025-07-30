from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model= Task
        fields= '__all__'
        
    def validate_title(self, value):
        if not value.strip():
            raise serializers.validationError("Title cannot be empty or whitespace.")
        return value
    
    def validate_description(self, value):
        if not value.strip():
            raise serializers.validationError("Description cannot be empty or whitespace.")
        return value
    
    def validate_taskstatus(self, value):
        if not value.strip():
            raise serializers.validationError("Invalid status. Choose from todo, in_progress or done.")
        return value