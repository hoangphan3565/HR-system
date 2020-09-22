package com.macia.HRs.DTO;

import lombok.Data;

@Data
public class TimeKeepingDTO {
    private Integer tkp_id;
    private String fullname;
    private String checktime;
    private String shift_name;
    private String type;

    public TimeKeepingDTO(Integer tkp_id, String fullname, String checktime, String shift_name, String type) {
        this.tkp_id = tkp_id;
        this.fullname = fullname;
        this.checktime = checktime;
        this.shift_name = shift_name;
        this.type = type;
    }
}
