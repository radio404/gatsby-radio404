import React from "react"
import {StaticQuery} from "gatsby"
import moment from "moment";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/list/main.css';
import '@fullcalendar/timegrid/main.css';
import frLocale from '@fullcalendar/core/locales/fr';

const PageDefault = ({page}) => (
  <div className={`wp-content`}>
      <div className={`planning-content`} dangerouslySetInnerHTML={{ __html:page.content }} />
      <StaticQuery query={graphql`
      query{
      allWordpressWpSchedules(filter: {}, sort: {order: DESC, fields: date}) {
      nodes {
        title
        date
        acf {
          color
          duration_literal
          duration_seconds
          idschedule
          end
          start
          type
        }
      }
     }
    }
    `}
    render={data => (
      <FullCalendar
        defaultView="listWeek"
        plugins={[dayGridPlugin,listPlugin,timeGridPlugin]}
        header={
          {
            left:   'listWeek timeGridWeek dayGridMonth',
            center: 'title',
            right:  'today prev,next'
          }
        }
        titleFormat={{ year: 'numeric', month: 'short', day: 'numeric' }}
        locale={frLocale}
        events={data.allWordpressWpSchedules.nodes.map(event=>{
          const {color,start,end} = event.acf;
          return{
            title:event.title,
            start:start,
            end:end,
            backgroundColor:color
          }
        })}
      />
    )}
    >

    </StaticQuery>
  </div>
)


export default PageDefault
