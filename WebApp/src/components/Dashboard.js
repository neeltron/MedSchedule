import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router";
import { magic } from "../magic";
import axios from "axios";
import Loading from "./Loading";
import TimeSlot from "./TimeSlot";

import { db } from "../firebase";

export default function Profile() {
    const [userMetadata, setUserMetadata] = useState();
    const [reminders, setReminders] = useState([]);
    const [medicine, setMedicine] = useState('');
    const [slotNumber, setSlotNumber] = useState('');
    const [slotTime, setSlotTime] = useState('');
    const history = useHistory();
    const collectionRef = db.collection("reminders");

    useEffect(() => {
        // On mount, we check if a user is logged in.
        // If so, we'll retrieve the authenticated user's profile.
        magic.user.isLoggedIn().then(magicIsLoggedIn => {
        if (magicIsLoggedIn) {
            magic.user.getMetadata().then(metaData => {
                setUserMetadata(metaData);
                console.log(metaData);
                collectionRef.doc(metaData.email).onSnapshot(reminderDoc => {
                    if(reminderDoc.exists) {
                        console.log(reminderDoc.data());
                        setMedicine(reminderDoc.data().medicine);
                        setReminders(reminderDoc.data().reminders);
                    }
                });
            });
            
        } else {
            // If no user is logged in, redirect to `/login`
            history.push("/login");
        }
        });
    }, []);

    /**
   * Perform logout action via Magic.
   */
    const logout = useCallback(() => {
        magic.user.logout().then(() => {
            history.push("/login");
        })
    }, [history]);

    const handleNumberChange = (event) => {
        setSlotNumber(event.target.value);
    }

    const handleTimeChange = (event) => {
        setSlotTime(event.target.value);
    }

    const handleMedicineChange = (event) => {
        setMedicine(event.target.value);
    }

    const newSlot = () => {
        const [hour, minute] = slotTime.split(':');
        if(medicine && hour && minute && slotNumber) {
            console.log(hour, minute, slotNumber);
            const filteredReminders = reminders.filter(reminder => reminder.slotNumber === slotNumber);
            if(filteredReminders.length > 0) {
                alert('Slot already added')
                // TODO: Handle error
                return;
            }
            fetch(`https://ratificate.us/ReMedy/getCommand.php?time=${hour}${minute}00&slot=${slotNumber}`, {
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                console.log(response);
                reminders.push({
                    slotNumber: slotNumber,
                    time: slotTime
                });
                collectionRef.doc(userMetadata.email).set({
                    medicine, reminders
                })
                .then(() => {
                    console.log("Firebase insertion done");
                    setSlotTime('');
                    setSlotNumber('');
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    // TODO: Handle error
                });
            }).catch(err => {
                console.error(err);
                // TODO: Handle error
            })
        } else {
            // TODO: Handle error
        }
    }

    return userMetadata ? <div className="login-clean">
        <form className="dashForm" method="post">
            <div className="illustration">
                <i className="icon ion-ios-alarm"></i>
            </div>
            <div className="mb-3">
                <span className="input-group-text med-input-group mb-3">
                    <i className="fa fa-medkit"></i>
                    <input className="form-control med-name" type="text" name="medName" placeholder="Name of Medicine" required="" value={medicine} onChange={handleMedicineChange} />
                </span>
                {reminders.map(reminder => (
                    <TimeSlot slot={{number: reminder.slotNumber, time: reminder.time}} />
                ))}
                <span className="input-group-text med-input-group mb-3">
                    <input className="form-control med-name" type="number" name="slotNumber" placeholder="Slot Number" required="" value={slotNumber} onChange={handleNumberChange} />
                </span>
                <span id="slot" className="input-group-text time med-input-group">
                    <i className="icon ion-ios-alarm"></i>
                    <input className="form-control med-time" type="time" required="" value={slotTime} onChange={handleTimeChange} />
                </span>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend"></div>
            </div>
            <div className="mb-3" id="container"></div>
            <button onClick={newSlot}
                className="btn btn-outline-primary text-truncate float-none float-sm-none add-another-btn"
                data-bss-hover-animate="pulse" type="button" disabled={!slotNumber || !slotTime}>Add Another Slot
                <i className="fas fa-plus-circle edit-icon"></i>
            </button>
            <div className="mb-3">
                <button className="btn btn-primary d-block w-100" data-bss-hover-animate="tada" type="submit">Add
                    Reminder!</button>
            </div>
        </form>
    </div>: <Loading />;
}

