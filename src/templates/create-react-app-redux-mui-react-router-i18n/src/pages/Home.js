import React from "react";

import { Button, Stack, Box, Typography, Container } from "@mui/material";

// i18n
import { useTranslation } from "react-i18next";

// redux
import { useDispatch } from "react-redux";
import { setLenguage } from "../redux/common";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleChangeLenguage = (lenguage) => {
    dispatch(setLenguage(lenguage));
  };

  return (
    <Box>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {t("welcome")}
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button
            onClick={() => handleChangeLenguage("en")}
            variant="contained"
          >
            Change Language "es"
          </Button>
          <Button onClick={() => handleChangeLenguage("es")} variant="outlined">
            Change Language "en"
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
