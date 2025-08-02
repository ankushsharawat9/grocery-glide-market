import { Button } from '@/components/ui/button';
import { Heart, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileHeaderProps {
  onLogout: () => void;
}

export const ProfileHeader = ({ onLogout }: ProfileHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <div className="flex gap-2">
        <Link to="/wishlist">
          <Button variant="outline">
            <Heart className="h-4 w-4 mr-2" />
            My Wishlist
          </Button>
        </Link>
        <Button variant="outline" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};