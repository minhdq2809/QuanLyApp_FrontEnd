/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  createProgressLog,
  updateProgressLog,
  getProjectProgressLogsById,
} from "service/Api";
import { TextFieldCustom } from "../Component/TextFliedCustom";

export function ProjectProgressLogDialog(props) {
  const { open, onClose, state, idProjectProgress, nameStudent, idLog } = props;

  const [progressLog, setProgressLog] = useState({
    content: "",
    percent: "",
    worker: nameStudent,
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjectProgressLogsById(idLog);
      console.log({ data: data });
      if (data.status === 200) {
        setProgressLog({
          content: data.data.content,
          percent: data.data.percent,
          worker: data.data.worker,
        });
      }
    };

    if (idLog !== "") {
      fetchData();
    }
  }, [idLog]);

  const handleChangeInput = (name, value) => {
    setProgressLog((state) => ({ ...state, [name]: value }));
  };

  const handleCreate = async () => {
    const data = {
      idProjectProgress: idProjectProgress,
      state: state,
      content: progressLog.content,
      percent: progressLog.percent,
      worker: progressLog.worker,
    };
    const create = await createProgressLog(data);
    console.log(create);
    if (create.status === 200) {
      onClose();
    }
  };

  const handleUpdate = async () => {
    const data = {
      idProjectProgress: idProjectProgress,
      state: state,
      content: progressLog.content,
      percent: progressLog.percent,
      worker: progressLog.worker,
    };
    const update = await updateProgressLog(idLog, data);
    console.log(update);
    if (update.status === 200) {
      onClose();
    }
  };

  const btnView = useMemo(() => {
    if (idLog !== "") {
      return (
        <>
          <Button onClick={onClose} color="primary">
            ????ng
          </Button>
          <Button onClick={handleUpdate} color="primary">
            C???p nh???t
          </Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={onClose} color="primary">
          ????ng
        </Button>
        <Button onClick={handleCreate} color="primary">
          T???o m???i
        </Button>
      </>
    );
  }, [idLog, progressLog]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>T???o m???i c??ng vi???c</DialogTitle>
      <DialogContent>
        <TextFieldCustom
          label="C??ng vi???c"
          name="content"
          value={progressLog.content}
          handle={(name, value) => {
            handleChangeInput(name, value);
          }}
          maxRow={2}
        />
        <TextFieldCustom
          label="Ng?????i th???c hi???n"
          name="worker"
          value={progressLog.worker}
          handle={(name, value) => {
            handleChangeInput(name, value);
          }}
        />
        <TextFieldCustom
          label="Ti???n ????? (%)"
          name="percent"
          value={progressLog.percent}
          handle={(name, value) => {
            handleChangeInput(name, value);
          }}
        />
      </DialogContent>
      <DialogActions>{btnView}</DialogActions>
    </Dialog>
  );
}
