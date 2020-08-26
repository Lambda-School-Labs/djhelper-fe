import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';

import DashboardWelcome from './DashboardWelcome';
import AddEvent from './events/AddEvent';
import Event from './events/Event';
import * as eventActions from '../redux/actions/eventActions';

import * as Styles from './Styles';
import plus from '../images/plus.png';

Modal.setAppElement('#root');

const Dashboard = ({ events, id, name, getEvents, history, ...props }) => {
  const [upComingEvents, setUpComingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (events.length === 0) {
      // replace id with your userid with id# in getevents (console.log('id', id))
      console.log('dashboard:id', id);
      getEvents(id);
    }
  }, []);

  useEffect(() => {
    // Creates an array with the 2 important properties: id and date

    const correctedEventDate = events.map(event => {
      const eventDate = new Date(event.date);
      eventDate.setDate(eventDate.getDate() + 1);
      return {
        ...event,
        formattedDate: eventDate
      };
    });

    // Divides the array into 2 sorted arrays: upcomingArray and pastArray, and sets the corresponding ids in state

    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);

    const futureEvents = correctedEventDate
      .filter(x => x.formattedDate >= today)
      .sort((a, b) => a.formattedDate - b.formattedDate);
    setUpComingEvents(futureEvents);

    const pastEventsArray = correctedEventDate
      .filter(x => x.formattedDate < today)
      .sort((a, b) => b.formattedDate - a.formattedDate);
    setPastEvents(pastEventsArray);
  }, [events]);

  return (
    <div className="dashboard">
      {/* {whichComponent()} */}
      <DashboardWelcome name={name} />

      <div className="upcoming-events" data-testid="upcoming-carousel">
        <button
          className="eventCard"
          onClick={() => setModalIsOpen(true)}
          type="button"
        >
          <div className="plusbutton">
            <img src={plus} alt="Add New Event" />
          </div>
          <h2>Add new event </h2>
        </button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={Styles.eventModalStyles}
        >
          <AddEvent setModalIsOpen={setModalIsOpen} history={history} />
          <div>
            <button
              type="button"
              className="btn-closeModal"
              onClick={() => setModalIsOpen(false)}
            >
              <FontAwesomeIcon icon="times" className="btn-closeModal__icon" />
            </button>
          </div>
        </Modal>

        {events &&
          upComingEvents.map(event => {
            return (
              <Link to={`/dj/event/${event.id}`} key={event.id}>
                <Event event={event} key={event.id} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  events: PropTypes.instanceOf(Array).isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  getEvents: PropTypes.func.isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired
};

const mapStateToProps = state => {
  return {
    events: state.eventReducer.events,
    id: state.userReducer.id,
    name: state.userReducer.name
  };
};

const mapDispatchToProps = {
  getEvents: eventActions.getEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
