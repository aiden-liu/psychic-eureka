import React, { useEffect } from 'react';
import { useApiResource } from '../hooks/useApiResource';
import ResourceTable from './ResourceTable';

const resolveActivityPrimary = (activity, index) =>
  activity.name ||
  activity.title ||
  activity.activity ||
  activity.summary ||
  `Activity ${index + 1}`;

const resolveActivitySubtitle = (activity) =>
  activity.description || activity.summary || activity.notes || activity.details || null;

const resolveActivityType = (activity) =>
  activity.type || activity.category || activity.activity_type || activity.kind || null;

const resolveActivityDate = (activity) => {
  const value = activity.date || activity.performed_on || activity.started_at || activity.start_time;
  if (!value) {
    return '—';
  }
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    return value;
  }
  return new Date(parsed).toLocaleDateString();
};

const resolveActivityDuration = (activity) => {
  const raw =
    activity.duration_minutes ||
    activity.duration ||
    activity.time_minutes ||
    activity.time ||
    activity.total_duration;
  if (raw === null || raw === undefined || raw === '') {
    return '—';
  }
  const numeric = Number(raw);
  if (Number.isFinite(numeric)) {
    return `${numeric} min`;
  }
  return raw;
};

const resolveActivityDistance = (activity) => {
  const km =
    activity.distance_km ||
    activity.distanceKilometers ||
    activity.distance_in_km ||
    (typeof activity.distance === 'number' ? activity.distance : null);
  const miles = activity.distance_miles || activity.distanceMiles || activity.distance_in_miles;
  if (km !== undefined && km !== null) {
    return `${km} km`;
  }
  if (miles !== undefined && miles !== null) {
    return `${miles} mi`;
  }
  if (activity.distance) {
    const numeric = Number(activity.distance);
    if (Number.isFinite(numeric)) {
      return `${numeric} km`;
    }
    return activity.distance;
  }
  return '—';
};

const getActivityRowKey = (activity, index) =>
  activity.id ||
  activity.pk ||
  activity._id ||
  activity.uuid ||
  activity.slug ||
  `${activity.name || 'activity'}-${index}`;

const activityColumns = [
  {
    key: 'activity',
    label: 'Activity',
    isRowHeader: true,
    render: (activity, index) => {
      const subtitle = resolveActivitySubtitle(activity);
      return (
        <div className="d-flex flex-column">
          <span className="fw-semibold">{resolveActivityPrimary(activity, index)}</span>
          {subtitle && <span className="text-muted small mt-1">{subtitle}</span>}
        </div>
      );
    },
  },
  {
    key: 'type',
    label: 'Type',
    render: (activity) => resolveActivityType(activity) || '—',
  },
  {
    key: 'date',
    label: 'Date',
    render: (activity) => resolveActivityDate(activity),
  },
  {
    key: 'duration',
    label: 'Duration',
    render: (activity) => resolveActivityDuration(activity),
  },
  {
    key: 'distance',
    label: 'Distance',
    render: (activity) => resolveActivityDistance(activity),
  },
];

const Activities = () => {
  const { data, error, loading, endpoint, label } = useApiResource('activities', 'Activities');

  useEffect(() => {
    console.log(`[${label}] Normalized data ready for rendering:`, data);
  }, [data, label]);

  useEffect(() => {
    console.log(`[${label}] Active REST endpoint: ${endpoint}`);
  }, [endpoint, label]);

  return (
    <ResourceTable
      title="Activities"
      subtitle="Overview of recent tracked sessions"
      columns={activityColumns}
      data={data}
      loading={loading}
      error={error}
      emptyMessage="No activities available."
      rowKeyGetter={getActivityRowKey}
    />
  );
};

export default Activities;
// -8000.app.github.dev/api/activities/