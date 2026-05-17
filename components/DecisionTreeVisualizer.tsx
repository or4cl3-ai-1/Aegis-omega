
import React from 'react';
import { motion } from 'motion/react';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  depth: number;
}

const DecisionTreeVisualizer: React.FC<{ data: TreeNode }> = ({ data }) => {
  const renderNode = (node: TreeNode, x: number, y: number, angle: number, length: number) => {
    const endX = x + Math.cos((angle * Math.PI) / 180) * length;
    const endY = y + Math.sin((angle * Math.PI) / 180) * length;

    return (
      <g key={node.id}>
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: node.depth * 0.2 }}
          x1={x}
          y1={y}
          x2={endX}
          y2={endY}
          stroke={node.depth % 2 === 0 ? '#8b5cf6' : '#22d3ee'}
          strokeWidth={4 / (node.depth + 1)}
          strokeOpacity={0.6}
        />
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: node.depth * 0.3 }}
          cx={endX}
          cy={endY}
          r={2}
          fill={node.depth % 2 === 0 ? '#d946ef' : '#fff'}
          className="drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
        />
        {node.children?.map((child, i) => {
          const spread = 60;
          const childAngle = angle - spread / 2 + (spread / (node.children!.length + 1)) * (i + 1);
          return renderNode(child, endX, endY, childAngle, length * 0.7);
        })}
      </g>
    );
  };

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 500 500" className="drop-shadow-[0_0_20px_rgba(139,92,246,0.2)]">
        {renderNode(data, 250, 450, -90, 80)}
      </svg>
    </div>
  );
};

export default DecisionTreeVisualizer;
