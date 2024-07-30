import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">LinearClone</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-white hover:text-gray-300">Features</a></li>
              <li><a href="#method" className="text-white hover:text-gray-300">Method</a></li>
              <li><a href="#customers" className="text-white hover:text-gray-300">Customers</a></li>
              <li><a href="#changelog" className="text-white hover:text-gray-300">Changelog</a></li>
              <li><a href="#pricing" className="text-white hover:text-gray-300">Pricing</a></li>
              <li><a href="#company" className="text-white hover:text-gray-300">Company</a></li>
            </ul>
          </nav>
          <div className="hidden md:flex space-x-4">
            <a href="#contact" className="text-white hover:text-gray-300">Contact</a>
            <a href="#docs" className="text-white hover:text-gray-300">Docs</a>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black" onClick={handleGetStarted}>
              Open app
            </Button>
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="space-y-2">
              <li><a href="#features" className="block text-white hover:text-gray-300">Features</a></li>
              <li><a href="#method" className="block text-white hover:text-gray-300">Method</a></li>
              <li><a href="#customers" className="block text-white hover:text-gray-300">Customers</a></li>
              <li><a href="#changelog" className="block text-white hover:text-gray-300">Changelog</a></li>
              <li><a href="#pricing" className="block text-white hover:text-gray-300">Pricing</a></li>
              <li><a href="#company" className="block text-white hover:text-gray-300">Company</a></li>
              <li><a href="#contact" className="block text-white hover:text-gray-300">Contact</a></li>
              <li><a href="#docs" className="block text-white hover:text-gray-300">Docs</a></li>
              <li>
                <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-black mt-2" onClick={handleGetStarted}>
                  Open app
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </header>
      <main className="container mx-auto px-4 py-20">
        <section className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-6xl font-bold mb-6">LinearClone is a purpose-built tool for planning and building products</h2>
          <p className="text-xl mb-8 text-gray-400">
            Meet the system for modern software development.<br />
            Streamline issues, projects, and product roadmaps.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200" onClick={handleGetStarted}>
              Start building
            </Button>
            <Button variant="link" className="text-gray-400 hover:text-white">
              Introducing Initiatives <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
        <section className="mt-20">
          <img src="/placeholder.svg" alt="LinearClone Interface" className="w-full h-[600px] object-cover rounded-lg" />
        </section>
      </main>
    </div>
  );
};

export default Index;
