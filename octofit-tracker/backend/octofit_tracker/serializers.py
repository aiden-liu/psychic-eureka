from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout

class UserSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='id', read_only=True)
    class Meta:
        model = User
        fields = ['_id', 'name', 'email', 'team']

class TeamSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='id', read_only=True)
    class Meta:
        model = Team
        fields = ['_id', 'name']

class ActivitySerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='id', read_only=True)
    class Meta:
        model = Activity
        fields = ['_id', 'user', 'type', 'duration', 'date']

class LeaderboardSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='id', read_only=True)
    class Meta:
        model = Leaderboard
        fields = ['_id', 'team', 'points']

class WorkoutSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='id', read_only=True)
    class Meta:
        model = Workout
        fields = ['_id', 'name', 'description', 'difficulty']
