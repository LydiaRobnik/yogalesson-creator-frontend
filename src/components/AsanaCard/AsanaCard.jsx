import React, { useRef, useState } from 'react';
// import { useNavigate, useOutletContext } from 'react-router-dom';
import './asanaCard.scss';
import { useDrag, useDrop } from 'react-dnd';

const AsanaCard = ({
  asana,
  handleSelectAsana,
  key,
  index,
  moveCard,
  sizeAsanaOnSelectModal,
  sequencePlannedStyles
}) => {
  // const navigate = useNavigate();
  // const { sequenceToAdd } = useOutletContext();

  // ==start== functions, variables and states for draggable start =====
  const ref = useRef(null);
  const dragItem = useRef({});

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
      const hoverClientY = clientOffset.x - hoverBoundingRect.left;

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

  // ==ende== functions, variables and states for draggable ====

  const smallName = (name) => {
    if (name.length > 14) {
      return 'smallName';
    } else return 'text-xs';
  };

  return (
    <>
      <div
        ref={ref}
        onClick={() => handleSelectAsana(asana)}
        data-handler-id={handlerId}
        className={`flex flex-col content-center self-center justify-between rounded overflow-hidden shadow-lg cursor-pointer ${
          isDragging
            ? 'border-4 border-rose-400 opacity-50'
            : 'bg-white opacity-100 border-2 border-gray-200'
        } 
        ${sizeAsanaOnSelectModal ? 'w-32 h-48 ' : 'w-28 h-28'} 
        `}
      >
        <div className="flex flex-row justify-center">
          <img
            className={`${sizeAsanaOnSelectModal ? '' : 'w-12 mt-2'}`}
            src={asana.img_url}
            alt="preview class"
          />
        </div>
        <div
          className={` p-1 rounded-b ${
            asana.default ? 'bg-light color-blue-darkest' : 'bg-red color-light'
          }  ${sizeAsanaOnSelectModal ? 'h-20 text-left' : ''}`}
        >
          <h3 className={`font-bold ${smallName(asana.asana.sanskrit)}`}>
            {asana.asana.sanskrit}
          </h3>
          <h3 className={`font-bold ${smallName(asana.asana.name)} }`}>
            {asana.asana.name}
          </h3>
        </div>
      </div>
    </>
  );
};

export default AsanaCard;
