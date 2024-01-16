export interface IUpdateDoctor {
  education?: String;
  specialization?: String;
  experience: Number;
  status?: Status;
  is_available?: Boolean;
  start_date: Date;
  end_date: Date;
}

enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
