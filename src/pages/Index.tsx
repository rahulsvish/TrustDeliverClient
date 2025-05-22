
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Upload, Mail } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUploader } from "@/components/FileUploader";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const singleEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const Index = () => {
  const { toast } = useToast();
  const [checkResult, setCheckResult] = useState<null | { valid: boolean; reason?: string }>(null);
  const [emailChecksCount, setEmailChecksCount] = useState(0);
  const pricingSectionRef = useRef<HTMLElement>(null);

  const form = useForm({
    resolver: zodResolver(singleEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const scrollToPricing = () => {
    pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    toast({
      title: "Limit reached",
      description: "Please purchase a plan to continue using our service",
      duration: 3000,
    });
  };

  const checkEmail = async (data: { email: string }) => {
  if (emailChecksCount >= 2) {
    scrollToPricing();
    form.reset();
    return;
  }

  setCheckResult(null);

  try {
    const response = await fetch("https://trust-deliver-server.vercel.app/validate-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email }),
    });

    const result = await response.json();

    const isValid = result.status.includes("✅");
    setCheckResult({ valid: isValid });

    setEmailChecksCount(prev => prev + 1);

    // toast({
    //   title: isValid ? "Email is deliverable" : "Email is not deliverable",
    //   description: result.status,
    //   duration: 3000,
    // });
  } catch (error) {
    console.error("API error:", error);
    toast({
      title: "Error",
      description: "Failed to check email. Please try again later.",
      duration: 3000,
    });
  }
};


  // const checkEmail = async (data: { email: string }) => {
  //   if (emailChecksCount >= 2) {
  //     scrollToPricing();
  //     form.reset();
  //     return;
  //   }
    
  //   // This is where you'd make your actual API call to check the email
  //   setCheckResult(null);
    
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1500));
    
  //   // Example response (would come from your API)
  //   const mockResult = data.email.includes("invalid") 
  //     ? { valid: false, reason: "Invalid mailbox" }
  //     : { valid: true };
    
  //   setCheckResult(mockResult);
  //   setEmailChecksCount(prev => prev + 1);
    
  //   toast({
  //     title: mockResult.valid ? "Email is deliverable" : "Email is not deliverable",
  //     description: mockResult.reason ? `Reason: ${mockResult.reason}` : "Check complete",
  //     duration: 3000,
  //   });
  // };

  const handleBulkCheckClick = () => {
    scrollToPricing();
  };

  return (
    <div className="min-h-screen">

      <nav className="w-full sticky top-0 z-50 px-4">
  <div className="mx-auto mt-4 max-w-6xl rounded-full backdrop-blur-lg bg-black/30 supports-[backdrop-filter]:bg-black/30 px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        {/* <img
          src="/logo.png" // replace with your actual logo path
          alt="Intent Logo"
          className="w-8 h-8"
        /> */}
        <a href="/" className="text-xl font-semibold text-black">TrustDeliver.fy</a>
      </div>

      {/* Nav Links */}
      {/* <div className="hidden md:flex bg-black/40 px-4 py-2 rounded-full items-center gap-6">
        <a href="/docs" className="text-sm font-medium text-white hover:text-gray-300">Docs</a>
        <a href="/blog" className="text-sm font-medium text-white hover:text-gray-300">Blog</a>
        <a href="/support" className="text-sm font-medium text-white hover:text-gray-300">Support</a>
      </div> */}

      {/* Social Icons */}
      <div className="hidden md:flex items-center gap-4">
        <a href="https://github.com" className="text-white hover:text-gray-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z">
            </path>
          </svg>
        </a>
        <a href="https://discord.com" className="text-white hover:text-gray-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.942 5.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.586 11.586 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3 17.392 17.392 0 0 0-2.868 11.662 15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.638 10.638 0 0 1-1.706-.83c.143-.106.283-.217.418-.331a11.664 11.664 0 0 0 10.118 0c.137.114.277.225.418.331-.544.328-1.116.606-1.71.832a12.58 12.58 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM8.678 14.813a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.929 1.929 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</nav>


      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Email Deliverability Check
              </h1>
              <p className="text-base md:text-lg mb-8 text-gray-600 dark:text-gray-300">
                Verify email addresses in seconds. <br />Ensure your messages reach their destination and improve delivery rates.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-lg shadow-xl overflow-hidden"
            >
              <Card className="border-0 shadow-xl p-5">
                <CardHeader>
                  <CardTitle>Check Email Deliverability</CardTitle>
                  <CardDescription>
                    Verify a single email or upgrade for bulk verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="single" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="single">Single Email</TabsTrigger>
                      <TabsTrigger value="bulk">Bulk Check</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="single" className="space-y-4">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(checkEmail)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <div className="flex space-x-2">
                                    <Input 
                                      placeholder="example@domain.com" 
                                      {...field}
                                      className="flex-grow"
                                    />
                                    <Button 
                                      type="submit" 
                                      disabled={form.formState.isSubmitting}
                                      className="whitespace-nowrap"
                                    >
                                      {form.formState.isSubmitting ? "Checking..." : "Check Now"}
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>

                      {emailChecksCount > 0 && (
                        <div className="text-sm text-muted-foreground mt-2">
                          {emailChecksCount >= 2 
                            ? "You've reached the limit for free checks. Please subscribe for more." 
                            : `${2 - emailChecksCount} free ${emailChecksCount === 1 ? 'check' : 'checks'} remaining.`}
                        </div>
                      )}

                      {checkResult && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4"
                        >
                          <div className={`p-4 rounded-lg flex items-center space-x-3 ${
                            checkResult.valid ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" : 
                            "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                          }`}>
                            {checkResult.valid ? (
                              <Check className="h-5 w-5" />
                            ) : (
                              <Mail className="h-5 w-5" />
                            )}
                            <div>
                              <p className="font-medium">
                                {checkResult.valid ? "Email is deliverable" : "Email is not deliverable"}
                              </p>
                              {checkResult.reason && (
                                <p className="text-sm opacity-90">{checkResult.reason}</p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="bulk">
                      <div className="space-y-4">
                        <div className="text-center py-8">
                          <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
                          <h3 className="text-lg font-medium mb-2">Bulk Email Verification</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Verify thousands of emails at once with our bulk verification service
                          </p>
                          <Button onClick={handleBulkCheckClick}>
                            View Pricing Plans
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 -z-10 opacity-10">
          <svg width="350" height="350" viewBox="0 0 200 200">
            <path
              fill="currentColor"
              d="M42.7,-73.2C55.9,-65.7,67.7,-54.9,75.9,-41.4C84,-28,88.6,-12,87.4,3.6C86.3,19.3,79.4,34.5,69.6,47.2C59.8,59.8,47.1,69.8,32.9,75.3C18.7,80.7,3,81.5,-12.8,79.1C-28.6,76.7,-44.5,71.1,-56.1,60.6C-67.7,50.1,-74.9,34.6,-79.5,17.8C-84.1,0.9,-86,-17.4,-80.2,-32.6C-74.4,-47.8,-60.9,-60,-46.2,-67.5C-31.5,-75,-15.7,-77.9,0,-78C15.8,-78.1,31.5,-73.5,42.7,-73.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="absolute bottom-4 left-1 -z-10 opacity-10">
          <svg width="250" height="250" viewBox="0 0 200 200">
            <path
              fill="currentColor"
              d="M39.7,-65.3C52.9,-60.2,66.1,-52.8,71.7,-41.2C77.3,-29.5,75.3,-13.7,70.9,-0.2C66.5,13.2,59.8,24.1,51.9,33.6C44,43,35,51,24.4,56.4C13.8,61.8,1.5,64.7,-13.1,67.4C-27.8,70.1,-44.8,72.7,-54.2,65.9C-63.7,59.1,-65.5,42.9,-70.5,27.4C-75.4,11.9,-83.5,-2.9,-83,-17.8C-82.5,-32.8,-73.3,-48,-60.8,-55.2C-48.3,-62.3,-32.5,-61.3,-18.6,-64.8C-4.7,-68.2,7.3,-76.1,19.9,-75.5C32.6,-74.9,44.8,-66,54.2,-57.4"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="absolute bottom-0.5 right-16 -z-10 opacity-10 rotate-[-12deg]">
          <svg width="100" height="100" viewBox="0 0 200 200">
            <path
              fill="currentColor"
              d="M45.4,-60.5C59.5,-49.7,71.8,-39.7,76.3,-26.6C80.9,-13.6,77.7,2.6,72.1,18.1C66.4,33.6,58.3,48.5,45.7,56.9C33.1,65.2,16.6,67,-0.8,67.9C-18.3,68.8,-36.6,68.7,-51.4,60.6C-66.1,52.5,-77.2,36.3,-79.4,19.5C-81.6,2.6,-74.9,-14.7,-64.9,-28.6C-55,-42.6,-41.8,-53.1,-27.9,-63.3C-14.1,-73.5,0.4,-83.4,12.9,-80.4C25.5,-77.4,36,-61.3,45.4,-60.5Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Pricing Section */}
      <section ref={pricingSectionRef}>
        <Pricing />
      </section>
      
      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
