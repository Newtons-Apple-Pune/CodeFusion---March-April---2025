// import React, { useState, useEffect, useRef } from 'react';
// import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, PopupOpenEventArgs } from '@syncfusion/ej2-react-schedule';
// import axios from 'axios';
// import { DropDownList } from '@syncfusion/ej2-dropdowns';
// import { registerLicense } from '@syncfusion/ej2-base';
// import './Calendar.css'
// import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

// registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhNYVppR2Nbe052flVBalhQVAciSV9jS3pTdURjWXled3BXR2lcWA==');

// const CalendarM = () => {
//   const [events, setEvents] = useState([]);
//   const scheduleObj = useRef(null);
//   const buttonObj = useRef(null);
  
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/auth/calendar');
//       setEvents(response.data.map(event => ({
//         Id: event._id,
//         Subject: event.title,
//         StartTime: new Date(event.startDate),
//         EndTime: new Date(event.endDate),
//         Description: event.description
//       })));
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   const onPopupOpen = (args) => {
//     if (args.type === 'Editor') {
//       if (!args.element.querySelector('.custom-field-row')) {
//         let row = document.createElement('div');
//         row.className = 'custom-field-row';
//         let formElement = args.element.querySelector('.e-schedule-form');
//         formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
//         let container = document.createElement('div');
//         container.className = 'custom-field-container';
//         let inputEle = document.createElement('input');
//         inputEle.className = 'e-field';
//         inputEle.setAttribute('name', 'EventType');
//         container.appendChild(inputEle);
//         row.appendChild(container);
  
//         // Find a specific container within the popup to append the dropdown
//         let popupContainer = args.element.querySelector('.e-popup-container');
//         let dropdownContainer = document.createElement('div');
//         dropdownContainer.className = 'dropdown-container'; // Add a class for styling if needed
//         popupContainer.appendChild(dropdownContainer);
//         let drowDownList = new DropDownList({
//           dataSource: [
//             { text: 'Doubt Solving', value: 'Doubt Solving' },
//             { text: 'QB discussion', value: 'QB discussion' },
//             { text: 'Extra Lecture', value: 'Extra Lecture' },
//             { text: 'Other', value: 'Other' }
//           ],
//           fields: { text: 'text', value: 'value' },
//           floatLabelType: 'Always', placeholder: 'Event Type'
//         });
//         drowDownList.appendTo(dropdownContainer);
//       }
//     }
//   };

//   // const onDeleteClick = () => {
//   //   // Find the index of the event to be deleted in the data source
//   //   const eventIndex = events.findIndex(event => event.Id === 4);
//   //   if (eventIndex !== -1) {
//   //     // Create a copy of the events array without the deleted event
//   //     const updatedEvents = [...events.slice(0, eventIndex), ...events.slice(eventIndex + 1)];
//   //     // Update the events state with the modified array
//   //     setEvents(updatedEvents);
//   //     // Disable the button
//   //     buttonObj.current.element.setAttribute('disabled', 'true');
//   //     // Refresh the scheduler to reflect the changes
//   //     scheduleObj.current.refresh();
//   //   }
//   // }
  

//   const onSaveClick = async (args) => {
//     try {
//       console.log('onSaveClick triggered. Action Type:', args.requestType);
  
//       // Check if the action type is deletion
//       if (args.requestType === 'eventCreated') {
      
  
//       // Check if args.data contains the event data
//       if (!args.data || !args.data[0]) {
//         console.error('Error saving event: Event data is missing');
//         return;
//       }
  
//       // Extract the event data properties
//       const eventData = args.data[0];
//       const { Subject, StartTime, EndTime, Description } = eventData;
  
//       // Check if any of the required properties are missing
//       if (!Subject || !StartTime || !EndTime) {
//         console.error('Error saving event: Required fields are missing');
//         return;
//       }
  
//       // Get the custom field values from the event editor
//       const eventType = args.element?.querySelector('.custom-field-container input')?.value;
//       const eventLocation = args.element?.querySelector('.custom-field-location input')?.value; // Adjust the selector according to your HTML structure
  
//       // Construct the event data with the custom field values
//       const eventDataToSend = {
//         title: Subject,
//         startDate: StartTime,
//         endDate: EndTime,
//         description: Description || '', // Set description to an empty string if it's undefined
//         EventType: eventType || '',
//         EventLocation: eventLocation || ''
//       };
  
//       // Send a POST request to your server to save the new event data
//       const response = await axios.post('http://localhost:5000/api/auth/calendar', eventDataToSend);
//       console.log('Event saved successfully:', response.data);
//     }
//     } catch (error) {
//       console.error('Error saving event:', error);
//     }
//   };
  
  

//   const onActionBegin = async (args) => {
//     if(args.requestType === 'eventRemoved'){
//     try {
//       console.log('Event data:', args.data); // Log the event data
//       if (args.requestType === 'eventRemove') {
//         const eventId = args.data[0].Id; // Use Id instead of _id
//         console.log("eventId", eventId);
//         // Send a DELETE request to your server to delete the event
//         await axios.delete(`http://localhost:5000/api/auth/calendar/${eventId}`);
//         console.log('Event deleted successfully');
//       }
//     } catch (error) {
//       console.error('Error deleting event:', error);
//     }
//   }
//   };

//   return (
//     <>
//       <ScheduleComponent
//         ref={scheduleObj}
//         actionBegin={onActionBegin}
//         eventSettings={{ dataSource: events }}
//         popupOpen={onPopupOpen}
//         actionComplete={onSaveClick} 
//       >
//         <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
//       </ScheduleComponent>
//     </>
//   );
// };

// export default CalendarM;

import React, { useState, useEffect } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, PopupOpenEventArgs } from '@syncfusion/ej2-react-schedule';
import axios from 'axios';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { registerLicense } from '@syncfusion/ej2-base';
import './Calendar.css'
// registerLicense('ORg4AjUWIQA/Gnt2XFhhQlJHfVpdVHxLflFzVWJbdV10flBFcDwsT3RfQFhjTX5ad0dgXH1feXNcQWteWA==')
registerLicense('ORg4AjUWIQA/Gnt2XFhhQlJHfVpdVHxLflFzVWJbdV10flBFcDwsT3RfQFhjTX5ad0dgXnpaeHBUQ2teWA==')
const CalendarM = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/calendar');
      setEvents(response.data.map(event => ({
        Id: event._id,
        Subject: event.title,
        StartTime: new Date(event.startDate),
        EndTime: new Date(event.endDate),
        Description: event.description
      })));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const onPopupOpen = (args) => {
    if (args.type === 'Editor') {
        if (!args.element.querySelector('.custom-field-row')) {
            let row = document.createElement('div');
            row.className = 'custom-field-row';
            let formElement = args.element.querySelector('.e-schedule-form');
            formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
            let container = document.createElement('div');
            container.className = 'custom-field-container';
            let inputEle = document.createElement('input');
            inputEle.className = 'e-field';
            inputEle.setAttribute('name', 'EventType');
            container.appendChild(inputEle);
            row.appendChild(container);
            let drowDownList = new DropDownList({
                dataSource: [
                    { text: 'Doubt Solving', value: 'Doubt Solving' },
                    { text: 'QB discussion', value: 'QB discussion' },
                    { text: 'Extra Lecture', value: 'Extra Lecture' },
                    { text: 'Other', value: 'Other' }
                ],
                fields: { text: 'text', value: 'value' },
                floatLabelType: 'Always', placeholder: 'Event Type'
            });
            drowDownList.appendTo(inputEle);
        }
    }
};

// const onSaveClick = async (args) => {
//   try {
//     // Check if args.data contains the event data
//     if (!args.data || !args.data[0]) {
//       console.error('Error saving event: Event data is missing');
//       return;
//     }

//     // Extract the event data properties
//     const eventData = args.data[0];
//     const { Subject, StartTime, EndTime, Description } = eventData;

//     // Check if any of the required properties are missing
//     if (!Subject || !StartTime || !EndTime) {
//       console.error('Error saving event: Required fields are missing');
//       return;
//     }

//     // Get the custom field value from the event editor
//     const eventType = args.element?.querySelector('.custom-field-container input')?.value;

//     // Construct the event data with the custom field value
//     const eventDataToSend = {
//       title: Subject,
//       startDate: StartTime,
//       endDate: EndTime,
//       description: Description || '', // Set description to an empty string if it's undefined
//       EventType: eventType || '' ,
//       //location: { EventLocation || '' },// EventLocation: ''
//       //location: args.element?.querySelector('.custom-field-location input')?.value || '', // Use directly or define EventLocation
//       location: { name: 'EventLocation' },
//     };

//     // Send a POST request to your server to save the new event data
//     const response = await axios.post('http://localhost:5000/api/auth/calendar', eventDataToSend);
//     console.log('Event saved successfully:', response.data);
//   } catch (error) {
//     console.error('Error saving event:', error);
//   }
// };
const onSaveClick = async (args) => {
  try {
    // Check if args.data contains the event data
    if (!args.data || !args.data[0]) {
      console.error('Error saving event: Event data is missing');
      return;
    }

    // Extract the event data properties
    const eventData = args.data[0];
    const { Subject, StartTime, EndTime, Description, EventType,location } = eventData;

    // Check if any of the required properties are missing
    if (!Subject || !StartTime || !EndTime) {
      console.error('Error saving event: Required fields are missing');
      return;
    }
    // Construct the event data with the custom field values
    const eventDataToSend = {
      title: Subject,
      startDate: StartTime,
      endDate: EndTime,
      description: Description || '',
      EventType: EventType || '',
      EventLocation: location || ''
    };

    // Send a POST request to your server to save the new event data
    const response = await axios.post('http://localhost:5000/api/auth/calendar', eventDataToSend);
    console.log('Event saved successfully:', response.data);
  } catch (error) {
    console.error('Error saving event:', error);
  }
};
const fieldsData= {
  id: 'Id',
  subject: { name: 'Subject' },
  startTime: { name: 'StartTime' },
  endTime: { name: 'EndTime' },
  description: { name: 'Description' },
  location: { name: 'EventLocation' },
  eventType: { name: 'EventType' }
}

return (
  <>
    {/* <ScheduleComponent
    eventSettings={{ dataSource: events }} popupOpen={onPopupOpen} actionComplete={onSaveClick}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent> */}
    <ScheduleComponent
  eventSettings={{ 
    dataSource: events,
    fields: fieldsData
    }
  }
  popupOpen={onPopupOpen}
  actionComplete={onSaveClick}
>
  <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
</ScheduleComponent>

    </>
);
};

export default CalendarM;