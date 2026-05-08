import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppSupportLink } from '@/lib/whatsappService';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={getWhatsAppSupportLink()}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-colors"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  );
}