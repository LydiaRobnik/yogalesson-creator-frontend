import React, { Fragment, useState, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './asanaCard.scss';
import { useDrag, useDrop } from 'react-dnd';

const AsanaCard = ({ asana, key, index, moveCard }) => {
  const navigate = useNavigate();
  const { sequenceToAdd } = useOutletContext();

  // ===== functions, variables and states for draggable start =====
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'divAsanaCard',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'divAsanaCard',
    item: () => {
      return { key, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  // ===== functions for droppable end =====

  const handleSelectAsana = () => {
    sequenceToAdd.asanas.push(asana);
    navigate(`../planner`);
  };

  return (
    <>
      <div
        ref={ref}
        onClick={handleSelectAsana}
        data-handler-id={handlerId}
        // className="asanacard-jsx rounded overflow-hidden shadow-lg m-2  bg-white cursor-pointer"
        className={`asanacard-jsx rounded overflow-hidden shadow-lg m-2  cursor-pointer ${
          isDragging ? 'bg-rose-400 opacity-50' : 'bg-white opacity-100'
          // isDragging ? 'opacity-75' : ' opacity-100'
        }`}
      >
        <img className="" src={asana.img_url} alt="preview class" />
        <div className="px-6 pt-3 pb-3 bg-light h-20">
          <h3 className="color-blue-darkest font-bold text-xs">
            {asana.asana.sanskrit}
          </h3>
          <h3 className="color-blue-darkest text-xs">{asana.asana.name}</h3>
        </div>
      </div>
    </>
  );
};

export default AsanaCard;
