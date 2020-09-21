package com.macia.HRs.DTO;

import lombok.Data;

@Data
public class TimeKeepingDTO {
    private int tkp_id;
    private String fullname;
    private String checktime;
    private String shift_name;
    private String type;
}
