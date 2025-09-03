import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Database, Zap, Target, ArrowRight } from "lucide-react";
import { HeroGeometric } from "../components/ui/shape-landing-hero";
import { FeatureCard } from "../components/ui/FeatureCard";
import { Button } from "../components/ui/button";
import { Header } from "../components/layout/Header";

const features = [
  {
    icon: Database,
    title: "SharePoint Integration",
    description: "Securely fetches customer complaints from SharePoint with intelligent filtering and categorization for streamlined processing."
  },
  {
    icon: Zap,
    title: "Smart Analysis", 
    description: "AI-powered categorization and priority detection that automatically assigns urgency levels based on complaint content and customer impact."
  },
  {
    icon: Target,
    title: "Jira Automation",
    description: "Creates properly formatted tickets with team routing, ensuring complaints reach the right department with all necessary context."
  }
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <HeroGeometric
          badge="AI-Powered Agent"
          title1="TelecomMaster"
          title2="Intelligent Complaint Resolution"
        />
        
        {/* CTA Section overlaid on hero */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-center"
          >
            <Button variant="cta" size="lg" asChild className="text-xl px-12 py-6">
              <Link to="/chat" className="flex items-center gap-3">
                Process Customer Complaints
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powered by Intelligence
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your customer support workflow with AI-driven automation that understands, categorizes, and routes complaints efficiently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.2 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to streamline your complaint management?
            </h3>
            <p className="text-muted-foreground text-lg mb-8">
              Let TelecomMaster handle the complexity while your team focuses on resolution.
            </p>
            <Button variant="hero" size="lg" asChild className="text-lg px-10 py-4">
              <Link to="/chat">
                Get Started Now
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}