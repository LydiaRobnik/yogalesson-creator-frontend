import React, { useState } from 'react';
import AsanaCard from '../AsanaCard/AsanaCard';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './sequencePlanned.scss';
import { useDrop } from 'react-dnd';

const SequencePlanned = ({ sequence }) => {
  const { yogaClassToAdd, setYogaClassToAdd } = useOutletContext();
  const navigate = useNavigate();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'divAsanaCard',
    drop: (id, item, index, monitor) => {
      // onDrop(id, item, index, monitor);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  // const [items, setItems] = useState(sequence.asanas);
  // const [dragIndex, setDragIndex] = useState(null);
  // const [hoverIndex, setHoverIndex] = useState(null);

  // const onDrop = (id, item, monitor) => {
  //   const oldItems = [...items];
  //   const movedItem = oldItems.find((item, index) => index === dragIndex);
  //   const remainingItems = oldItems.filter(
  //     (item, index) => index !== dragIndex
  //   );
  //   const reorderesItems = [
  //     ...remainingItems.slice(0, hoverIndex),
  //     movedItem,
  //     ...remainingItems.slice(hoverIndex)
  //   ];
  //   console.log('reorderesItems:', reorderesItems);
  //   setItems(reorderesItems);
  //   return reorderesItems;

  // };

  // insert item back to the array
  // const moveItem = (dragIndex, hoverIndex) => {
  //   const oldItems = [...items];

  //   const item = oldItems(dragIndex);

  //   const newItems = items.filter((i, idx) => idx !== dragIndex);
  //   newItems.splice(hoverIndex, 0, item);
  //   setItems(newItems);

  // };

  // const [{ isOver }, drop] = useDrop(() => ({
  //   accept: 'divAsanaCard',
  //   drop: (item, monitor) => {
  //     onDrop(item, monitor);
  //   },
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver()
  //   })
  // }));

  const handleRemoveSequence = (sequence) => {
    const sequenceToRemove = yogaClassToAdd.plan.indexOf(sequence);
    yogaClassToAdd.plan.splice(sequenceToRemove, 1);
    setYogaClassToAdd({ ...yogaClassToAdd });
  };

  return (
    <>
      <div className="w-screen min-h-40">
        <h3 className="color-blue-darkest pl-3 p-3 font-bold text-xl">
          {sequence.title}
        </h3>
        <p className="color-blue-darkest">
          {new Date(sequence.modifiedAt).toLocaleString()}
        </p>
        <span
          className="font-material-symbols color-blue-darkest cursor-pointer"
          onClick={() => handleRemoveSequence(sequence)}
        >
          delete
        </span>
      </div>

      <>
        <div className="w-screen min-h-40">
          <p className="color-blue-darkest pl-3 py-3">{sequence.description}</p>
        </div>

        {/* ref={drop} */}

        <div className="flex flex-wrap">
          {/* {React.cloneElement(children, { isOver })} */}
          {sequence &&
            sequence.asanas.map((asana, index) => (
              <div key={asana._id + Math.random()}>
                <AsanaCard
                  asana={asana}
                  // dragIndex={dragIndex}
                  // setDragIndex={setDragIndex}
                  // hoverIndex={hoverIndex}
                  // setHoverIndex={setHoverIndex}
                  // moveItem={moveItem}
                />
              </div>
            ))}
        </div>
      </>
    </>
  );
};

export default SequencePlanned;
