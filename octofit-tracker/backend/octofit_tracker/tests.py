from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create(name='Test User', email='test@example.com', team=self.team.name)
        self.activity = Activity.objects.create(user=self.user.name, type='Test', duration=10, date='2025-01-01')
        self.leaderboard = Leaderboard.objects.create(team=self.team.name, points=50)
        self.workout = Workout.objects.create(name='Test Workout', description='Test Desc', difficulty='Easy')

    def test_user(self):
        self.assertEqual(self.user.email, 'test@example.com')
    def test_team(self):
        self.assertEqual(self.team.name, 'Test Team')
    def test_activity(self):
        self.assertEqual(self.activity.type, 'Test')
    def test_leaderboard(self):
        self.assertEqual(self.leaderboard.points, 50)
    def test_workout(self):
        self.assertEqual(self.workout.difficulty, 'Easy')
