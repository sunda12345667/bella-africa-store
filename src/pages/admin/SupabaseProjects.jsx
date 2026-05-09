import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { RefreshCw, ExternalLink, Database, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const statusColors = {
  ACTIVE_HEALTHY: 'bg-green-100 text-green-700',
  ACTIVE_UNHEALTHY: 'bg-yellow-100 text-yellow-700',
  INACTIVE: 'bg-gray-100 text-gray-600',
  COMING_UP: 'bg-blue-100 text-blue-700',
  GOING_DOWN: 'bg-orange-100 text-orange-700',
  PAUSED: 'bg-gray-100 text-gray-500',
  REMOVED: 'bg-red-100 text-red-700',
  RESTORING: 'bg-purple-100 text-purple-700',
};

const statusLabel = {
  ACTIVE_HEALTHY: 'Active',
  ACTIVE_UNHEALTHY: 'Unhealthy',
  INACTIVE: 'Inactive',
  COMING_UP: 'Starting',
  GOING_DOWN: 'Stopping',
  PAUSED: 'Paused',
  REMOVED: 'Removed',
  RESTORING: 'Restoring',
};

export default function SupabaseProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    const res = await base44.functions.invoke('getSupabaseProjects', {});
    setProjects(res.data.projects || []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Database className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold">Supabase Projects</h1>
            <p className="text-sm text-muted-foreground">All projects from your connected Supabase account</p>
          </div>
        </div>
        <Button variant="outline" onClick={fetchProjects} disabled={loading} className="gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-700 mb-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
          <Database className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-heading font-semibold text-lg">No Projects Found</h3>
          <p className="text-muted-foreground text-sm mt-1">No Supabase projects exist on this account yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map(project => (
            <div key={project.id} className="bg-card border rounded-2xl p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-heading font-semibold">{project.name}</h3>
                    <Badge className={`text-xs ${statusColors[project.status] || 'bg-gray-100 text-gray-600'}`}>
                      {statusLabel[project.status] || project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    <span className="font-mono">{project.ref}</span>
                    {project.region && <span> · {project.region}</span>}
                    {project.organization_id && <span> · Org: {project.organization_id}</span>}
                  </p>
                </div>
              </div>
              <a
                href={`https://supabase.com/dashboard/project/${project.ref}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open
                </Button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}