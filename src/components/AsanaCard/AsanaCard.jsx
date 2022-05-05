import React, { Fragment, useState, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './asanaCard.scss';
import { useDrag, useDrop } from 'react-dnd';

const AsanaCard = ({
  asana,
  key,
  index,
  moveItem,
  dragIndex,
  setDragIndex,
  hoverIndex,
  setHoverIndex
}) => {
  const navigate = useNavigate();
  const { sequenceToAdd } = useOutletContext();

  // ===== functions, variables and states for draggable start =====
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'divAsanaCard',
    id: key,
    item: { ...asana },
    index: index,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  // const [, drop] = useDrop({
  //   accept: 'divAsanaCard',
  //   hover(item, monitor) {
  //     if (!ref.current) {
  //       return;
  //     }

  //     setDragIndex = item.index;
  //     setHoverIndex = item;

  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }

  //     const hoveredCard = ref.current;
  //     const hoverMiddleY = (hoveredCard.bottom - hoveredCard.top) / 2;
  //     const mousePosition = monitor.getClientOffset();
  //     const hoverClientY = mousePosition.y - hoveredCard.top;

  //     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //       return;
  //     }

  //     if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
  //       return;
  //     }

  //     moveItem(dragIndex, hoverIndex);
  //     item.index = hoverIndex;
  //   }
  // });

  // ===== functions for droppable end =====

  const handleSelectAsana = () => {
    sequenceToAdd.asanas.push(asana);
    navigate(`../planner`);
  };

  return (
    <Fragment>
      <div
        ref={drag}
        onClick={handleSelectAsana}
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
    </Fragment>
  );
};

export default AsanaCard;
