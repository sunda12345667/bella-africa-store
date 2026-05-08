import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Users, Leaf } from 'lucide-react';

const VALUES = [
  { icon: Heart, title: 'Authenticity', desc: 'Every product is sourced from trusted suppliers who share our commitment to genuine African flavors.' },
  { icon: Globe, title: 'Heritage', desc: 'We celebrate the rich culinary traditions of Africa, making them accessible to the diaspora worldwide.' },
  { icon: Users, title: 'Community', desc: 'Built by Africans, for Africans. We understand the longing for the taste of home.' },
  { icon: Leaf, title: 'Quality', desc: 'From farm to table, we ensure every item meets our premium quality standards.' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-accent text-sm font-medium tracking-widest uppercase">Our Story</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3">About Bella Africa</h1>
            <p className="mt-6 text-lg text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
              Born from a deep love for African culture and cuisine, Bella Africa Store is based in Beaumont, Alberta — 
              serving the African diaspora across Canada with authentic Nigerian and African groceries, spices, frozen foods and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent text-sm font-medium tracking-widest uppercase">Our Mission</span>
              <h2 className="text-3xl font-heading font-bold mt-2">Bringing Africa Home</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We understand what it means to miss the flavors you grew up with. That's why we've created 
                a seamless shopping experience that brings authentic African groceries directly to your door.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                From the finest Nigerian foodstuffs to fresh African produce, every item in our store 
                has been carefully selected to ensure you get the same quality you'd find at your 
                favorite market back home.
              </p>
            </div>
            <div className="bg-muted rounded-3xl p-8 text-center">
              <p className="text-5xl font-heading font-bold text-accent">76+</p>
              <p className="text-muted-foreground mt-2">Authentic Products</p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
               <div>
                 <p className="text-2xl font-heading font-bold">500+</p>
                 <p className="text-sm text-muted-foreground">Happy Customers</p>
               </div>
               <div>
                 <p className="text-2xl font-heading font-bold">🇨🇦</p>
                 <p className="text-sm text-muted-foreground">Canada-Wide</p>
               </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-medium tracking-widest uppercase">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border/50 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}