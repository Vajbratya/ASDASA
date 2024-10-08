import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PenTool, Trash2 } from "lucide-react";
import { motion } from 'framer-motion';

interface AutoTextoTriggerProps {
  trigger: {
    id: number;
    trigger: string;
    content: string;
    tags: string[];
    category: string;
    conditions: string[];
  };
  onEdit: (trigger: AutoTextoTriggerProps['trigger']) => void;
  onDelete: (trigger: AutoTextoTriggerProps['trigger']) => void;
}

const AutoTextoTrigger: React.FC<AutoTextoTriggerProps> = ({ trigger, onEdit, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    <Card className="mb-2">
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-medium flex justify-between items-center">
          <span>{trigger.trigger}</span>
          <div>
            <Button variant="ghost" size="icon" onClick={() => onEdit(trigger)} aria-label="Edit trigger">
              <PenTool className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(trigger)} aria-label="Delete trigger">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-xs mb-2 text-muted-foreground">{trigger.content}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {trigger.tags && trigger.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
        {trigger.conditions && trigger.conditions.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-semibold mb-1">Conditions (must not be met):</p>
            <ul className="text-xs list-disc list-inside">
              {trigger.conditions.map((condition, index) => (
                <li key={index} className="text-muted-foreground">{condition}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

export default AutoTextoTrigger;