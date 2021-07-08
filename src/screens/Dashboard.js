import { Grid } from "@material-ui/core";
import React from "react";
import ServiceCard from "../components/Cases/ServiceCard";

function Dashboard() {
  return (
    <div>
      <h2>Главная панель</h2>
      <Grid container spacing={2}>
        <Grid item md={6} sm={6} xs={12}>
          <ServiceCard title="ИГХ: ALK" text="one" />
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
          <ServiceCard title="ИГХ: PD-L1" />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
