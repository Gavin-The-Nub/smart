import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface ProgressItem {
  label: string;
  value: number;
  colorToken: 'primary' | 'success' | 'warning' | 'destructive';
}

interface StackedProgressBarsProps extends HTMLAttributes<HTMLDivElement> {
  items: ProgressItem[];
  total: number;
  showLabels?: boolean;
  showLegend?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export function StackedProgressBars({
  items,
  total,
  showLabels = true,
  showLegend = true,
  height = 'md',
  className,
  ...props
}: StackedProgressBarsProps) {
  const heightClass = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  }[height];

  const colorClass = (colorToken: ProgressItem['colorToken']) => ({
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    destructive: 'bg-destructive-500'
  }[colorToken]);

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {/* Progress bar */}
      <div className={cn('flex rounded-full overflow-hidden bg-muted', heightClass)}>
        {items.map((item, index) => {
          const width = (item.value / total) * 100;
          const isFirst = index === 0;
          const isLast = index === items.length - 1;
          
          return (
            <div
              key={item.label}
              className={cn(
                'transition-all duration-300',
                colorClass(item.colorToken),
                {
                  'rounded-l-full': isFirst,
                  'rounded-r-full': isLast
                }
              )}
              style={{ width: `${width}%` }}
            >
              {showLabels && width > 15 && (
                <div className="px-2 text-xs text-white font-medium flex items-center justify-center h-full">
                  {item.value.toLocaleString()}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap gap-4 text-sm">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={cn('w-3 h-3 rounded', colorClass(item.colorToken))} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}