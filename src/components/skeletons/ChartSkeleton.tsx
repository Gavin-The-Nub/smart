import { cn } from '@/lib/utils';

interface ChartSkeletonProps {
  className?: string;
  variant?: 'bar' | 'line' | 'stats';
}

export function ChartSkeleton({ className, variant = 'bar' }: ChartSkeletonProps) {
  if (variant === 'stats') {
    return (
      <div className={cn('space-y-4 animate-pulse', className)}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-24 h-4 bg-muted rounded" />
            <div className="flex-1 h-4 bg-muted rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'line') {
    return (
      <div className={cn('space-y-8 animate-pulse', className)}>
        {/* Line chart placeholder */}
        <div className="h-[200px] bg-gradient-to-b from-muted to-transparent rounded-lg" />
        
        {/* Legend placeholder */}
        <div className="flex justify-center gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-20 h-4 bg-muted rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6 animate-pulse', className)}>
      {/* Bar chart placeholder */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-20 h-4 bg-muted rounded" />
            <div className="flex-1 h-8 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}