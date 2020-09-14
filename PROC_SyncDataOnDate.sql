
	-- CODE CHẤM CÔNG THÀNH CÔNG: 43->53 ,55, 58 -> 62
	-- [and ((nEventIdn >= 43 and nEventIdn <= 53) or nEventIdn = 55 or (nEventIdn >= 58 and nEventIdn <= 62))] ???? lỗi khi chuyển từ bảng bk sang ko bk
	--> nếu lọc những record không hợp lệ ra ko đồng bộ vào database thì dùng cách ktra nEventLogIdn có max hay không không được trong trường hợp record cuối cùng của bảng BK là dữ liệu chấm công không hợp lệ
	--> sync luôn cả những record chấm công không hợp lệ
	--> trên giao diện ứng dụng chỉ hiện những record chấm công hợp lệ với đk ((nEventIdn >= 43 and nEventIdn <= 53) or nEventIdn = 55 or (nEventIdn >= 58 and nEventIdn <= 62))

ALTER PROC syncDataOnDate @Date date
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
