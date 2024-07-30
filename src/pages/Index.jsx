import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Users, Layers, Calendar } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto py-8">
        <h1 className="text-4xl font-bold">LinearClone</h1>
      </header>
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">The issue tracking tool you'll enjoy using</h2>
          <p className="text-xl mb-8">Streamline your projects, supercharge your workflow</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-yellow-400" />}
            title="Lightning Fast"
            description="Experience unparalleled speed and performance"
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-green-400" />}
            title="Team Collaboration"
            description="Work seamlessly with your team members"
          />
          <FeatureCard
            icon={<Layers className="h-8 w-8 text-purple-400" />}
            title="Project Management"
            description="Organize and track your projects effortlessly"
          />
          <FeatureCard
            icon={<Calendar className="h-8 w-8 text-red-400" />}
            title="Milestone Tracking"
            description="Visualize project timelines with Gantt-like views"
          />
        </section>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default Index;
