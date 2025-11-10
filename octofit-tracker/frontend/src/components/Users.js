import React, { useEffect } from 'react';
import { useApiResource } from '../hooks/useApiResource';
import ResourceTable from './ResourceTable';

const resolveUserHandle = (user, index) =>
  user.username || user.email || user.handle || user.name || `User ${index + 1}`;

const resolveFullName = (user) => {
  if (user.full_name) {
    return user.full_name;
  }
  if (user.first_name || user.last_name) {
    return [user.first_name, user.last_name].filter(Boolean).join(' ');
  }
  return '—';
};

const resolveTeam = (user) => {
  if (Array.isArray(user.teams) && user.teams.length > 0) {
    return user.teams.join(', ');
  }
  return user.team || user.team_name || '—';
};

const resolveRole = (user) => user.role || user.membership || (user.is_admin ? 'Administrator' : null) || '—';

const formatDate = (value) => {
  if (!value) {
    return '—';
  }
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    return value;
  }
  return new Date(parsed).toLocaleDateString();
};

const resolveJoined = (user) => formatDate(user.joined || user.joined_at || user.created_at);

const resolveStatus = (user) => {
  if (user.status) {
    return user.status;
  }
  if (typeof user.is_active === 'boolean') {
    return user.is_active ? 'Active' : 'Inactive';
  }
  if (user.last_login) {
    return `Last login: ${formatDate(user.last_login)}`;
  }
  return null;
};

const getUserRowKey = (user, index) =>
  user.id || user.pk || user._id || user.uuid || `${user.username || user.email || 'user'}-${index}`;

const userColumns = [
  {
    key: 'user',
    label: 'User',
    isRowHeader: true,
    render: (user, index) => (
      <div className="d-flex flex-column">
        <span className="fw-semibold">{resolveUserHandle(user, index)}</span>
        {user.email && <span className="text-muted small">{user.email}</span>}
      </div>
    ),
  },
  {
    key: 'name',
    label: 'Name',
    render: (user) => resolveFullName(user),
  },
  {
    key: 'team',
    label: 'Team',
    render: (user) => resolveTeam(user),
  },
  {
    key: 'role',
    label: 'Role',
    render: (user) => resolveRole(user),
  },
  {
    key: 'status',
    label: 'Status',
    render: (user) => resolveStatus(user) || resolveJoined(user) || '—',
  },
];

const Users = () => {
  const { data, error, loading, endpoint, label } = useApiResource('users', 'Users');

  useEffect(() => {
    console.log(`[${label}] Normalized data ready for rendering:`, data);
  }, [data, label]);

  useEffect(() => {
    console.log(`[${label}] Active REST endpoint: ${endpoint}`);
  }, [endpoint, label]);

  return (
    <ResourceTable
      title="Users"
      subtitle="Community members and their engagement"
      columns={userColumns}
      data={data}
      loading={loading}
      error={error}
      emptyMessage="No users found."
      rowKeyGetter={getUserRowKey}
    />
  );
};

export default Users;
// -8000.app.github.dev/api/users/