document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  const fallbackIframe = document.getElementById('calendar-fallback-iframe');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [
      FullCalendarTimeGrid,
      FullCalendarList,
      FullCalendarGoogleCalendar
    ],
    googleCalendarApiKey: 
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
      // FullCalendar loaded → show it, hide iframe fallback
      fallbackIframe.style.display = 'none';
      calendarEl.style.display = 'block';
    },
    loading: function(isLoading) {
      if (!isLoading && calendar.getEvents().length === 0) {
        // No events → fallback iframe stays visible
        calendarEl.style.display = 'none';
        fallbackIframe.style.display = 'block';
      }
    }
  });

  try {
    calendar.render();
  } catch (e) {
    console.error('FullCalendar render failed:', e);
    // Show fallback
    fallbackIframe.style.display = 'block';
  }
});
