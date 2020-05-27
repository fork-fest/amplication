import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useFormik } from "formik";
import { TextField } from "@rmwc/textfield";
import "@rmwc/textfield/styles";
import { Button } from "@rmwc/button";
import "@rmwc/button/styles";
import { CircularProgress } from "@rmwc/circular-progress";
import "@rmwc/circular-progress/styles";
import { Snackbar } from "@rmwc/snackbar";
import "@rmwc/snackbar/styles";
import { formatError } from "./errorUtil";

type Values = {
  name: string;
  description: string;
};

const NewApplication = () => {
  const history = useHistory();
  const [createApp, { loading, data, error }] = useMutation(CREATE_APP);

  const handleSubmit = useCallback(
    (data) => {
      createApp({ variables: { data } }).catch(console.error);
    },
    [createApp]
  );

  const formik = useFormik<Values>({
    onSubmit: handleSubmit,
    initialValues: {
      name: "",
      description: "",
    },
  });

  const errorMessage = formatError(error);

  useEffect(() => {
    if (data) {
      history.push(`/${data.createApp.id}`);
    }
  }, [history, data]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField name="name" label="Name" value={formik.values.name} />
      <TextField
        name="description"
        label="Description"
        value={formik.values.description}
      />
      <Button type="submit" raised>
        Create
      </Button>
      {loading && <CircularProgress />}
      <Snackbar open={Boolean(error)} message={errorMessage} />
    </form>
  );
};

export default NewApplication;

const CREATE_APP = gql`
  mutation createApp($data: AppCreateInput!) {
    createApp(data: $data) {
      id
    }
  }
`;
