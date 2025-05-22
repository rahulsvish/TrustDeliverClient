
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: 'How accurate is the email verification?',
      answer: 'Our email verification service provides up to 98% accuracy through a multi-layer verification process that includes syntax checking, domain validation, mailbox verification, and more.'
    },
    {
      question: 'How long does it take to verify an email?',
      answer: 'Single email verification completes in seconds. For bulk verification, processing time depends on the size of your list, but our system processes thousands of emails per minute.'
    },
    {
      question: 'What file formats are supported for bulk verification?',
      answer: 'We support CSV and TXT files for bulk verification. Each email should be on a new line or in a properly formatted CSV column.'
    },
    {
      question: 'Do you offer refunds if verification results are incorrect?',
      answer: "Yes, we stand behind our service. If our verification results are proven inaccurate and don't match our stated accuracy levels, we offer credit for those verifications."
    },
    {
      question: 'Is there an API available for integration?',
      answer: 'Yes, we provide a comprehensive API that allows you to integrate email verification directly into your applications, CRMs, or other systems.'
    },
    {
      question: 'How do you ensure data privacy and security?',
      answer: 'We take data security seriously. Your email lists are encrypted and we never share, sell, or use your data for any purpose other than verification. We are compliant with GDPR and other privacy regulations.'
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-white dark:bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Everything you need to know about our email verification service
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
