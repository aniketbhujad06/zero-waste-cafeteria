import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { UtensilsCrossed, ShieldCheck, Heart, ArrowRight, Sparkles } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Fighting Hunger, Reducing Waste</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Food Donation Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connecting mess owners with those in need. Help reduce food waste and feed orphanages & NGOs.
          </p>
        </div>

        {/* Main CTA Card */}
        <div className="max-w-md mx-auto mb-16">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all transform hover:-translate-y-1">
            <CardHeader className="text-center pb-6 pt-8">
              <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Sign in to make a difference
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
              <Link to="/login">
                <Button 
                  size="lg" 
                  className="w-full h-14 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:opacity-90 transition-all text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
                >
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <UtensilsCrossed className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Mess Owners</CardTitle>
              <CardDescription className="text-sm">
                Submit leftover food details for donation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Admins</CardTitle>
              <CardDescription className="text-sm">
                Manage donations and coordinate distribution
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">NGOs</CardTitle>
              <CardDescription className="text-sm">
                Manage daily food requirements
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How it Works */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl text-2xl font-bold mb-4 shadow-lg">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Submit Leftovers</h3>
              <p className="text-gray-600">Mess owners submit leftover food details</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl text-2xl font-bold mb-4 shadow-lg">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Admin Collection</h3>
              <p className="text-gray-600">Admin coordinates and collects the food</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl text-2xl font-bold mb-4 shadow-lg">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Feed Communities</h3>
              <p className="text-gray-600">Donate to orphanages & NGOs in need</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}