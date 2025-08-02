import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AddressManager } from '@/components/AddressManager';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordChangeForm } from '@/components/PasswordChangeForm';
import { EmailVerificationStatus } from '@/components/EmailVerificationStatus';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { PersonalInfoCard } from '@/components/profile/PersonalInfoCard';
import { SecuritySettingsCard } from '@/components/profile/SecuritySettingsCard';

interface ProfileData {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  avatar_url?: string;
  saved_addresses?: any[];
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      // Convert the database row to our ProfileData interface
      const profileData: ProfileData = data ? {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        avatar_url: data.avatar_url,
        saved_addresses: Array.isArray(data.saved_addresses) ? data.saved_addresses : []
      } : {};
      
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };


  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Please log in to view your profile</h1>
          <Link to="/login">
            <Button size="lg">Sign In</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ProfileHeader onLogout={handleLogout} />
          
          <div className="grid gap-8">
            {/* Email Verification Status */}
            <EmailVerificationStatus />

            {/* Personal Information */}
            <PersonalInfoCard profile={profile} onUpdate={fetchProfile} />

            {/* Address Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Manage Addresses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AddressManager
                  addresses={profile?.saved_addresses || []}
                  onUpdate={fetchProfile}
                />
              </CardContent>
            </Card>

            {/* Change Password */}
            <PasswordChangeForm />

            {/* Security Settings */}
            <SecuritySettingsCard userEmail={user?.email || ''} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
