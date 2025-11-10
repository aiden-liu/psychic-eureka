import React, { useEffect } from 'react';
import { useApiResource } from '../hooks/useApiResource';
import ResourceTable from './ResourceTable';

const resolveTeamName = (team, index) => team.name || team.team_name || `Team ${index + 1}`;

const resolveTeamDescription = (team) => team.description || team.mission || team.summary || '—';

const resolveMembers = (team) => {
  if (Array.isArray(team.members) && team.members.length > 0) {
    if (team.members.length <= 3) {
      return team.members.join(', ');
    }
    return `${team.members.length} members`;
  }
  if (typeof team.member_count === 'number') {
    return `${team.member_count} members`;
  }
  return '—';
};

const resolveLead = (team) =>
  team.leader || team.captain || team.owner || team.manager || '—';

const resolveFocus = (team) => team.focus || team.category || team.primary_goal || '—';

const getTeamRowKey = (team, index) =>
  team.id || team.pk || team._id || team.uuid || `${team.name || 'team'}-${index}`;

const teamColumns = [
  {
    key: 'team',
    label: 'Team',
    isRowHeader: true,
    render: (team, index) => (
      <div className="d-flex flex-column">
        <span className="fw-semibold">{resolveTeamName(team, index)}</span>
        {team.tagline && <span className="text-muted small">{team.tagline}</span>}
      </div>
    ),
  },
  {
    key: 'description',
    label: 'Description',
    render: (team) => resolveTeamDescription(team),
  },
  {
    key: 'members',
    label: 'Members',
    render: (team) => resolveMembers(team),
  },
  {
    key: 'lead',
    label: 'Lead',
    render: (team) => resolveLead(team),
  },
  {
    key: 'focus',
    label: 'Focus',
    render: (team) => resolveFocus(team),
  },
];

const Teams = () => {
  const { data, error, loading, endpoint, label } = useApiResource('teams', 'Teams');

  useEffect(() => {
    console.log(`[${label}] Normalized data ready for rendering:`, data);
  }, [data, label]);

  useEffect(() => {
    console.log(`[${label}] Active REST endpoint: ${endpoint}`);
  }, [endpoint, label]);

  return (
    <ResourceTable
      title="Teams"
      subtitle="Collaborative groups pushing each other forward"
      columns={teamColumns}
      data={data}
      loading={loading}
      error={error}
      emptyMessage="No teams have been created yet."
      rowKeyGetter={getTeamRowKey}
    />
  );
};

export default Teams;
