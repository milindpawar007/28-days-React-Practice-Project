import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function Droppable({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver ? '#e0f7fa' : 'transparent',
    padding: '8px',
    border: '1px dashed #aaa',
    minHeight: '100px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export default Droppable;
