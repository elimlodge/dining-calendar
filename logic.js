document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  const spinnerEl = document.getElementById('calendar-spinner');
  const spinnerRing = document.getElementById('spinner-ring');
  const fallbackIframe = document.getElementById('calendar-fallback-iframe');

  let calendarLoaded = false;

  const calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [
      FullCalendarTimeGrid,
      FullCalendarList,
      FullCalendarGoogleCalendar
    ],
    googleCalendarApiKey: 'AIzaSyCnkQ8YhGAJvj3T1ZkC_mbyV7VHtdSeGbQ',
    events: {
      googleCalendarId: 'c_272aae55cf543768d533c80a54f778be256c8695049d05a8b1e254833eeef758@group.calendar.google.com'
    },
    initialView: window.innerWidth < 600 ? 'listMonth' : 'timeGridWeek',
    slotMinTime: '08:00:00',
    slotMaxTime: '19:00:00',
    visibleRange: function(currentDate) {
      let startDate = currentDate;
      let endDate = new Date(currentDate.valueOf());
      endDate.setDate(endDate.getDate() + 6); // today + 6 = 7 days
      return { start: startDate, end: endDate };
    },
    eventsSet: function(events) {
      calendarLoaded = true;
      spinnerEl.style.display = 'none';

      if (events.length === 0) {
        fallbackIframe.style.display = 'block';
      } else {
        calendarEl.style.display = 'block';
      }
    }
  });

  calendar.render();

  // Fallback after 5 seconds
  setTimeout(function() {
    if (!calendarLoaded) {
      spinnerRing.style.animation = 'none';
      spinnerRing.style.borderColor = '#999';
      fallbackIframe.style.display = 'block';
    }
  }, 5000);

  // Responsive view switching
  window.addEventListener('resize', () => {
    if (window.innerWidth < 600) {
      calendar.changeView('listMonth');
    } else {
      calendar.changeView('timeGridWeek');
    }
  });
});
