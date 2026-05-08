import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { caseAmountTotalByStatus } from "src/utils/api/case/caseApiCall";
import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";

import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";

const status = [
  { id: 0, label: "Prédouteux", color: "#FF5733" },
  { id: 1, label: "Douteux", color: "#33FF57" },
  { id: 2, label: "compromis", color: "#3357FF" },
  { id: 3, label: "contentieux", color: "#FF33A6" },
  { id: 4, label: "Décès", color: "#FF8C33" },
  { id: 5, label: "Radié", color: "#8C33FF" },
  { id: 6, label: "Invalidité", color: "#33FFF5" },
  { id: 7, label: "Terminé", color: "#FF3333" },
];

export default function TotalAmountByCaseStatus({
  setpercentageAmountRecovred,
}) {
  const [data, setData] = useState<any[]>([]);
  const [highlightedItem, setHighLightedItem] = React.useState(null);

  const getCaseAmountTotalByStatus = async () => {
    const results = await Promise.all(
      status.map(async (item) => {
        const resp = await caseAmountTotalByStatus(item.label);
        return {
          id: item.id,
          value: resp,
          label: item.label,
          color: item.color,
        };
      })
    );
    setData(results);
  };

  useEffect(() => {
    getCaseAmountTotalByStatus();
  }, []);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const barChartsProps: BarChartProps = {
    series: [
      {
        data: data.map((item) => item.value),
        id: "sync",
        highlightScope: { highlighted: "item", faded: "global" },
        label: 'Montant total en DH'
      },
    ],
    xAxis: [{ scaleType: "band", data: data.map((item) => item.label) }],
    height: 400,
    slotProps: {
      legend: {
        hidden: false,
      },
    },
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Montant total case par status </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"end"}
        >
          {data.map((item) => (
            <Box display={"flex"} width={"50%"}>
              <Typography variant="h4" color={item.color} paddingBottom={3}>
                {item.label}
              </Typography>
              <Typography variant="h4">: {item.value} DH</Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={8}>
          <PieChart
            series={[
              {
                id: "sync",
                data,
                highlightScope: { faded: "global", highlighted: "item" },

                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
                arcLabel: (item) => {
                  const percentage = ((item.value / total) * 100).toFixed(2);
                  item.label === "Terminé" &&
                    setpercentageAmountRecovred(percentage);
                  return `${percentage}%`;
                },
              },
            ]}
            height={400}
            highlightedItem={highlightedItem}
            onHighlightChange={setHighLightedItem}
          />
        </Grid>
        <Grid item xs={12}>
          <BarChart
            {...barChartsProps}
            //  highlightedItem={'item'}
            // onHighlightChange={'item'}
          />
        </Grid>
      </Grid>

      <Grid marginBottom={10}></Grid>
    </>
  );
}
