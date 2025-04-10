import React, { useState, useEffect } from 'react';
import { registerLicense } from '@syncfusion/ej2-base';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, PopupOpenEventArgs } from '@syncfusion/ej2-react-schedule';

// registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCe0x3RHxbf1x0ZFxMZF5bQXVPMyBoS35RckVnWH5eeXBXQ2RYUEF0')
const CalendarF =()=>{
return(
<ScheduleComponent>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
    </ScheduleComponent> 
)
}
export default CalendarF