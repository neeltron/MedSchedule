import React, {useEffect, useState} from "react";

export default function TimeSlot(props) {
    const [slotNumber, setSlotNumber] = useState('');
    const [slotTime, setSlotTime] = useState('');

    useEffect(() => {
        setSlotNumber(props.slot.number);
        setSlotTime(props.slot.time);
    }, []);

    const handleNumberChange = (event) => {
        setSlotNumber(event.target.value);
    }

    const handleTimeChange = (event) => {
        setSlotTime(event.target.value);
    }
  return (
    <>
        <span class="input-group-text med-input-group--reminder mb-3">
            <input class="form-control med-name med-input--reminder" type="number" name="slotNumber" placeholder="Slot Number" required="" value={slotNumber} onChange={handleNumberChange} />
        </span>
        <span id="slot" class="input-group-text time med-input-group--reminder mb-3">
            <i class="icon ion-ios-alarm"></i>
            <input class="form-control med-time med-input--reminder" type="time" required="" value={slotTime} onChange={handleTimeChange} />
        </span>
    </>
  );
}

