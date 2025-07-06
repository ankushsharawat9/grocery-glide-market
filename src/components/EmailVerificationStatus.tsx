
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const EmailVerificationStatus = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [lastSentAt, setLastSentAt] = useState<Date | null>(null);

  const isEmailVerified = user?.email_confirmed_at != null;

  const handleResendVerification = async () => {
    if (!user?.email) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;

      toast.success('Verification email sent! Please check your inbox.');
      setLastSentAt(new Date());
    } catch (error: any) {
      console.error('Resend verification error:', error);
      toast.error(error.message || 'Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  const canResend = !lastSentAt || (Date.now() - lastSentAt.getTime()) > 60000; // 1 minute cooldown

  if (isEmailVerified) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Your email address is verified.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-yellow-200 bg-yellow-50">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        <div className="flex items-center justify-between">
          <span>Your email address is not verified yet.</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResendVerification}
            disabled={loading || !canResend}
            className="ml-4"
          >
            <Mail className="h-4 w-4 mr-2" />
            {loading ? 'Sending...' : 'Resend Email'}
          </Button>
        </div>
        {lastSentAt && (
          <p className="text-sm mt-2">
            Last sent: {lastSentAt.toLocaleTimeString()}
          </p>
        )}
      </AlertDescription>
    </Alert>
  );
};
