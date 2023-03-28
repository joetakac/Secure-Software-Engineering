<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ModelDataService from "@/services/models.data.service";
import UserTypes from '../../../shared/usertypes';

export default {
  name: "app",
  components: {
    FullCalendar, // make the FullCalendar tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "timeGridWeek",
        editable: false,
        selectable: true,
        weekends: false,
        now: this.today,
        eventClick: this.onEventClick,
        events: [],
        contentHeight:window.innerHeight,
        businessHours: {
          daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
          startTime: '08:00',
          endTime: '19:00',
        },
      },
      ApplicationUser: this.keycloak.tokenParsed,
    };
  },
  inject: ['keycloak'],
  methods: {
    populateCalendar() 
    {
      if (this.keycloak.hasRealmRole('Student')) 
      {
        ModelDataService.SessionDataService.getSessionForUser()
        .then(response => this.createEvents(JSON.parse(response.data)))
        .catch(error => ModelDataService.ErrorHandlerService(error));
      }
      else if (this.keycloak.hasRealmRole('Tutor')) 
      {
        ModelDataService.ModuleDataService.getAll().then(response => 
        {
          var modules = JSON.parse(response.data)
          var sessions = [];
          modules = modules.filter(module => module.Tutors.find(tutor => tutor.Id === parseInt(this.keycloak.tokenParsed.preferred_username)));
          modules.map(module => module.Sessions.map(session => sessions.push(session)));
          this.createEvents(sessions);
        })
        .catch(error => ModelDataService.ErrorHandlerService(error));
      }
    },
    createEvents(sessions) {
      sessions.map((session) => {
            let event = {
              id : session.Id,
              title: session.Title ?? "N/A",
              start: session.DateAndTime,
              extendedProps: { location: session.Location },
            };
            this.calendarOptions.events.push(event);
          });
    },
    getAllSessions(userId) {
      let sessions = ModelDataService.SessionDataService.getAll()
        .then((response) => {
          const data = JSON.parse(response.data);
          sessions = data;
          this.getAllUserSessions(sessions, userId);
        })
        .catch((error) => ModelDataService.ErrorHandlerService(error));
    },
    getAllUserSessions(sessions, userId) {
      sessions.map((session) => {
        session.Students.map((student) => {
          if (parseInt(student.Id) == parseInt(userId)) {
            this.studentSessions.push(session);
          }
        });
      });
    },
    onEventClick(eventClickInfo) {
      this.$router.push(`/sessions/${eventClickInfo.event.id}`)
    },
  },
  mounted() {
    console.log(this.keycloak.tokenParsed.preferred_username);
    this.populateCalendar();
    var today = new Date();

  },
};
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>
