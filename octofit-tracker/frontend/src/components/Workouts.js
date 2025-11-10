import React, { useEffect } from 'react';
import { useApiResource } from '../hooks/useApiResource';
import ResourceTable from './ResourceTable';

const resolveWorkoutName = (workout, index) =>
  workout.name ||
  workout.title ||
  workout.workout_name ||
  `Workout ${index + 1}`;

const resolveWorkoutLevel = (workout) =>
  workout.level || workout.difficulty || workout.intensity || '—';

const resolveWorkoutDuration = (workout) => {
  const raw =
    workout.duration_minutes ||
    workout.duration ||
    workout.time ||
    workout.estimated_time;
  if (raw === null || raw === undefined || raw === '') {
    return '—';
  }
  const numeric = Number(raw);
  if (Number.isFinite(numeric)) {
    return `${numeric} min`;
  }
  return raw;
};

const resolveWorkoutFocus = (workout) =>
  workout.focus ||
  workout.primary_focus ||
  workout.category ||
  workout.modality ||
  '—';

const resolveWorkoutEquipment = (workout) => {
  if (Array.isArray(workout.equipment) && workout.equipment.length > 0) {
    return workout.equipment.join(', ');
  }
  return workout.equipment || workout.gear || '—';
};

const resolveWorkoutCoach = (workout) => workout.coach || workout.creator || workout.author || '—';

const getWorkoutRowKey = (workout, index) =>
  workout.id ||
  workout.pk ||
  workout._id ||
  workout.uuid ||
  `${workout.name || 'workout'}-${index}`;

const workoutColumns = [
  {
    key: 'workout',
    label: 'Workout',
    isRowHeader: true,
    render: (workout, index) => (
      <div className="d-flex flex-column">
        <span className="fw-semibold">{resolveWorkoutName(workout, index)}</span>
        {workout.description && (
          <span className="text-muted small mt-1">{workout.description}</span>
        )}
      </div>
    ),
  },
  {
    key: 'level',
    label: 'Level',
    render: (workout) => resolveWorkoutLevel(workout),
  },
  {
    key: 'duration',
    label: 'Duration',
    render: (workout) => resolveWorkoutDuration(workout),
  },
  {
    key: 'focus',
    label: 'Focus',
    render: (workout) => resolveWorkoutFocus(workout),
  },
  {
    key: 'equipment',
    label: 'Equipment',
    render: (workout) => resolveWorkoutEquipment(workout),
  },
  {
    key: 'coach',
    label: 'Coach',
    render: (workout) => resolveWorkoutCoach(workout),
  },
];

const Workouts = () => {
  const { data, error, loading, endpoint, label } = useApiResource('workouts', 'Workouts');

  useEffect(() => {
    console.log(`[${label}] Normalized data ready for rendering:`, data);
  }, [data, label]);

  useEffect(() => {
    console.log(`[${label}] Active REST endpoint: ${endpoint}`);
  }, [endpoint, label]);

  return (
    <ResourceTable
      title="Workouts"
      subtitle="Curated training sessions to match every level"
      columns={workoutColumns}
      data={data}
      loading={loading}
      error={error}
      emptyMessage="No workouts available."
      rowKeyGetter={getWorkoutRowKey}
    />
  );
};

export default Workouts;
// -8000.app.github.dev/api/workouts/
