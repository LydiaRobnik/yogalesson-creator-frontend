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
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
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
