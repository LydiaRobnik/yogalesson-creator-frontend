import React, { useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './asanaCard.scss';
import { useDrag, useDrop } from 'react-dnd';

const AsanaCard = ({
  asana,
  handleSelectAsana,
  key,
  index,
  moveCard,
  sizeAsanaOnSelectModal,
  showAsanaInMySequences,
  asanaInPlanner
}) => {
  const navigate = useNavigate();
  const { sequenceToAdd } = useOutletContext();

  // ==start== functions, variables and states for draggable start =====
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
        // className="asanacard-jsx rounded overflow-hidden shadow-lg m-2  bg-white cursor-pointer"
        className={`flex flex-col rounded overflow-hidden shadow-lg  cursor-pointer ${
          isDragging
            ? 'border-rose-400 opacity-50'
            : 'bg-white opacity-100 border-2 border-gray-200'
          // isDragging ? 'opacity-75' : ' opacity-100'
        } ${sizeAsanaOnSelectModal ? 'w-32' : ''} ${
          showAsanaInMySequences || asanaInPlanner ? 'w-28' : ''
        }`}
      >
        <img
          className={`self-center ${
            showAsanaInMySequences || asanaInPlanner ? 'w-12' : ''
          }`}
          src={asana.img_url}
          alt="preview class"
        />
        <div
          className={` p-1 ${
            asana.default ? 'bg-light color-blue-darkest' : 'bg-red color-light'
          }  ${
            showAsanaInMySequences || asanaInPlanner ? '' : 'h-20 text-left'
          }`}
        >
          <h3 className={`font-bold ${smallName(asana.asana.sanskrit)}`}>
            {asana.asana.sanskrit}
          </h3>
          <h3
            className={`font-bold ${
              showAsanaInMySequences || asanaInPlanner
                ? smallName(asana.asana.sanskrit)
                : ''
            }`}
          >
            {asana.asana.name}
          </h3>
        </div>
      </div>
    </>
  );
};

export default AsanaCard;
