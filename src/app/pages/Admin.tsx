import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDonations } from '../context/DonationContext';
import { useNGO } from '../context/NGOContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, CheckCircle2, Clock, LogOut, UtensilsCrossed, Heart, Sun, Moon, ShieldCheck, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function Admin() {
  const { user, logout } = useAuth();
  const { donations, markAsDone } = useDonations();
  const { requirements } = useNGO();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleMarkDone = (id: string) => {
    markAsDone(id);
    toast.success('Donation marked as collected!');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data to sample data? This will clear all current data.')) {
      localStorage.removeItem('foodDonations');
      localStorage.removeItem('ngoRequirements');
      window.location.reload();
      toast.success('Data reset successfully! Refreshing...');
    }
  };

  const pendingDonations = donations.filter(d => d.status === 'pending');
  const completedDonations = donations.filter(d => d.status === 'done');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" className="hover:bg-white/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">
              <ShieldCheck className="w-3 h-3 mr-2" />
              {user.username}
            </Badge>
            <Button variant="outline" onClick={handleLogout} className="hover:bg-white">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <Button variant="outline" onClick={handleResetData} className="hover:bg-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Data
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage donations and NGO requirements</p>
          </div>

          <Tabs defaultValue="donations" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-white/80 backdrop-blur-sm shadow-lg">
              <TabsTrigger value="donations" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
                <UtensilsCrossed className="w-4 h-4 mr-2" />
                Mess Donations
              </TabsTrigger>
              <TabsTrigger value="ngos" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white">
                <Heart className="w-4 h-4 mr-2" />
                NGO Requirements
              </TabsTrigger>
            </TabsList>

            {/* Mess Donations Tab */}
            <TabsContent value="donations" className="space-y-6">
              {/* Statistics */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-3xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">{donations.length}</CardTitle>
                    <CardDescription>Total Donations</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-3xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{pendingDonations.length}</CardTitle>
                    <CardDescription>Pending Collection</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{completedDonations.length}</CardTitle>
                    <CardDescription>Collected</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* Pending Donations */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b bg-gradient-to-r from-yellow-50 to-orange-50">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    Pending Donations
                  </CardTitle>
                  <CardDescription>
                    Food donations waiting to be collected
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {pendingDonations.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      No pending donations at the moment.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {pendingDonations.map((donation) => (
                        <div
                          key={donation.id}
                          className="border-0 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{donation.messName}</h3>
                              <p className="text-sm text-gray-500">
                                Submitted by: {donation.username}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(donation.submittedAt).toLocaleString()}
                              </p>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          </div>
                          <div className="space-y-2 mb-4">
                            <p className="text-sm">
                              <span className="font-medium">Food Items:</span> {donation.foodItems}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Quantity:</span> {donation.quantity}
                            </p>
                          </div>
                          <Button
                            onClick={() => handleMarkDone(donation.id)}
                            className="w-full h-11 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 transition-all shadow-lg"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Mark as Collected
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Completed Donations */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Collected Donations
                  </CardTitle>
                  <CardDescription>
                    Successfully collected food donations
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {completedDonations.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      No collected donations yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {completedDonations.map((donation) => (
                        <div
                          key={donation.id}
                          className="border-0 rounded-lg p-4 bg-gradient-to-r from-green-50 to-emerald-50 shadow-md"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{donation.messName}</h3>
                              <p className="text-sm text-gray-500">
                                Submitted by: {donation.username}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(donation.submittedAt).toLocaleString()}
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Collected
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">Food Items:</span> {donation.foodItems}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Quantity:</span> {donation.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* NGO Requirements Tab */}
            <TabsContent value="ngos" className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{requirements.length}</CardTitle>
                  <CardDescription>Total NGOs Registered</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-purple-600" />
                    NGO Food Requirements
                  </CardTitle>
                  <CardDescription>
                    Daily food requirements from registered NGOs
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {requirements.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      No NGO requirements registered yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {requirements.map((req) => (
                        <div
                          key={req.id}
                          className="border-0 rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow"
                        >
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {req.ngoName}
                              </h3>
                              <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                                {req.username}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              Last updated: {new Date(req.updatedAt).toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
                                  <Sun className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-medium text-gray-700">Lunch Requirement</span>
                              </div>
                              <p className="text-2xl font-bold text-gray-900">{req.lunchQuantity}</p>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-lg flex items-center justify-center">
                                  <Moon className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-medium text-gray-700">Dinner Requirement</span>
                              </div>
                              <p className="text-2xl font-bold text-gray-900">{req.dinnerQuantity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}