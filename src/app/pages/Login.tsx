import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { UtensilsCrossed, ShieldCheck, Heart, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'mess-owner' | 'admin' | 'ngo'>('mess-owner');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const success = login(username, password, userType);
    
    if (success) {
      toast.success('Login successful!');
      if (userType === 'admin') {
        navigate('/admin/dashboard');
      } else if (userType === 'ngo') {
        navigate('/ngo/dashboard');
      } else {
        navigate('/mess-owner/dashboard');
      }
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const userTypeConfig = {
    'mess-owner': {
      icon: UtensilsCrossed,
      color: 'green',
      title: 'Mess Owner Login',
      description: 'Submit leftover food for donation',
      gradient: 'from-green-500 to-emerald-600',
    },
    admin: {
      icon: ShieldCheck,
      color: 'blue',
      title: 'Admin Login',
      description: 'Manage donations and requirements',
      gradient: 'from-blue-500 to-indigo-600',
    },
    ngo: {
      icon: Heart,
      color: 'purple',
      title: 'NGO Login',
      description: 'Manage food requirements',
      gradient: 'from-purple-500 to-pink-600',
    },
  };

  const config = userTypeConfig[userType];
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <Link to="/">
          <Button variant="ghost" className="mb-8 hover:bg-white/50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-md mx-auto">
          <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0">
            <CardHeader className="text-center pb-6">
              <div className={`mx-auto mb-6 w-20 h-20 bg-gradient-to-br ${config.gradient} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {config.title}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {config.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="userType" className="text-sm font-medium">
                    Login As
                  </Label>
                  <Select value={userType} onValueChange={(value: any) => setUserType(value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mess-owner">
                        <div className="flex items-center gap-2">
                          <UtensilsCrossed className="w-4 h-4 text-green-600" />
                          <span>Mess Owner</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-blue-600" />
                          <span>Admin</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="ngo">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-purple-600" />
                          <span>NGO</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11"
                  />
                </div>

                <Button 
                  type="submit" 
                  className={`w-full h-11 bg-gradient-to-r ${config.gradient} hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">Demo Credentials:</p>
                {userType === 'mess-owner' && (
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• leenamess / leenamess123</p>
                    <p>• momskitchen / momskitchen123</p>
                    <p>• elitemess / elitemess123</p>
                    <p>• gokulmess / gokulmess123</p>
                    <p>• vakratundamess / vakratundamess123</p>
                  </div>
                )}
                {userType === 'admin' && (
                  <p className="text-xs text-gray-500">admin / admin123</p>
                )}
                {userType === 'ngo' && (
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• smilefoundation / smilefoundation123</p>
                    <p>• balrakshabharat / balrakshabharat123</p>
                    <p>• helpageindia / helpageindia123</p>
                    <p>• giveindiafoundation / giveindiafoundation123</p>
                    <p>• narayansevasansthan / narayansevasansthan123</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}