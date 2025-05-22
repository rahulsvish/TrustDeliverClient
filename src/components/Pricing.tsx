
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from 'lucide-react';

export const Pricing = () => {
  const pricingPlans = [
    {
      name: 'Basic',
      description: 'Perfect for small businesses and startups',
      price: '680',
      features: [
        '5,000 email verifications monthly',
        'Single email verification',
        'Syntax and domain validation',
        'Email format check',
        'Basic API access'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      description: 'For growing teams and businesses',
      price: '2560',
      features: [
        '25,000 email verifications monthly',
        'Bulk verification upload',
        'Detailed deliverability reports',
        'Export results to CSV/Excel',
        'Advanced API access',
        'Priority support'
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'Customized for large organizations',
      price: '4670',
      features: [
        '100,000+ email verifications monthly',
        'Custom verification rules',
        'Dedicated account manager',
        'Advanced analytics dashboard',
        'Custom integrations',
        '24/7 priority support'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Choose the plan that's right for your business
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full ${plan.popular ? 'border-primary shadow-lg relative' : 'shadow'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">Rs {plan.price}</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
