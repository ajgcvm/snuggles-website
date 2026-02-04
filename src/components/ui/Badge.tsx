interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-stone-100 text-stone-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// Status-specific badges for bookings
export function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { variant: BadgeProps['variant']; label: string }> = {
    // Booking statuses
    pending: { variant: 'warning', label: 'Pending Review' },
    pending_meetgreet: { variant: 'info', label: 'Needs M&G' },
    confirmed: { variant: 'success', label: 'Booking Confirmed' },
    completed: { variant: 'default', label: 'Stay Completed' },
    cancelled: { variant: 'danger', label: 'Cancelled' },
    // Client statuses
    new: { variant: 'warning', label: 'New Client' },
    approved: { variant: 'success', label: 'Approved' },
    blocked: { variant: 'danger', label: 'Blocked' },
  };

  const config = statusConfig[status] || { variant: 'default', label: status };

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
