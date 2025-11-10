import React, { useEffect } from 'react';
import { useApiResource } from '../hooks/useApiResource';
import ResourceTable from './ResourceTable';

const resolveParticipantName = (entry, index) =>
  entry.name ||
  entry.username ||
  entry.display_name ||
  entry.member ||
  `Entry ${index + 1}`;

const resolveTeamName = (entry) => entry.team_name || entry.team || entry.squad || '—';

const resolveRank = (entry, index) => {
  const rank = entry.position || entry.rank || entry.placement;
  if (rank !== undefined && rank !== null && rank !== '') {
    return `#${rank}`;
  }
  const fallback = index + 1;
  return `#${fallback}`;
};

const resolvePoints = (entry) => {
  const raw = entry.points ?? entry.score ?? entry.total_points;
  if (raw === null || raw === undefined || raw === '') {
    return '—';
  }
  const numeric = Number(raw);
  if (Number.isFinite(numeric)) {
    return `${numeric} pts`;
  }
  return raw;
};

const resolveHighlights = (entry) => {
  const highlights = entry.highlight || entry.notes || entry.badge || entry.trend;
  if (highlights) {
    return highlights;
  }
  if (entry.streak) {
    return `Streak: ${entry.streak}`;
  }
  return '—';
};

const getLeaderboardRowKey = (entry, index) =>
  entry.id ||
  entry.pk ||
  entry._id ||
  entry.uuid ||
  `${entry.username || entry.name || 'entry'}-${index}`;

const leaderboardColumns = [
  {
    key: 'participant',
    label: 'Participant',
    isRowHeader: true,
    render: (entry, index) => (
      <div className="d-flex flex-column">
        <span className="fw-semibold">{resolveParticipantName(entry, index)}</span>
        {entry.title && <span className="text-muted small">{entry.title}</span>}
      </div>
    ),
  },
  {
    key: 'team',
    label: 'Team',
    render: (entry) => resolveTeamName(entry),
  },
  {
    key: 'rank',
    label: 'Rank',
    render: (entry, index) => resolveRank(entry, index),
  },
  {
    key: 'points',
    label: 'Points',
    render: (entry) => resolvePoints(entry),
  },
  {
    key: 'highlights',
    label: 'Highlights',
    render: (entry) => resolveHighlights(entry),
  },
];

const Leaderboard = () => {
  const { data, error, loading, endpoint, label } = useApiResource('leaderboard', 'Leaderboard');

  useEffect(() => {
    console.log(`[${label}] Normalized data ready for rendering:`, data);
  }, [data, label]);

  useEffect(() => {
    console.log(`[${label}] Active REST endpoint: ${endpoint}`);
  }, [endpoint, label]);

  return (
    <ResourceTable
      title="Leaderboard"
      subtitle="Competitive standings across the platform"
      columns={leaderboardColumns}
      data={data}
      loading={loading}
      error={error}
      emptyMessage="No leaderboard entries yet."
      rowKeyGetter={getLeaderboardRowKey}
    />
  );
};

export default Leaderboard;
// -8000.app.github.dev/api/leaderboard/