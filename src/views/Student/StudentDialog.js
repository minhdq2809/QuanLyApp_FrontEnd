/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ThemeProvider,
  createMuiTheme,
  Box,
} from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { createStudent, getStudentById, updateStudent } from "service/Api";
import { Selection } from "components/InputComponent/Selection";

const theme = createMuiTheme({
  overrides: {},
});

export function StudentDialog(props) {
  const { open, onClose, state, idStudent } = props;
  const [student, setStudent] = useState({
    name: "",
    birthday: "",
    address: "",
    phone: "",
    code: "",
    email: "",
    idClass: "",
    majors: "",
    schoolYear: "CT1",
    image: "",
  });
  const [readOnly, setReadOnly] = useState(false);
  const [stateDialog, setStateDialog] = useState("");
  useEffect(() => {
    setStateDialog(state);
    const fetchData = async () => {
      const getStudent = await getStudentById(idStudent);
      if (getStudent.status === 200) {
        const data = getStudent.data;
        setStudent((state) => ({
          ...state,
          name: data.name,
          birthday: data.birthday,
          address: data.address,
          phone: data.phone,
          code: data.code,
          email: data.email,
          idClass: data.idClass,
          majors: data.majors,
          schoolYear: data.schoolYear,
          image: data.image,
        }));
      }
    };
    if (state === "view" && idStudent) {
      setReadOnly(true);
      fetchData();
    }
    if (state === "create") {
      setStudent({
        name: "",
        birthday: "",
        address: "",
        phone: "",
        code: "",
        email: "",
        idClass: "",
        majors: "",
        schoolYear: "CT1",
        image: "",
      });
      setReadOnly(false);
    }
  }, [state, idStudent]);
  const handleChangeInput = (event) => {
    const inputName = event.target.name;
    const value = event.target.value;
    setStudent((state) => ({ ...state, [inputName]: value }));
  };
  const handleChangeSelect = (name, value) => {
    setStudent((state) => ({ ...state, [name]: value }));
  };
  const handleCreate = async () => {
    const create = await createStudent(student);
    console.log(create);
    if (create.status === 200) {
      onClose();
    }
  };
  const handleUpdate = async () => {
    const update = await updateStudent(idStudent, student);
    if (update.status === 200) {
      onClose();
    }
  };
  const viewTitle = useMemo(() => {
    if (stateDialog === "view") {
      return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Chi ti???t sinh vi??n
          <Button
            onClick={() => {
              setStateDialog("update");
              setReadOnly(false);
            }}
          >
            c???p nh???t
            <EditIcon />
          </Button>
        </Box>
      );
    }

    if (stateDialog === "create") {
      return <span>T???o m???i sinh vi??n</span>;
    }
    if (stateDialog === "update") {
      return <span>C???p nh???t sinh vi??n</span>;
    }
  }, [stateDialog]);

  const viewAction = useMemo(() => {
    if (stateDialog === "create") {
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
    }
    if (stateDialog === "view") {
      return (
        <>
          <Button onClick={onClose} color="primary">
            ????ng
          </Button>
        </>
      );
    }
    if (stateDialog === "update") {
      return (
        <>
          <Button
            onClick={() => {
              setStateDialog("view");
            }}
            color="primary"
          >
            Hu???
          </Button>
          <Button onClick={handleUpdate} color="primary">
            C???p nh???t
          </Button>
        </>
      );
    }
  }, [stateDialog, student]);

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{viewTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="H??? v?? T??n sinh vi??n"
            type="text"
            fullWidth
            name="name"
            onChange={(e) => {
              handleChangeInput(e);
            }}
            value={student.name}
            InputProps={{
              readOnly: readOnly,
            }}
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Ng??y sinh"
            type="text"
            fullWidth
            name="birthday"
            onChange={(e) => {
              handleChangeInput(e);
            }}
            value={student.birthday}
            InputProps={{
              readOnly: readOnly,
            }}
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="s??? ??i???n tho???i"
            type="text"
            fullWidth
            name="phone"
            onChange={(e) => {
              handleChangeInput(e);
            }}
            value={student.phone}
            InputProps={{
              readOnly: readOnly,
            }}
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="?????a ch???"
            type="text"
            fullWidth
            name="address"
            onChange={(e) => {
              handleChangeInput(e);
            }}
            value={student.address}
            InputProps={{
              readOnly: readOnly,
            }}
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="email"
            type="text"
            fullWidth
            name="email"
            onChange={(e) => {
              handleChangeInput(e);
            }}
            value={student.email}
            InputProps={{
              readOnly: readOnly,
            }}
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="M?? sinh vi??n"
            type="text"
            fullWidth
            name="code"
            onChange={(e) => {
              handleChangeInput(e);
            }}
            value={student.code}
            InputProps={{
              readOnly: readOnly,
            }}
            variant="outlined"
          />
          <Selection
            label="Chuy??n ng??nh"
            name="majors"
            readOnly={readOnly}
            value={student.majors}
            handle={(name, value) => {
              handleChangeSelect(name, value);
            }}
            listValueSelect={listMajors}
          />
          <TextField
            margin="dense"
            label="N??m h???c"
            type="text"
            fullWidth
            name="schoolYear"
            onChange={(e) => {
              handleChangeInput(e);
            }}
            value="CT1"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>{viewAction}</DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

const listMajors = [
  {
    index: 1,
    value: "Nh??ng",
  },
  {
    index: 2,
    value: "Di ?????ng",
  },
];
