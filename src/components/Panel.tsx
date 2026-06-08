import type { ReactNode } from 'react';

export function Panel({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="panel">
      <div className="panel-title">
        <div className="panel-heading">
          {icon}
          <h2>{title}</h2>
        </div>
        {action ? <div className="panel-action">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function StatusPill({
  value,
  tone = 'neutral',
}: {
  value: string;
  tone?: 'neutral' | 'medium' | 'high' | 'critical' | 'ok' | 'warn';
}) {
  return <span className={`status-pill ${tone}`}>{value}</span>;
}
