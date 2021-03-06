USE [hrs]
GO
/****** Object:  StoredProcedure [dbo].[sync_Data_On_Date]    Script Date: 2020-09-15 1:24:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[sync_Data_On_Date] @Date date
AS 
	declare @maxrecord int
	select @maxrecord = MAX(n_event_log_idn) from hrs.dbo.time_keeping

	declare @maxrecord_in_bk int
	select @maxrecord_in_bk = MAX(nEventLogIdn) from BioStar.dbo.TB_EVENT_LOG_BK

	if @maxrecord is null
	begin
		SET IDENTITY_INSERT hrs.dbo.time_keeping OFF
		insert into hrs.dbo.time_keeping(n_event_log_idn,date_time,event_data,time_check_code_of_emp,reader)
		Select nEventLogIdn,dateadd(s,a.nDateTime,'1970-01-01 00:00:00') ,nEventIdn,nUserID,nReaderIdn
		from  BioStar.dbo.TB_EVENT_LOG_BK a
		where CONVERT(date,dateadd(s,a.nDateTime,'1970-01-01 00:00:00')) = @Date 
	end
	else if @maxrecord < @maxrecord_in_bk
	begin
		SET IDENTITY_INSERT hrs.dbo.time_keeping OFF
		insert into hrs.dbo.time_keeping(n_event_log_idn,date_time,event_data,time_check_code_of_emp,reader)
		Select nEventLogIdn,dateadd(s,a.nDateTime,'1970-01-01 00:00:00') ,nEventIdn,nUserID,nReaderIdn
		from  BioStar.dbo.TB_EVENT_LOG_BK a
		where CONVERT(date,dateadd(s,a.nDateTime,'1970-01-01 00:00:00')) = @Date  and nEventLogIdn > @maxrecord
	end

	else if @maxrecord >= @maxrecord_in_bk
	begin
		SET IDENTITY_INSERT hrs.dbo.time_keeping OFF
		insert into hrs.dbo.time_keeping(n_event_log_idn,date_time,event_data,time_check_code_of_emp,reader)
		Select nEventLogIdn,dateadd(s,a.nDateTime,'1970-01-01 00:00:00') ,nEventIdn,nUserID,nReaderIdn
		from  BioStar.dbo.TB_EVENT_LOG a
		where CONVERT(date,dateadd(s,a.nDateTime,'1970-01-01 00:00:00')) = @Date  and nEventLogIdn > @maxrecord
	end

	update time_keeping
	set event_data = 0
	where event_data < 43 or event_data = 54 or event_data = 56 or event_data = 57 or event_data > 62

	update time_keeping
	set emp_id = (select top 1 emp_id from employee where time_check_code = time_check_code_of_emp and is_deleted = 0)