export const SERVICE_URL = "http://localhost:8080";

export const portOutDetailsColumns = [
  {
    key: "ban",
    label: "Ban",
  },
  {
    key: "subscriber_no",
    label: "Subscriber No",
  },
  {
    key: "pac_stac",
    label: "PAC/STAC",
  },
  {
    key: "code_type",
    label: "Code Type",
  },
  {
    key: "creation_date",
    label: "Creation Date",
  },
  {
    key: "completion_date",
    label: "Completion Date",
  },
  {
    key: "code_request_date",
    label: "Code Request Date",
  },
  {
    key: "expiration_date",
    label: "Expiration Date",
  },
  {
    key: "po_status",
    label: "PO Status",
  },
  {
    key: "ono",
    label: "ONO",
  },
  {
    key: "dno",
    label: "DNO",
  },
  {
    key: "rno",
    label: "RNO",
  },
  {
    key: "port_type",
    label: "Port Type",
  },
  {
    key: "port_seq_no",
    label: "Port Seq No",
  },
  {
    key: "channel",
    label: "Channel",
  },
  {
    key: "failure_reason",
    label: "Failure Reason",
  },
];
export const portInDetailsColumns = [
    {
      key: "ban",
      label: "Ban",
    },
    {
      key: "subscriber_no",
      label: "Subscriber No",
    },
    {
      key: "pac_stac",
      label: "PAC/STAC",
    },
    {
      key: "code_type",
      label: "Code Type",
    },
    {
      key: "creation_date",
      label: "Creation Date",
    },
    {
      key: "completion_date",
      label: "Completion Date",
    },
    {
      key: "code_request_date",
      label: "Code Request Date",
    },
    {
      key: "expiration_date",
      label: "Expiration Date",
    },
    {
      key: "pi_status",
      label: "PI Status",
    },
    {
      key: "ono",
      label: "ONO",
    },
    {
      key: "dno",
      label: "DNO",
    },
    {
      key: "rno",
      label: "RNO",
    },
    {
      key: "port_type",
      label: "Port Type",
    },
    {
      key: "port_seq_no",
      label: "Port Seq No",
    },
    {
      key: "channel",
      label: "Channel",
    },
    {
      key: "failure_reason",
      label: "Failure Reason",
    },
  ];
export const portOutLifeCycleColumns = [
    {
        key: 'step_id',
        label: 'Step ID'
    },
    {
        key: 'po_stage',
        label: 'PO Stage'
    }, {
        key: 'status',
        label: 'Status'
    }
]
export const portInLifeCycleColumns = [
    {
        key: 'step_id',
        label: 'Step ID'
    },
    {
        key: 'pi_stage',
        label: 'PO Stage'
    }, {
        key: 'status',
        label: 'Status'
    }
]
export const portOutMockData = {
  port_out_details: {
    ban: "123456789",
    subscriber_no: "12345667890",
    pac_stac: "ABC123456",
    code_type: "P",
    creation_date: "12-Aug-2024",
    completion_date: "12-Aug-2024",
    po_status: "Cancelled",
    code_request_date: "12-Aug-2024",
    expiration_date: "13-Aug-2024",
    ono: "ABC",
    dno: "ABC",
    rno: "XYZ",
    port_type: "M",
    port_seq_no: "12345",
    channel: "SMS",
    failure_reason: "",
  },
  port_out_life_cycle: [
    {
      step_id: "Step 1",
      po_stage: "Initiate Port Out",
      status: "Completed",
    },
    {
      step_id: "Step 2",
      po_stage: "Port Out Locked",
      status: "Completed",
    },
    {
      step_id: "Step 3",
      po_stage: "Port Out Cease",
      status: "Completed",
    },
    {
      step_id: "Step 4",
      po_stage: "TIBCO MNP",
      status: "Completed",
    },
    {
      step_id: "Step 5",
      po_stage: "Port Out Fulfilment",
      status: "Completed",
    },
  ],
};

export const portInMockData = {
    port_in_details: {
      ban: "123456789",
      subscriber_no: "12345667890",
      pac_stac: "ABC123456",
      code_type: "P",
      creation_date: "12-Aug-2024",
      completion_date: "12-Aug-2024",
      po_status: "Cancelled",
      code_request_date: "12-Aug-2024",
      expiration_date: "13-Aug-2024",
      ono: "ABC",
      dno: "ABC",
      rno: "XYZ",
      port_type: "M",
      port_seq_no: "12345",
      channel: "SMS",
      failure_reason: "",
    },
    port_in_life_cycle: [
      {
        step_id: "Step 1",
        pi_stage: "Initiate Port Out",
        status: "Completed",
      },
      {
        step_id: "Step 2",
        pi_stage: "Port Out Locked",
        status: "Completed",
      },
      {
        step_id: "Step 3",
        pi_stage: "Port Out Cease",
        status: "Completed",
      },
      {
        step_id: "Step 4",
        pi_stage: "TIBCO MNP",
        status: "Completed",
      },
      {
        step_id: "Step 5",
        pi_stage: "Port Out Fulfilment",
        status: "Completed",
      },
    ],
  };
