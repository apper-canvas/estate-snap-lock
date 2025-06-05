import React from 'react';
      import { motion } from 'framer-motion';
      import Button from '../atoms/Button';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import Badge from '../atoms/Badge';

      const QuickActions = () => {
        const actions = [
          { name: 'Map View', icon: 'MapPin', status: 'Coming Soon' },
          { name: 'Mortgage Calculator', icon: 'Calculator', status: 'Coming Soon' },
          { name: 'Find Agent', icon: 'Users', status: 'Coming Soon' },
        ];

        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {actions.map((action, index) => (
              <Button 
                key={index}
                className="group px-4 py-2 bg-white rounded-full shadow-card hover:shadow-card-hover transition-all border border-surface-100 flex items-center space-x-2"
                variant="outline"
              >
                <Icon name={action.icon} className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <Text as="span" className="text-sm font-medium text-surface-700">{action.name}</Text>
                <Badge className="bg-secondary/10 text-secondary">{action.status}</Badge>
              </Button>
            ))}
          </motion.div>
        );
      };

      export default QuickActions;