document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  const spinnerEl = document.getElementById('calendar-spinner');
  const spinnerRing = document.getElementById('spinner-ring');
  const fallbackEl = document.getElementById('calendar-fallback');

  let calendarLoaded = false;

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: window.innerWidth < 600 ? 'listMonth' : 'timeGridWeek',
    googleCalendarApiKey: 'YOUR_API_KEY_HERE',
    events: {
      googleCalendarId: 'YOUR_CALENDAR_ID_HERE'
    },
    eventsSet: function() {
      calendarLoaded = true;
      spinnerEl.style.display = 'none';
      fallbackEl.style.display = 'none';
      calendarEl.style.display = 'block';
    }
  });

  calendar.render();

  // 5 second timeout fallback
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
