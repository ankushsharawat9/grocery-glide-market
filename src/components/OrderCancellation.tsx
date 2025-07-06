
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface OrderCancellationProps {
  orderId: string;
  onCancelled: () => void;
}

const cancellationReasons = [
  'Changed my mind',
  'Found a better price elsewhere',
  'Ordered by mistake',
  'Product not needed anymore',
  'Delivery time is too long',
  'Payment issues',
  'Other'
];

export const OrderCancellation = ({ orderId, onCancelled }: OrderCancellationProps) => {
  const { user } = useAuth();
  const [selectedReason, setSelectedReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCancel = async () => {
    if (!selectedReason) {
      toast.error('Please select a reason for cancellation');
      return;
    }

    setLoading(true);
    try {
      // Insert cancellation record
      const { error: cancellationError } = await supabase
        .from('order_cancellations')
        .insert({
          order_id: orderId,
          user_id: user?.id,
          reason: selectedReason
        });

      if (cancellationError) throw cancellationError;

      // Update order status
      const { error: orderError } = await supabase
        .from('orders')
        .update({
          status: 'cancelled',
          cancelled_at: new Date().toISOString(),
          cancellation_reason: selectedReason
        })
        .eq('id', orderId);

      if (orderError) throw orderError;

      toast.success('Order cancelled successfully');
      setOpen(false);
      onCancelled();
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <X className="h-4 w-4 mr-2" />
          Cancel Order
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Order</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Please select a reason for cancelling this order:
          </p>
          <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
            {cancellationReasons.map((reason) => (
              <div key={reason} className="flex items-center space-x-2">
                <RadioGroupItem value={reason} id={reason} />
                <Label htmlFor={reason} className="text-sm">{reason}</Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Keep Order
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={loading || !selectedReason}
            >
              {loading ? 'Cancelling...' : 'Cancel Order'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
