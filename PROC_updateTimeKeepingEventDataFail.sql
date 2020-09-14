create proc updateTimeKeepingEventDataFail
as
	update time_keeping
	set event_data = 0
	where event_data < 43 or event_data = 54 or event_data = 56 or event_data = 57 or event_data > 62