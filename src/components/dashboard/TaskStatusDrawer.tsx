import type { ReactElement, ReactNode } from 'react';
import { Sheet, SheetCloseButton, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface TaskStatusDrawerProps {
  open: boolean;
  activeTaskCount: number;
  trigger?: ReactElement;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function TaskStatusDrawer({ open, activeTaskCount, trigger, onOpenChange, children }: TaskStatusDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent aria-describedby="task-status-drawer-summary">
        <SheetHeader>
          <div className="min-w-0">
            <SheetTitle>任务</SheetTitle>
            <SheetDescription id="task-status-drawer-summary">
              {activeTaskCount > 0 ? `进行中 ${activeTaskCount} 项` : '查看任务状态与结果'}
            </SheetDescription>
          </div>
          <SheetCloseButton />
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
