import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SecuritySettingsCardProps {
  userEmail: string;
}

export const SecuritySettingsCard = ({ userEmail }: SecuritySettingsCardProps) => {
  const handlePasswordReset = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(userEmail);
      if (error) throw error;
      toast.success('Password reset email sent');
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to send password reset email');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Password Reset</h4>
            <p className="text-sm text-gray-600 mb-3">
              Send a password reset link to your email address
            </p>
            <Button variant="outline" onClick={handlePasswordReset}>
              Send Reset Link
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Account Security</h4>
            <p className="text-sm text-gray-600 mb-3">
              For your security, changing your email or password will log you out from all devices.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};