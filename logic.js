document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  const spinnerEl = document.getElementById('calendar-spinner');
  const spinnerRing = document.getElementById('spinner-ring');
  const fallbackEl = document.getElementById('calendar-fallback');

  let calendarLoaded = false;

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: window.innerWidth < 600 ? 'listMonth' : 'timeGridWeek',
    googleCalendarApiKey: 'AIzaSyCnkQ8YhGAJvj3T1ZkC_mbyV7VHtdSeGbQ',
    events: {
      googleCalendarId: 'c_272aae55cf543768d533c80a54f778be256c8695049d05a8b1e254833eeef758@group.calendar.google.com'
    },
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
      fallbackEl.style.display = 'none';

      if (events.length === 0) {
        // Calendar loaded, but no events found — show fallback
        fallbackEl.style.display = 'block';
      } else {
        // Show calendar
        calendarEl.style.display = 'block';
      }
    }
  });

  calendar.render();

  // 5 second timeout fallback — calendar failed to load at all
  setTimeout(function() {
    if (!calendarLoaded) {
      spinnerRing.style.animation = 'none';
      spinnerRing.style.borderColor = '#999';
      fallbackEl.style.display = 'block';
    }
  }, 5000);

  // Responsive view change
  window.addEventListener('resize', () => {
    if (window.innerWidth < 600) {
      calendar.changeView('listMonth');
    } else {
      calendar.changeView('timeGridWeek');
    }
  });
});

