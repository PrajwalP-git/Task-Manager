from django.db import models

class Task(models.Model):
    STATUS_CHOICES=[
        ('todo', 'To Do'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed')
    ]
    title= models.CharField(max_length=255)
    description= models.TextField(blank=True)
    status= models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='todo'
    )
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return self.title
