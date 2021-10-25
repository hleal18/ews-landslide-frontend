import React, { useContext, useState, useMemo } from "react";
import RiskZonesContext from "../Contexts/RiskZonesContext";
import AuthContext from "../Contexts/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core"
import moment from 'moment';
import RiskZoneSelector from "../Presentational/Export/RiskZoneSelector";

import ewsApi from "../Api/ewsApi";

import * as xlsx from "xlsx";
import JSZip from "jszip";
import * as FileSaver from "file-saver";

const useStyles = makeStyles(theme => ({
  root: {
      marginTop: 48
  }
}));

const createWorkbooksForRiskZone = async (riskZone, token) => {

  const workbooks = [];

  for (const cs of riskZone.criticalSpots) {
    for (const dv of cs.sensorNodes) {
      const variablesResult = await ewsApi.getVariablesInExcelFormat(token, dv.name);
      if (variablesResult.length === 0) continue;

      const workbook = xlsx.utils.book_new();

      for (const varResult of variablesResult) {
        // console.log('VarResult variables: ');
        // console.log('transforming variables to locale time');
        //[[date, value1, value2?], [date,value1,value2]]
        const transformedVariables = varResult.variables.map((dataArray) => {
          const newDataArray = [...dataArray];
          // console.log('NewDataArray', newDataArray);
          const momentObj = moment(newDataArray[0]);
          // console.log('MomentObj:' , momentObj.toLocaleString());
          newDataArray[0] = momentObj.utcOffset(-5).format('DD/MM/YYYY, h:mm:ss A');
          return newDataArray;
        })
        console.dir(varResult.variables, { depth: null });
        const newsheet = xlsx.utils.json_to_sheet([
          varResult.variables[0]?.length === 3
            ? ["fecha", "x", "y"]
            : ["fecha", "valor registrado"],
          ...transformedVariables,
        ], { skipHeader: true });

        xlsx.utils.book_append_sheet(workbook, newsheet, varResult.name);
      }

      workbooks.push({name: `${cs.name} - ${dv.name}.xlsx`, workbook });
    }
  }


  const zip = new JSZip();

  // zip.generateAsync({ type: 'blob' }).then((blob) => {
  //   FileSaver.saveAs(blob, "hola.zip");
  // });

  for (const workbook of workbooks) {
    // zip.file(workbook.name, xlsx.write(workbook.workbook, { type: "base64" }));
    zip.file(workbook.name, xlsx.write(workbook.workbook, { type: "array" }));
    // xlsx.writeFile(workbook.workbook, workbook.name);
  }

  const filesAsBlob = await zip.generateAsync({ type: 'blob' });

  FileSaver.saveAs(filesAsBlob, `Datos ${riskZone.name}`);
} 


const ExportManager = ({}) => {
  const { riskZones, setRiskZone } = useContext(RiskZonesContext);
  const { token } = useContext(AuthContext);
  const classes = useStyles();

  const [currentRiskZoneId, setCurrentRiskZoneId] = useState("");

  const riskZoneOptions = useMemo(() => [...riskZones.map((rz) => ({ id: rz._id, name: rz.name }))], [
    riskZones,
  ]);

  const handleClick = async () => {
    if (currentRiskZoneId === "") return;
    const rzToExport = riskZones.find((rz) => rz._id === currentRiskZoneId);
    if (!rzToExport) return;
    createWorkbooksForRiskZone(rzToExport, token);
  }

  return (
    <div className={classes.root}>
      <RiskZoneSelector
        riskZoneOptions={riskZoneOptions}
        currentId={currentRiskZoneId}
        handleChange={(v) => setCurrentRiskZoneId(v.target.value)}
        handleClick={handleClick}
      />
    </div>
  );
};

export default ExportManager;