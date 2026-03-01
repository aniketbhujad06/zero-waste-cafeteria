import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDonations } from '../context/DonationContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, CheckCircle2, Clock, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { UtensilsCrossed } from 'lucide-react';

export default function MessOwner() {
  const { user, logout } = useAuth();
  const { addDonation, getDonationsByUser } = useDonations();
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState('');
  const [quantity, setQuantity] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');

  useEffect(() => {
    if (!user || user.role !== 'mess-owner') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'mess-owner') {
    return null;
  }

  const myDonations = getDonationsByUser(user.username);
  const filteredDonations = myDonations.filter(donation => {
    if (filter === 'all') return true;
    return donation.status === filter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!foodItems || !quantity) {
      toast.error('Please fill in all fields');
      return;
    }

    addDonation({
      messName: user.displayName || user.username, // Use displayName for mess name
      foodItems,
      quantity,
      username: user.username,
    });

    toast.success('Food donation submitted successfully!');
    setFoodItems('');
    setQuantity('');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const pendingCount = myDonations.filter(d => d.status === 'pending').length;
  const doneCount = myDonations.filter(d => d.status === 'done').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" className="hover:bg-white/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 bg-green-100 text-green-700 border-green-200">
              <UtensilsCrossed className="w-3 h-3 mr-2" />
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
              <UtensilsCrossed className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              {user.displayName || user.username}
            </h1>
            <p className="text-gray-600">Mess Owner Dashboard</p>
          </div>

          <div className="grid gap-6">
            {/* Submission Form */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-green-600" />
                  Submit Food Donation
                </CardTitle>
                <CardDescription>
                  Enter details about leftover food available for donation
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="foodItems" className="text-sm font-medium">
                      Food Items
                    </Label>
                    <Textarea
                      id="foodItems"
                      placeholder="Describe the food items (e.g., Rice, Dal, Vegetables)"
                      value={foodItems}
                      onChange={(e) => setFoodItems(e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-sm font-medium">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      placeholder="Enter quantity (e.g., 5kg, 20 plates)"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 transition-all shadow-lg"
                  >
                    Submit Donation
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-3xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">{myDonations.length}</CardTitle>
                  <CardDescription>Total Submissions</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-3xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{pendingCount}</CardTitle>
                  <CardDescription>In Process</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{doneCount}</CardTitle>
                  <CardDescription>Completed</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* History with Filters */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>My Donation History</CardTitle>
                <CardDescription>
                  Track the status of your food donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="all">All ({myDonations.length})</TabsTrigger>
                    <TabsTrigger value="pending">In Process ({pendingCount})</TabsTrigger>
                    <TabsTrigger value="done">Done ({doneCount})</TabsTrigger>
                  </TabsList>

                  <TabsContent value={filter}>
                    {filteredDonations.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">
                        {filter === 'all' 
                          ? 'No submissions yet. Submit your first donation above.' 
                          : `No ${filter} donations.`}
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {filteredDonations.map((donation) => (
                          <div
                            key={donation.id}
                            className="border-0 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{donation.messName}</h3>
                                <p className="text-sm text-gray-500">
                                  {new Date(donation.submittedAt).toLocaleString()}
                                </p>
                              </div>
                              <Badge
                                variant={donation.status === 'done' ? 'default' : 'secondary'}
                                className={
                                  donation.status === 'done'
                                    ? 'bg-green-100 text-green-800 border-green-200'
                                    : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                }
                              >
                                {donation.status === 'done' ? (
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                ) : (
                                  <Clock className="w-3 h-3 mr-1" />
                                )}
                                {donation.status === 'done' ? 'Collected' : 'In Process'}
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
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}