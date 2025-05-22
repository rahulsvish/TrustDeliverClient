
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Upload, Mail } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <Mail className="h-10 w-10" />,
      title: 'Single Email Check',
      description: 'Instantly verify if an email is deliverable with comprehensive syntax and domain validation.'
    },
    {
      icon: <Upload className="h-10 w-10" />,
      title: 'Bulk Verification',
      description: 'Upload your list and get detailed reports about the deliverability of each email address.'
    },
    {
      icon: <Check className="h-10 w-10" />,
      title: 'Accurate Results',
      description: 'Our system performs multiple validation steps to ensure the highest possible accuracy.'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-white dark:bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Why Choose Our Email Verification Service?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Our platform provides powerful tools to verify email deliverability with accuracy and speed
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow border-0 shadow">
                <CardHeader>
                  <div className="p-3 rounded-full bg-primary/10 inline-flex mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
