import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useNGO } from '../context/NGOContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Heart, LogOut, Utensils, Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';

export default function NGO() {
  const { user, logout } = useAuth();
  const { addOrUpdateRequirement, getRequirementByUser } = useNGO();
  const navigate = useNavigate();
  
  const [ngoName, setNgoName] = useState('');
  const [lunchQuantity, setLunchQuantity] = useState('');
  const [dinnerQuantity, setDinnerQuantity] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'ngo') {
      navigate('/login');
      return;
    }

    // Set NGO name from user displayName
    if (user.displayName) {
      setNgoName(user.displayName);
    }

    // Load existing requirement if any
    const existing = getRequirementByUser(user.username);
    if (existing) {
      setNgoName(existing.ngoName);
      setLunchQuantity(existing.lunchQuantity);
      setDinnerQuantity(existing.dinnerQuantity);
    }
  }, [user, navigate, getRequirementByUser]);

  if (!user || user.role !== 'ngo') {
    return null;
  }

  const existingRequirement = getRequirementByUser(user.username);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ngoName || !lunchQuantity || !dinnerQuantity) {
      toast.error('Please fill in all fields');
      return;
    }

    addOrUpdateRequirement({
      ngoName,
      lunchQuantity,
      dinnerQuantity,
      username: user.username,
    });

    toast.success(existingRequirement ? 'Requirements updated successfully!' : 'Requirements added successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" className="hover:bg-white/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 bg-purple-100 text-purple-700 border-purple-200">
              <Heart className="w-3 h-3 mr-2" />
              {user.displayName || user.username}
            </Badge>
            <Button variant="outline" onClick={handleLogout} className="hover:bg-white">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              NGO Dashboard
            </h1>
            <p className="text-gray-600">Manage your daily food requirements</p>
          </div>

          <div className="grid gap-6">
            {/* Requirement Form */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-purple-600" />
                  Daily Food Requirements
                </CardTitle>
                <CardDescription>
                  {existingRequirement 
                    ? 'Update your organization\'s daily food needs' 
                    : 'Set your organization\'s daily food needs'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="ngoName" className="text-sm font-medium">
                      NGO/Organization Name
                    </Label>
                    <Input
                      id="ngoName"
                      placeholder="e.g., Hope Foundation"
                      value={ngoName}
                      onChange={(e) => setNgoName(e.target.value)}
                      className="h-11 bg-gray-100 cursor-not-allowed"
                      disabled
                      readOnly
                    />
                    <p className="text-xs text-gray-500">Auto-populated from your account</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="lunchQuantity" className="text-sm font-medium flex items-center gap-2">
                        <Sun className="w-4 h-4 text-orange-500" />
                        Lunch Quantity
                      </Label>
                      <Input
                        id="lunchQuantity"
                        placeholder="e.g., 50 plates or 10kg"
                        value={lunchQuantity}
                        onChange={(e) => setLunchQuantity(e.target.value)}
                        className="h-11"
                      />
                      <p className="text-xs text-gray-500">Daily requirement for lunch</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dinnerQuantity" className="text-sm font-medium flex items-center gap-2">
                        <Moon className="w-4 h-4 text-indigo-500" />
                        Dinner Quantity
                      </Label>
                      <Input
                        id="dinnerQuantity"
                        placeholder="e.g., 50 plates or 10kg"
                        value={dinnerQuantity}
                        onChange={(e) => setDinnerQuantity(e.target.value)}
                        className="h-11"
                      />
                      <p className="text-xs text-gray-500">Daily requirement for dinner</p>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90 transition-all shadow-lg"
                  >
                    {existingRequirement ? 'Update Requirements' : 'Save Requirements'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Current Requirements Display */}
            {existingRequirement && (
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                <CardHeader>
                  <CardTitle>Current Requirements</CardTitle>
                  <CardDescription className="text-purple-100">
                    Last updated: {new Date(existingRequirement.updatedAt).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-sm text-purple-100 mb-1">Organization</p>
                      <p className="text-xl font-semibold">{existingRequirement.ngoName}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Sun className="w-5 h-5 text-orange-300" />
                          <p className="text-sm text-purple-100">Lunch</p>
                        </div>
                        <p className="text-xl font-semibold">{existingRequirement.lunchQuantity}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Moon className="w-5 h-5 text-indigo-300" />
                          <p className="text-sm text-purple-100">Dinner</p>
                        </div>
                        <p className="text-xl font-semibold">{existingRequirement.dinnerQuantity}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}